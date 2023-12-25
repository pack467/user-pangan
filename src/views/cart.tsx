import { useState, useEffect, type FormEvent } from "react";
import type { CartWithProduct } from "../interfaces/cart";
import { Container, Row, Col, Button, Form, FormSelect } from "react-bootstrap";
import type { Bank, CheckoutPayload, PaymentType } from "../interfaces/product";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Cart from "../components/card/cart";
import { getCart } from "../actions/cart";
import { swalError, swalSuccess } from "../lib/swal";
import LoadingWrapper from "../components/loaders/loadingOverlay";
import { checkoutProduct } from "../actions/product";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectPayment from "../components/form/formSelectPayment";
import { bankList } from "../constant";
import SelectBank from "../components/form/formSelectBank";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [datas, setDatas] = useState<CartWithProduct[]>([]);
  const [items, setItems] = useState<CheckoutPayload[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<PaymentType | "">("");
  const [bank, setBank] = useState<Bank | "">("");

  useEffect(() => {
    setLoading(true);
    getCart()
      .then((data) => {
        setDatas(data);
      })
      .catch((err) => {
        swalError(err?.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    switch (true) {
      case paymentType === "va" && !bankList.includes(bank):
        swalError("Please input bank");
        return;
      case !items.length:
        swalError("Please input minimum 1 item");
        return;
      case !paymentType:
        swalError("Select Payment type");
        return;
      default:
        break;
    }
    setLoading(true);

    dispatch<any>(
      checkoutProduct(items, paymentType as PaymentType, bank as Bank)
    )
      .then(() => {
        setLoading(false);
        swalSuccess("success");
        navigate("/product/payment");
      })
      .catch((err: Error) => {
        swalError(err?.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoadingWrapper active={loading}>
      <Container>
        <Row>
          {!datas.length ? (
            <LazyLoadImage
              src="/images/404.png"
              loading="lazy"
              style={{ width: "500px", height: "auto" }}
            />
          ) : (
            datas.map((data) => (
              <Col key={data.UUID}>
                <Cart cart={data} setItems={setItems} />
              </Col>
            ))
          )}
        </Row>
        <Form onSubmit={onSubmit}>
          <SelectPayment
            required
            name="paymentType"
            id="paymentType"
            value={paymentType}
            onChangeHandler={(e) =>
              setPaymentType(e.target.value as PaymentType)
            }
          />
          {paymentType === "va" && (
            <SelectBank
              required
              name="bank"
              id="bank"
              value={bank}
              onChangeHandler={(e) => setBank(e.target.value as Bank)}
            />
          )}
          <Row style={{ justifyContent: "space-around" }}>
            <Col md="6" sm="6" lg="6">
              {!!items.length &&
                items
                  .map((item) => item.total)
                  .reduce((accumulator, curr) => accumulator + curr, 0)}
            </Col>
          </Row>
          <Button type="submit">Purchase</Button>
        </Form>
      </Container>
    </LoadingWrapper>
  );
}
