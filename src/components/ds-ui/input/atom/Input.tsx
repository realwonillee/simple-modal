import { InputHTMLAttributes } from "react";

// Todo: 공통 스타일 정의
export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="border-solid border-cyan-200 border py-0.5 px-1 text-[#000] caret-[#000]" {...props} />;
}
