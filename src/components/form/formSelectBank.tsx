import { type ChangeEvent } from "react";
import { FormSelect } from "react-bootstrap";
import { bankList } from "../../constant";

export interface SelectBankProps {
  required?: boolean;
  name: string;
  id: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectBank({
  required = false,
  name,
  id,
  value,
  onChangeHandler,
}: SelectBankProps) {
  return (
    <FormSelect
      required={required}
      name={name}
      id={id}
      value={value}
      className="mb-4"
      onChange={onChangeHandler}>
      <option disabled value="">
        -- Select bank --
      </option>
      {bankList.map((el, idx) => (
        <option key={idx} value={el}>
          {el}
        </option>
      ))}
    </FormSelect>
  );
}
