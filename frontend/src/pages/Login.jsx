import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../store/slices";
const Login = () => {
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const mylogin = {
    email: email,
    password: password,
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", mylogin);
      if(response.status === 200){
        navigate("/");
        dispatch(addTask({email: response.data.email,  todos: response.data.text}));
      }
      // console.log(response)
    } catch (error) {
      console.log(error.response.status)
    }
  }
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-2/5 flex flex-col bg-zinc-800 gap-5 h-1/2 mt-20">
        <div className="text-2xl flex justify-center pt-2">Login</div>
        <form className="flex flex-col bg-zinc-800 h-full w-full">
          <div className="flex flex-col pl-10 pr-10 h-1/3">
            <label htmlFor="username">Username</label>
            <input onChange={(e)=> setemail(e.target.value)} type="text" className="h-2/5 rounded-lg outline-none text-black placeholder-shown:pl-2" placeholder="username"/>
          </div>
          <div className="flex flex-col pl-10 pr-10 h-1/3">
            <label htmlFor="password">Password</label>
            <input onChange={(e)=> setpassword(e.target.value)} type="password" className="h-2/5 rounded-lg outline-none text-black placeholder-shown:pl-2" placeholder="password"/>
          </div>
          <div className="bg-zinc-800 w-full h-10 rounded-lg flex justify-center">
          <button onClick={handleSubmit} type="submit" className="bg-red-700 w-1/5 rounded-lg hover:scale-105">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
