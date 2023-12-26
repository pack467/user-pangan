import type { CartWithProduct } from "../../interfaces/cart";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { CheckoutPayload } from "../../interfaces/product";
import BtnDecrement from "../button/decrement";
import BtnIncrement from "../button/increment";
import { useDispatch } from "react-redux";
import { removeCart } from "../../actions/cart";
import { swalError } from "../../lib/swal";
import LoadingWrapper from "../loaders/loadingOverlay";

export interface CartProps {
  cart: CartWithProduct;
  setItems: Dispatch<SetStateAction<CheckoutPayload[]>>;
}

export default function Cart({ cart, setItems }: CartProps) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { Product: product } = cart;

  const decrement = () => {
    if (total < 1) return;
    setTotal(total - 1);
  };

  const increment = () => {
    if (total >= product.stock) return;
    setTotal(total + 1);
  };

  const totalPrice = product.price * total;

  const addItems = () => {
    setItems((prev) => [...prev, { itemId: product.UUID, total }]);
  };

  const remove = () => {
    setLoading(true);

    dispatch<any>(removeCart(product.UUID))
      .catch((err: Error) => {
        swalError(err?.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoadingWrapper active={loading}>
      <Card className="mb-2" style={{ color: "white" }}>
        <Card.Img variant="top" src={product.ProductImgs[0].imageUrl} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.desc}</Card.Text>
          <Container>
            <Row>
              <Col md="4" sm="4" lg="4">
                {product.status}
              </Col>
              <Col md="4" sm="4" lg="4">
                {product.price}
              </Col>
              <Col md="4" sm="4" lg="4">
                {product.stock}
              </Col>
            </Row>
            <Row>
              <BtnDecrement onClick={decrement} />
              <Button
                onClick={addItems}
                type="button"
                className="btn btn-primary">
                Add Items
              </Button>
              <BtnIncrement onClick={increment} />
            </Row>
            {totalPrice}
            <Row>
              <Button
                type="button"
                variant="danger"
                className="btn btn-danger"
                onClick={remove}>
                Remove Carts
              </Button>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </LoadingWrapper>
  );
}
