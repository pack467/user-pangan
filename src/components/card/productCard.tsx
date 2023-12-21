import type { ProductAttributesWithImages } from "../../interfaces/product";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddCart from "../button/addCart";

export interface ProductCardProps {
  product: ProductAttributesWithImages;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.UUID}`);
  };

  return (
    <Card className="mb-2">
      <div onClick={handleClick}>
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
          </Container>
        </Card.Body>
      </div>
      <AddCart productId={product.UUID} />
    </Card>
  );
}
