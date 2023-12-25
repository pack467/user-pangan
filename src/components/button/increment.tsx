import { type MouseEvent } from "react";
import { Button } from "react-bootstrap";

export interface BtnIncrementProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
}

export default function BtnIncrement({
  onClick,
  disable = false,
}: BtnIncrementProps) {
  return (
    <Button
      onClick={onClick}
      type="button"
      className="btn btn-light"
      disabled={disable}>
      {" + "}
    </Button>
  );
}
