import { IConfirmModalContent } from '@/lib/modal/types';
import PrimaryButton from '../ds-ui/button/atom/PrimaryButton';
import { useModalContext } from '@/lib/modal/ModalContext';

const ConfirmModal = (props: IConfirmModalContent) => {
  const { modalActions } = useModalContext();
  const { confirmKind, title, description } = props;
  console.log(title, description, confirmKind);
  return (
    <div className="w-[300px] h-[200px] bg-white">
      알림모달
      <PrimaryButton type="button" label="닫기" onClick={modalActions.close} />
    </div>
  );
};

export default ConfirmModal;
