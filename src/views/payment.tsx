import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type RootReducer } from "../store";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import type { ChargeResp, Timer, va_number } from "../interfaces";
import { swalError } from "../lib/swal";
import { getTransactionStatus } from "../actions/product";

export default function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { payment } = useSelector(
    ({ productReducer }: RootReducer) => productReducer
  );

  const [data, setData] = useState<ChargeResp>({
    va_numbers: [{ bank: "", va_number: "" }] as va_number[],
    transaction_status: "pending",
    order_id: "",
    expiry_time: new Date().toISOString(),
  } as ChargeResp);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const expirationTime = new Date(data?.expiry_time || "").getTime();
    const difference = expirationTime - now;

    if (difference <= 0) {
      swalError("Your payment has been expired");
      navigate("/");
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState<Timer>(calculateTimeLeft());

  useEffect(() => {
    if (!payment || !payment.va_numbers.length) navigate("/");
    dispatch<any>(getTransactionStatus(payment?.signature_key || "-")).then(
      () => {
        setData(payment as ChargeResp);
      }
    );
  }, [payment]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.expiry_time]);

  return (
    <Card className="text-center" style={{ color: "white" }}>
      <Card.Header style={{ color: "black" }}>Finish Your Payment</Card.Header>
      <Card.Body>
        <Card.Title>{data?.va_numbers[0].bank.toUpperCase()}</Card.Title>
        <Card.Text>{data?.transaction_status}</Card.Text>
        <Card.Text>{data?.va_numbers[0].va_number}</Card.Text>
        <Card.Text>{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          className="btn btn-primary">
          Back
        </Button>
      </Card.Body>
      <Button variant="primary">{data?.order_id}</Button>
    </Card>
  );
}
