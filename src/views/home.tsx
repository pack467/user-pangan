import { useSelector, useDispatch } from "react-redux";
import type { RootReducer } from "../store";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/card/productCard";
import { useEffect } from "react";
import CarouselCard from "../components/card/carousel";
import { getAllCarousel, getAllProduct } from "../actions/product";

export default function Home() {
  const dispatch = useDispatch();
  const { products, carrousels } = useSelector(
    ({ productReducer }: RootReducer) => productReducer
  );

  useEffect(() => {
    dispatch<any>(getAllProduct({}));
    dispatch<any>(getAllCarousel());
  }, []);

  return (
    <Container fluid>
      <Row>
        {!!carrousels.length && <CarouselCard carrousels={carrousels} />}
      </Row>
      <Row>
        {!!products.length &&
          products.map((product) => (
            <Col key={product.UUID}>
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
