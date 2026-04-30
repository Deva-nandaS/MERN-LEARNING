import Modal from "react-modal";

export const BaseModal = ({ isOpen, onClose, children, maxWidth = "max-w-lg" }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`outline-none w-full ${maxWidth} mx-4`}
      overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      bodyOpenClassName="overflow-hidden"
    >
      {children}
    </Modal>
  );
};