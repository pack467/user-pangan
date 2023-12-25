import { MouseEvent } from "react";
import { Button } from "react-bootstrap";

export interface BtnDecrementProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
}

export default function BtnDecrement({
  onClick,
  disable = false,
}: BtnDecrementProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disable}
      type="button"
      className="btn btn-danger"
    >
      {" - "}
    </Button>
  );
}
