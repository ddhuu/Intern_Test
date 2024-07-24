import React from "react";
import { useAppStore } from "../../store/useAppStore";
import "./style.css";

const Modal = () => {
  const { contentModal, setModal } = useAppStore();
  return (
    <div onClick={() => setModal(false, null)} className="modal-container">
      {contentModal}
    </div>
  );
};

export default Modal;
