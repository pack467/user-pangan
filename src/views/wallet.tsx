import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { type RootReducer } from "../store";
import { TopUpWallet, getWallet } from "../actions/user";
import { Card, Button, Form, Modal, FormSelect } from "react-bootstrap";
import LoadingWrapper from "../components/loaders/loadingOverlay";
import NumberForm from "../components/form/numberForm";
import { Bank } from "../interfaces/wallet";
import { swalError, swalSuccess } from "../lib/swal";

export default function WalletPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<number>(0);
  const [bank, setBank] = useState<Bank | "">("");
  const bankList = ["BCA", "BNI", "PERMATA", "BRI"];

  const { wallet } = useSelector(({ userReducer }: RootReducer) => userReducer);

  useEffect(() => {
    if (!wallet) dispatch<any>(getWallet());
  }, [wallet]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if(!input || !bank) return

    dispatch<any>(TopUpWallet(input,bank)).then(() => {
        setLoading(false);
        swalSuccess("success");
        navigate('/product/payment')
    }).catch((err: Error) => {
        swalError(err?.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>Wallet</Card.Header>
        <Card.Text>{`Rp.${wallet?.balance || 0}`}</Card.Text>
        <Card.Footer>
          <Button
            onClick={() => setOpen(true)}
            variant="primary"
            className="btn btn-primary">
            Top Up
          </Button>
        </Card.Footer>
      </Card>
      <Modal
        size="lg"
        show={open}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setOpen(false)}>
        <LoadingWrapper active={loading}>
          <Form onSubmit={onSubmit}>
            <NumberForm
              name="input"
              value={input}
              id="input"
              label="top-up input"
              onChange={(e) => setInput(e.target.value)}
              required
              placeHolder="top-up"
            />
            <FormSelect
              required
              name="bank"
              id="bank"
              value={bank}
              className="mb-4"
              onChange={(e) => setBank(e.target.value as Bank)}>
              <option disabled value="">
                -- Select bank --
              </option>
              {bankList.map((el, idx) => (
                <option key={idx} value={el}>
                  {el}
                </option>
              ))}
            </FormSelect>
            <Button type="submit" className="btn btn-primary" variant="primary">
              Submit
            </Button>
          </Form>
        </LoadingWrapper>
      </Modal>
    </>
  );
}
