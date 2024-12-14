import { InputHTMLAttributes } from "react";
import Label from "../atom/InputLabel";
import Input from "../atom/Input";

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

// Todo: 공통 스타일 정의
export default function PasswordInput({ label, ...rest }: IProps) {
  return (
    <div>
      <Label label={label} />
      <Input type="password" {...rest} />
    </div>
  );
}
