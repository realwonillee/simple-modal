import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';

export const OverlappedModal = ({
  close,
  callback,
}: {
  close: () => void;
  callback: () => void;
}) => {
  return (
    <div className="w-[300px] h-[200px] bg-white">
      첫번째 모달
      <PrimaryButton type="button" label="두번째 모달열기" onClick={callback} />
      <PrimaryButton type="button" label="닫기" onClick={close} />
    </div>
  );
};
