'use client';

import FirstModalButton from './modal/FirstModal';
import SecondModalButton from '@/components/modal/SecondModal';
import { useEffect, useRef } from 'react';

export default function Home() {
  const ref = useRef<{ open: () => void }>();

  useEffect(() => {
    if (ref.current) ref.current.open();
  }, [ref]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-5">
        <FirstModalButton ref={ref} />
        <SecondModalButton />
      </div>
    </div>
  );
}
