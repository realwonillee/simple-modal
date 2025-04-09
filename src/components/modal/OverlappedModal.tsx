import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import ModalPortal from '@/lib/modal/ModalPortal';

export const OverlappedModal = ({
  modalId,
  close,
}: {
  modalId: string;
  close: () => void;
}) => {
  return (
    <ModalPortal modalId={modalId}>
      <div className="fixed top-0 left-0 z-[1px] bg-[#dddddd70] flex justify-center items-center w-full h-full">
        <div className="w-[300px] h-[200px] bg-white">
          첫번째 모달
          <PrimaryButton
            type="button"
            label="두번째 모달열기"
            onClick={() => {}}
          />
          <PrimaryButton type="button" label="닫기" onClick={close} />
        </div>
      </div>
    </ModalPortal>
  );
};
