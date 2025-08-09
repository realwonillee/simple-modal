import { IConfirmModalContent } from '@/lib/modal/types';
import PrimaryButton from '../ds-ui/button/atom/PrimaryButton';

const ConfirmModal = (props: IConfirmModalContent) => {
  const { level, title, description, confirmButton, cancelButton } = props;
  return (
    <div className="w-[300px] h-[200px] bg-white">
      <p>알림모달</p>
      <p>level: {level}</p>
      {title && <p>제목: {title}</p>}
      {description && <p>내용: {description}</p>}
      {cancelButton && (
        <PrimaryButton
          type="button"
          label={
            cancelButton.isLoading ? '로딩중...' : cancelButton.label ?? ''
          }
          onClick={() => {
            cancelButton.callback?.();
          }}
        />
      )}
      {confirmButton && (
        <PrimaryButton
          type="button"
          label={
            confirmButton.isLoading ? '로딩중...' : confirmButton.label ?? ''
          }
        />
      )}
    </div>
  );
};

export default ConfirmModal;
