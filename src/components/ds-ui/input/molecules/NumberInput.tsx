import { ChangeEvent, InputHTMLAttributes } from "react";
import Label from "../atom/InputLabel";
import Input from "../atom/Input";

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "step"> {
  label: string;
}

// Todo: 공통 스타일 정의
export default function NumberInput({ label, value, onChange, ...rest }: IProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    if (value !== "" && !/[0-9]/.test(value)) return;
    if (onChange) onChange(e);
  };

  const v = Number(value) === 0 ? "" : value;

  return (
    <div>
      <Label label={label} />
      <Input type="tel" {...rest} value={v} onChange={handleChange} />
    </div>
  );
}
