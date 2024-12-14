import { LabelHTMLAttributes } from "react";

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

// Todo: 공통 스타일 정의
export default function Label({ label, ...rest }: IProps) {
  return (
    <div className="min-w-40">
      <label {...rest}>{label}</label>
    </div>
  );
}
