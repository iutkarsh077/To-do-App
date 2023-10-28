import React, { useState } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleResponse, setHandleResponse] = useState("");
  const [handlestatus, sethandlesatatus] = useState(null);
  const [handleError, sethandleError] = useState("");
  const [errorstatus, seterrorstatus] = useState("");
  const navigate = useNavigate();
  const data = {
    Name: name,
    email: email,
    password: password,
  };

  // console.log(handleError);
  // console.log(errorstatus);
  // console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/signup", data);
      console.log(response);
      setHandleResponse(response.data.msg);
      sethandlesatatus(response.status);
      sethandleError(null);

      // Redirect to the login page on successful signup
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      sethandleError(error.response.data.message);
      seterrorstatus(error.response.status);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-2/5 flex flex-col bg-zinc-800 gap-5 h-3/5  mt-20">
        <div className="text-2xl flex justify-center pt-2">Signup</div>
        <form className="flex flex-col bg-zinc-800 h-full w-full">
          <div className="flex flex-col pl-10 pr-10 h-1/3">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              onChange={(e) => setname(e.target.value)}
              className="h-2/5 rounded-lg outline-none text-black placeholder-shown:pl-2"
              placeholder="name"
            />
          </div>
          <div className="flex flex-col pl-10 pr-10 h-1/3">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="h-2/5 rounded-lg outline-none text-black placeholder-shown:pl-2"
              placeholder="email"
            />
          </div>
          <div className="flex flex-col pl-10 pr-10 h-1/3">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="h-2/5 rounded-lg outline-none text-black placeholder-shown:pl-2"
              placeholder="password"
            />
          </div>
          <div className="text-green-500 pl-10">
            {errorstatus === 400 ? (
              <div className="text-red-500 flex items-center gap-1"><span>
              <TiDeleteOutline />
            </span>{handleError}</div>
            ) : handlestatus === 200 ? (
              <span className="text-green-500 flex items-center gap-1">
                <span>
                  <RiCheckboxCircleLine />
                </span>{" "}
                {handleResponse}
                {navigate('/login')}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="bg-zinc-800 w-full h-10 rounded-lg flex justify-center mb-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-red-700 w-1/5 rounded-lg hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
