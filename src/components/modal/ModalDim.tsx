const ModalDim = ({ isClosing }: { isClosing: boolean }) => {
  return (
    <div
      className={`fixed bg-[#dddddd] w-full h-full ${
        !isClosing ? 'animate-fadeIn' : 'animate-fadeOut'
      }`}
    />
  );
};

export default ModalDim;
