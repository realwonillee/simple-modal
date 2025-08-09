import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import useModal from '@/lib/modal/useModal';

export const OverlappedModal = () => {
  const modal = useModal();

  const handleModalOpen = () => {
    modal.warn({
      title: 'test',
      description: 'test',
      cancelButton: {
        label: '취소',
        callback: () => {},
      },
      confirmButton: {
        label: '확인',
        callback: () => {},
      },
    });
  };

  return (
    <div className="w-[300px] h-[200px] bg-white">
      첫번째 모달
      <PrimaryButton
        type="button"
        label="두번째 모달열기"
        onClick={handleModalOpen}
      />
      <PrimaryButton type="button" label="닫기" onClick={() => modal.close()} />
    </div>
  );
};
