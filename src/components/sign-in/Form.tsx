"use client";

import PrimaryButton from "@/components/ds-ui/button/atom/PrimaryButton";
import PasswordInput from "@/components/ds-ui/input/molecules/PasswordInput";
import TextInput from "@/components/ds-ui/input/molecules/TextInput";
import { ChangeEvent, FormEvent, useState } from "react";

interface ISigninForm {
  email: string;
  password: string;
}

export default function Form() {
  const [form, setForm] = useState<ISigninForm>({ email: "", password: "" });
  const { email, password } = form;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextInput label="이메일" name="email" placeholder="이메일을 입력해주세요." required value={email} onChange={handleChange} />
        <PasswordInput label="비밀번호" name="password" placeholder="비밀번호를 입력해주세요." required value={password} onChange={handleChange} />
        <div>
          <PrimaryButton type="submit" label="로그인" />
        </div>
      </form>
    </div>
  );
}
