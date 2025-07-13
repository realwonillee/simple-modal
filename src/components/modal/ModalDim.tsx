import { memo } from 'react';

const ModalDim = ({
  isClosing,
  dimOpacity,
}: {
  isClosing: boolean;
  dimOpacity: number;
}) => {
  return (
    <div
      className={`${
        !isClosing ? 'animate-fadeIn' : 'animate-fadeOut'
      } fixed bg-[rgba(0,0,0)] bg-opacity-${dimOpacity} w-full h-full`}
    />
  );
};

export default memo(ModalDim);
