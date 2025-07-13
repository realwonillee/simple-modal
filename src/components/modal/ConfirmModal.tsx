import { IConfirmModalContent } from '@/lib/modal/types';
import PrimaryButton from '../ds-ui/button/atom/PrimaryButton';
import { useModalContext } from '@/lib/modal/ModalContext';

const ConfirmModal = (props: IConfirmModalContent) => {
  const { modalActions } = useModalContext();
  const { confirmKind, title, description, confirm, cancel } = props;
  return (
    <div className="w-[300px] h-[200px] bg-white">
      <p>알림모달</p>
      <p>{confirmKind}</p>
      <p>{title}</p>
      <p>{description}</p>
      {cancel && (
        <PrimaryButton
          type="button"
          label={cancel.label}
          onClick={() => {
            cancel?.callback();
            modalActions.closeAll();
          }}
        />
      )}
      {confirm && (
        <PrimaryButton
          type="button"
          label={confirm.label}
          onClick={() => {
            cancel?.callback();
            modalActions.close();
          }}
        />
      )}
    </div>
  );
};

export default ConfirmModal;
