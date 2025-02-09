import FirstModalButton from './modal/FirstModal';
import SecondModalButton from '@/components/modal/SecondModal';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-5">
        <FirstModalButton />
        <SecondModalButton />
      </div>
    </div>
  );
}
