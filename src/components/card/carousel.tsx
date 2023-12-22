import { Carousel } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { CarrouselWithProduct } from "../../interfaces/product";

export interface CarouselCardProps {
  carrousels: CarrouselWithProduct[];
}

export default function CarouselCard({ carrousels }: CarouselCardProps) {
  return (
    <Carousel>
      {carrousels.map((carrousel) => (
        <Carousel.Item interval={1000} key={carrousel.imageId}>
          <LazyLoadImage
            src={
              carrousel.Product.ProductImgs.find(
                (el) => el.imageId === carrousel.imageId
              )?.imageUrl as string
            }
            style={{ objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{carrousel.Product.name}</h3>
            <p>{carrousel.Product.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
