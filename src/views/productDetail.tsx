import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, type FormEvent } from "react";
import type {
  PaymentType,
  ProductAttributesWithImages,
} from "../interfaces/product";
import { useDispatch } from "react-redux";
import type { ProductImgAttributes } from "../interfaces/productImg";
import { checkoutProduct, getProductById } from "../actions/product";
import { swalError, swalSuccess } from "../lib/swal";
import LoadingWrapper from "../components/loaders/loadingOverlay";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import ImgCarousel from "../components/card/imgSlider";
import type { Bank } from "../interfaces/wallet";
import BtnDecrement from "../components/button/decrement";
import BtnIncrement from "../components/button/increment";
import SelectPayment from "../components/form/formSelectPayment";
import SelectBank from "../components/form/formSelectBank";
import { bankList } from "../constant";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductAttributesWithImages>({
    name: "",
    ProductImgs: [] as ProductImgAttributes[],
    desc: "",
    status: "available",
    stock: 0,
    price: 0,
  } as ProductAttributesWithImages);
  const [paymentType, setPaymentType] = useState<PaymentType | "">("");
  const [bank, setBank] = useState<Bank | "">("");
  const [total, setTotal] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setData(await getProductById(id as string));
      } catch (err) {
        swalError((err as Error)?.message || "Internal Server error");
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    switch (true) {
      case paymentType === "va" && !bankList.includes(bank):
        swalError("Please input bank");
        return;
      case !total:
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
      checkoutProduct(
        [{ itemId: data.UUID, total }],
        paymentType as PaymentType,
        bank as Bank
      )
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
      <Card className="mb-2">
        {!!(data as ProductAttributesWithImages).ProductImgs?.length ? (
          (data as ProductAttributesWithImages).ProductImgs?.length > 1 ? (
            <ImgCarousel product={data} />
          ) : (
            <Card.Img
              variant="top"
              src={
                (data as ProductAttributesWithImages)?.ProductImgs[0].imageUrl
              }
            />
          )
        ) : null}
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <p>{data.desc}</p>
          <Container>
            <Row>
              {[data.status, data.price, data.stock].map((el) => (
                <Col md="4" sm="4" lg="4" style={{ color: "white" }}>
                  {el.toString()}
                </Col>
              ))}
            </Row>
          </Container>
          <Button
            onClick={() => setOpen(!open)}
            type="button"
            variant="primary"
            className="btn btn-primary">
            {open ? "Checkout ?" : "Close"}
          </Button>
          {open && (
            <Form onSubmit={onSubmit}>
              <Container>
                <Row>
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
                </Row>
                <Row>
                  <Col>
                    <BtnDecrement
                      disable={total < 1}
                      onClick={() => setTotal(total - 1)}
                    />
                  </Col>
                  <Col>
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      variant="primary">
                      Purchase
                    </Button>
                  </Col>
                  <Col>
                    <BtnIncrement
                      onClick={() => setTotal(total + 1)}
                      disable={total >= data.stock}
                    />
                  </Col>
                </Row>
                {!!total && <Row>{total * data.price}</Row>}
              </Container>
            </Form>
          )}
        </Card.Body>
      </Card>
    </LoadingWrapper>
  );
}
