import { VscAdd } from "react-icons/vsc";
// COMPONENTS
import Task from "./Task";
import ModalAdd from "../ui/ModalAdd";

import classes from "./Task.module.css";
import { useState, useRef, useEffect } from "react";
// const dummyData = [
//   {
//     id: 1,
//     text: "Math Homework",
//     day: "Jan 1th 2:30pm",
//     reminder: false,
//   },
//   {
//     id: 2,
//     text: "Doctor Appointment",
//     day: "Jan 10th 2:30pm",
//     reminder: true,
//   },
//   {
//     id: 3,
//     text: "Go to friend's house",
//     day: "Jan 19th 2:30pm",
//     reminder: false,
//   },
//   {
//     id: 4,
//     text: "Go to beach",
//     day: "Jan 19th 6:30am",
//     reminder: true,
//   },
//   {
//     id: 5,
//     text: "OK",
//     day: "Jan 19th 6:30am",
//     reminder: true,
//   },
// ];
const TaskTracker = () => {
  console.log("RENDERING");
  // useRef
  const formRef = {
    textRef: useRef(null),
    dayRef: useRef(null),
  };
  // STATE
  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  // FETCHING DATA
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      // console.log(data);
      setData(() => {
        return data;
      });
      setIsLoading(() => false);
    } catch (error) {
      console.log(error.message);
      setIsError(() => true);
    }
  };
  // prop drilling here
  const removeHandler = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setData((prevData) => {
      return prevData.filter((person) => person.id !== id);
    });
  };
  const toggleReminder = async (id) => {
    const res1 = await fetch(`http://localhost:5000/tasks/${id}`);
    const taskToToggle = await res1.json();
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res2 = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    // await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: "PUT",
    // });
    const updPerson = await res2.json();
    setData((prevData) =>
      prevData.map((person) => (person.id === id ? updPerson : person))
    );

    // WITOHOUT SERVER
    // setData((prevData) =>
    //   prevData.map((person) =>
    //     person.id === id ? { ...person, reminder: !person.reminder } : person
    //   )
    // );
  };
  const toggleModal = () => {
    setIsModal(() => !isModal);
  };
  const addTaskHandler = async (text, day) => {
    const newPerson = {
      text: text,
      day: day,
      reminder: false,
    };
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });
    const newData = await res.json();
    setData((prevData) => [...prevData, newData]);
    // const index = data.length + 1;
    // const newPerson = {
    //   id: index,
    //   text: text,
    //   day: day,
    //   reminder: false,
    // };
    // setData((prevData) => {
    //   return [...prevData, newPerson];
    // });
    // console.log([...data, newPerson]);
  };
  return (
    <>
      {isModal ? (
        <ModalAdd
          formRef={formRef}
          addTaskHandler={addTaskHandler}
          toggleModal={toggleModal}
        />
      ) : null}
      <section className={classes.content}>
        <div className={classes.top}>
          <h1 className={`text-white ${classes.title}`}>Task Tracker</h1>
          <button
            onClick={() => toggleModal()}
            className={`text-white ${classes.btn}`}
          >
            <VscAdd />
          </button>
        </div>
        <div>
          {isError ? (
            <div className={classes.taskContent}>
              <h1 className={classes.text}>SERVER ERROR</h1>
            </div>
          ) : isLoading ? (
            <div className={classes.taskContent}>
              <h1 className={classes.text}>LOADING ...</h1>
            </div>
          ) : data.length === 0 ? (
            <div className={classes.taskContent}>
              <h1 className={classes.text}>No more Task left</h1>
            </div>
          ) : (
            data.map((person) => (
              <Task
                key={person.id}
                {...person}
                toggleReminder={toggleReminder}
                removeHandler={removeHandler}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};
export default TaskTracker;
