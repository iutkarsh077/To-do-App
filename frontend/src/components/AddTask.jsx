import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {  addTask } from "../store/slices";
const AddTask = () => {
  const [text, setText] = useState("");
  const useSelectorState = useSelector((state) => state.tasks);
  const handleAddTask = async (e) => {
    e.preventDefault();
    const  dataAddTask = {
      text: text,
      email: useSelectorState.email,
    }
    // dispatch(addTask({text: text, email: dataAddTask.email}));
    await axios.post('/users/addTask', dataAddTask)
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="w-screen text-black mt-10 h-96 flex justify-center">
      <button>Increase</button>
      <div className="w-3/4 rounded-2xl bg-slate-200">
        <div className="w-full flex justify-center pt-3">
          <div className="font-semibold text-3xl text">AddTask</div>
        </div>
        <div className="flex justify-center w-full h-4/5">
          <form className="bg-slate-300 rounded-xl h-full flex justify-center w-2/4 pl-10 pr-10 gap-10 flex-col">
            <input
              type="text"
              className="h-12 rounded-xl outline-none pl-2"
              placeholder="Your Todos"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div className="h-12 flex gap-x-20 justify-center">
              <button
                type="submit"
                className="bg-slate-200 w-20 rounded-lg font-semibold hover:scale-105 text-xl"
                onClick={handleAddTask}
              >
                Add
              </button>
              <button className="bg-slate-200 w-20 rounded-lg font-semibold text-xl hover:scale-105">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
