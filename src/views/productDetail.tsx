import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { ProductAttributesWithImages } from "../interfaces/product";
import type { ProductImgAttributes } from "../interfaces/productImg";
import { getProductById } from "../actions/product";
import { swalError } from "../lib/swal";
import LoadingWrapper from "../components/loaders/loadingOverlay";
import { Card, Container, Row, Col } from "react-bootstrap";
import ImgCarousel from "../components/card/imgSlider";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductAttributesWithImages>({
    name: "",
    ProductImgs: [] as ProductImgAttributes[],
    desc: "",
    status: "available",
    stock: 0,
    price: 0,
  } as ProductAttributesWithImages);

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
        </Card.Body>
      </Card>
    </LoadingWrapper>
  );
}
