import { type ChangeEvent } from "react";
import { FormSelect } from "react-bootstrap";

export interface SelectPaymentProps {
  required?: boolean;
  name: string;
  id: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectPayment({
  required = false,
  name,
  id,
  value,
  onChangeHandler,
}: SelectPaymentProps) {
  return (
    <FormSelect
      required={required}
      name={name}
      id={id}
      size="lg"
      value={value}
      className="mb-4"
      onChange={onChangeHandler}>
      <option disabled value="">
        -- Select payment type --
      </option>
      {["va", "wallet"].map((el, idx) => (
        <option key={idx} value={el}>
          {el}
        </option>
      ))}
    </FormSelect>
  );
}
