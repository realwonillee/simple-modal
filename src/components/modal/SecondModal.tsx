import ModalController from "@/lib/modal/ModalController";
import ModalPortal from "@/lib/modal/ModalPortal";
import useModal from "@/lib/modal/useModal";
import { useEffect } from "react";

export const SECOND_MODAL_ID = "second-modal";

export default function SecondModal() {
  const { isOpen } = useModal(SECOND_MODAL_ID);
  const modalController = ModalController.getInstance();

  useEffect(() => {
    setTimeout(() => {
      modalController.publish(SECOND_MODAL_ID);
    }, 3000);
  }, [modalController]);

  return (
    <>
      {isOpen && (
        <ModalPortal modalId={SECOND_MODAL_ID}>
          <div className="fixed top-0 left-0 z-[1px] bg-[#dddddd70] flex justify-center items-center w-full h-full" onClick={() => modalController.unpublish(SECOND_MODAL_ID)}>
            <div className="w-[500px] h-[300px] bg-white" onClick={() => modalController.unpublish(SECOND_MODAL_ID)}>
              두번째 모달
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
