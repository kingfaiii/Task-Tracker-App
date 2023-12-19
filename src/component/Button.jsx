import { useState } from "react";
import Form from "./Form";
import Backdrop from "./Backdrop";
const Button = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal} className="bg-cyan-600 px-6 py-3 text-white text-xl">{props.text}</button>
      {modalIsOpen && <Form onAddTask={props.onUpdateTask} />}
      {modalIsOpen && <Backdrop onClose={closeModal}/>}
    </>
  );
};
export default Button;
