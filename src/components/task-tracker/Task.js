import { FaTimes } from "react-icons/fa";
import classes from "./Task.module.css";
import { useState } from "react";
const Task = ({ text, day, reminder, id, removeHandler, toggleReminder }) => {
  // console.log("RENDERING");
  const [isHover, setIsHover] = useState(false);
  const hoverHandler = () => {
    setIsHover(() => true);
  };
  const leaveHandler = () => {
    setIsHover(() => false);
  };
  // console.log(reminder);
  return (
    <div
      className={`${classes.taskContent} ${reminder ? classes.reminder : ""}`}
      onDoubleClick={() => toggleReminder(id)}
    >
      <div>
        <h1 className={classes.text}>{text}</h1>
        <h1 className={classes.day}>{day}</h1>
      </div>
      <div className={classes.removeBtn}>
        <FaTimes
          style={{ color: isHover ? "red" : "#fff", cursor: "pointer" }}
          onMouseOver={hoverHandler}
          onMouseLeave={leaveHandler}
          onClick={() => removeHandler(id)}
        />
      </div>
    </div>
  );
};
export default Task;
