import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

// Todo: 공통 스타일 정의
export default function Button({ children, className, ...rest }: IProps) {
  return (
    <button className={`${className} py-2 px-2 rounded`} {...rest}>
      {children}
    </button>
  );
}
