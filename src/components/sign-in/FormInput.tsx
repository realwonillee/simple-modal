import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import TextInput from '../ds-ui/input/molecules/TextInput';
import PasswordInput from '../ds-ui/input/molecules/PasswordInput';

export default function FormInput() {
  const { setValue } = useFormContext();
  console.log('FormInput Render!!');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValue(name, value);
  };
  return (
    <>
      <TextInput
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요."
        required
        onChange={handleChange}
      />
      <PasswordInput
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        required
        onChange={handleChange}
      />
    </>
  );
}
