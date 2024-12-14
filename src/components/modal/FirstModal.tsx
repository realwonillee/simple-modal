import ModalController from "@/lib/modal/ModalController";
import ModalPortal from "@/lib/modal/ModalPortal";
import useModal from "@/lib/modal/useModal";

export const FIRST_MODAL_ID = "first-modal";

export default function FristModal() {
  const { isOpen } = useModal(FIRST_MODAL_ID);
  const modalController = ModalController.getInstance();

  return (
    <>
      {isOpen && (
        <ModalPortal modalId={FIRST_MODAL_ID}>
          <div className="fixed top-0 left-0 z-[1px] bg-[#dddddd70] flex justify-center items-center w-full h-full" onClick={() => modalController.unpublish(FIRST_MODAL_ID)}>
            <div className="w-[300px] h-[200px] bg-white" onClick={() => modalController.unpublish(FIRST_MODAL_ID)}>
              첫번째 모달
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
