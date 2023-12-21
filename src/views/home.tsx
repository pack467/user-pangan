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
    if (!products.length) dispatch<any>(getAllProduct({}));
    if (!carrousels.length) dispatch<any>(getAllCarousel());
  }, [dispatch, products, carrousels]);

  return (
    <Container fluid>
      <Row>
        {!!carrousels.length &&
          carrousels.map((carrousel) => (
            <Col key={carrousel.imageId}>
              <CarouselCard carrousel={carrousel} />
            </Col>
          ))}
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
