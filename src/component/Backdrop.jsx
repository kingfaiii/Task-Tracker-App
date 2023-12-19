const Backdrop = (props) => {
    return <div className="backdrop fixed w-full h-full" onClick={props.onClose} />;
  };
  
  export default Backdrop;
  