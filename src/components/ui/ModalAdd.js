import classes from "./ModalAdd.module.css";
const ModalAdd = (props) => {
  const onClickHandler = (event) => {
    // console.log(event.target.nodeName);
    if (event.target.nodeName === "SECTION" || event.target.id === "cancel") {
      props.toggleModal();
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(props.formRef.textRef.current.value);
    console.log(props.formRef.dayRef.current.value);
    props.addTaskHandler(
      props.formRef.textRef.current.value,
      props.formRef.dayRef.current.value
    );
    props.toggleModal();
  };
  return (
    <section onClick={onClickHandler} className={classes.modalWrapper}>
      <form onSubmit={onSubmitHandler} className={classes.modalBox}>
        <div className={classes.inputGroup}>
          <label htmlFor="text">text:</label>
          <input
            ref={props.formRef.textRef}
            className={classes.input}
            type="text"
            id="text"
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="day">Day:</label>
          <input
            ref={props.formRef.dayRef}
            className={classes.input}
            type="text"
            id="day"
          />
        </div>
        <div className={classes.btnGroup}>
          <button className={classes.btn} id="cancel">
            Cancel
          </button>
          <button className={classes.btn} id="add">
            Add
          </button>
        </div>
      </form>
    </section>
  );
};
export default ModalAdd;
