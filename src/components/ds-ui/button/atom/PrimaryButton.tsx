import { ButtonHTMLAttributes } from "react";
import Button from "./Button";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

// Todo: 공통 스타일 정의
export default function PrimaryButton({ label, ...rest }: IProps) {
  return (
    <Button className={"w-[100%] bg-blue-500 text-white"} {...rest}>
      {label}
    </Button>
  );
}
