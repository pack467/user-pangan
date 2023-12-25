import type { CartWithProduct } from "../../interfaces/cart";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { CheckoutPayload } from "../../interfaces/product";
import BtnDecrement from "../button/decrement";
import BtnIncrement from "../button/increment";

export interface CartProps {
  cart: CartWithProduct;
  setItems: Dispatch<SetStateAction<CheckoutPayload[]>>;
}

export default function Cart({ cart, setItems }: CartProps) {
  const [total, setTotal] = useState<number>(1);
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

  return (
    <Card className="mb-2" style={{color:'white'}}>
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
            <BtnDecrement onClick={decrement}/>
            <Button
              onClick={addItems}
              type="button"
              className="btn btn-primary">
              Add Items
            </Button>
            <BtnIncrement onClick={increment}/>
          </Row>
          {totalPrice}
        </Container>
      </Card.Body>
    </Card>
  );
}
