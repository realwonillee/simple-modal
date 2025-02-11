'use client';

import ModalPortal from '@/lib/modal/ModalPortal';
import { ModalProvider, useModal } from '@/lib/modal/ModalContext';
import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';

interface IData {
  name: string;
}

export default function SecondModalButton() {
  return (
    <ModalProvider<IData> name={'SecondModalButton'}>
      <ModalButton />
    </ModalProvider>
  );
}

const ModalButton = () => {
  const { modalId, isOpen, actions, name } = useModal<IData>();
  return (
    <>
      <PrimaryButton
        type="button"
        label="두번째 모달열기"
        onClick={() => actions.open()}
      />
      {isOpen && (
        <ModalPortal modalId={modalId}>
          <div
            className="fixed top-0 left-0 z-[1px] bg-[#dddddd70] flex justify-center items-center w-full h-full"
            onClick={() => actions.close()}
          >
            <div
              className="w-[500px] h-[300px] bg-white"
              onClick={() => actions.close()}
            >
              두번째 모달 {name}
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};
