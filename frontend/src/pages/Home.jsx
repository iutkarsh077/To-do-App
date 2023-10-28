import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useEffect
import { useDispatch, useSelector } from "react-redux";
import { IoAddSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { addTask } from "../store/slices";
import axios from "axios";

const Home = () => {
  const count = useSelector((state) => state.tasks.todos);
  const email = useSelector((state) => state.tasks.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleRefresh(); 
  }, [email]); 

  const handleAddTask = (e) => {
    e.preventDefault();
    navigate("/AddTask");
  };

  const handleRefresh = async () => {
    try {
      const response = await axios.get("/users/getTasks", { params: { email } });
      dispatch(addTask({ email: response.data.email, todos: response.data.text }));
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  const handleUpdate = async (index) => {
    try {
      await axios.put("/users/update", { email, updateIdx: index });
      console.log(
        `The index is ${index}: and the element is ${count[index]}`
      );
      handleRefresh(); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen">
      <div className="text-black bg-slate-300 mt-4 w-full lg:w-1/6 h-56 flex justify-center items-center rounded-lg">
        <button
          className="text-zinc-700 font-semibold text-xl h-10 rounded-lg"
          onClick={handleRefresh}
        >
          Refresh
        </button>
        <button
          onClick={handleAddTask}
          className="w-1/2 text-9xl flex justify-center items-center"
        >
          <IoAddSharp className="opacity-70" />
        </button>
      </div>
      <div className="flex flex-wrap w-full lg:h-56 lg:w-5/6">
        {count === null
          ? null
          : count.map((task, index) => (
              <div
                key={index}
                className="bg-gray-100 flex  border border-gray-300 rounded-lg shadow-md mt-4 ml-4 p-4 w-full lg:h-full lg:w-1/5 mb-4 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:transition-background duration-300 hover:ease-in-out hover:duration-300"
              >
                <div className="text-black font-medium flex-1">{task}</div>
                <div className="text-black text-2xl flex items-end">
                  <MdDelete
                    className="hover:cursor-pointer hover:scale-125"
                    onClick={() => handleUpdate(index)}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
