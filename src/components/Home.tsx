"use client";

import PrimaryButton from "@/components/ds-ui/button/atom/PrimaryButton";
import ModalController from "@/lib/modal/ModalController";
import { FIRST_MODAL_ID } from "./modal/FirstModal";
import { SECOND_MODAL_ID } from "./modal/SecondModal";
import FirstModal from "./modal/FirstModal";
import SecondModal from "./modal/SecondModal";

export default function Home() {
  const modalController = ModalController.getInstance();

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-5">
        <PrimaryButton type="button" label="첫번째 모달열기" onClick={() => modalController.publish(FIRST_MODAL_ID)} />
        <PrimaryButton type="button" label="두번째 모달열기" onClick={() => modalController.publish(SECOND_MODAL_ID)} />
      </div>
      <FirstModal />
      <SecondModal />
    </div>
  );
}
