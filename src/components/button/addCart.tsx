import { Button } from "react-bootstrap";
import { addToCart } from "../../actions/cart";
import { useDispatch } from "react-redux";
import { swalError } from "../../lib/swal";
import { useState } from "react";
import LoadingWrapper from "../loaders/loadingOverlay";

export interface AddCartProps {
  productId: string;
}

export default function AddCart({ productId }: AddCartProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    dispatch<any>(addToCart(productId))
      .catch((err: Error) => {
        swalError(err.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <LoadingWrapper active={loading}>
      <Button
        type="button"
        variant="primary"
        className="btn btn-primary"
        onClick={handleClick}
      >
        Add Cart
      </Button>
    </LoadingWrapper>
  );
}
