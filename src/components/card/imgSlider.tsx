import type { ProductAttributesWithImages } from "../../interfaces/product";
import { Carousel, Container, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface ImgCarouselProps {
  product: ProductAttributesWithImages;
}

export default function ImgCarousel({ product }: ImgCarouselProps) {
  return (
    <Container>
      <Row>
        <Carousel>
          {product.ProductImgs.map((el) => (
            <Carousel.Item interval={1000} key={el.imageId}>
              <LazyLoadImage src={el.imageUrl} style={{ objectFit: "cover" }} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
    </Container>
  );
}
