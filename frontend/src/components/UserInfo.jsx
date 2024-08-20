import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleDOBChange, saveUserInfo, getUserData } from './UserInfoFunc';

export default function UserInfo() {
  const location = useLocation();
  const { state } = location;
  const userId = state?.userID;
  console.log("userId: ", userId, " state ID: ", state?.userID);
  const [userName, setName] = useState("");
  const [userAge, setAge] = useState("");
  const [userGender, setGen] = useState("");
  const [userDOB, setDOB] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("we here");
    if (!localStorage.getItem("token") || state?.update !== "UPDATE")
      navigate("/");
  }, []);

  useEffect(() => {
    console.log("we here 2!");
    getUserData(userId, setName, setAge, setGen, setDOB);
  }, []);

  console.log(userName, userAge, userGender, userDOB);

  return (
    <>
      <h1>User Info</h1>
      <form className='border-2 border-black flex flex-col text-center'>
        <label htmlFor='userName'>Name: </label>
        <div className='bg-white w-11/12 sm:w-96 border-2 rounded-full self-center flex border-black focus-within:border-blue-600 focus-within:text-blue-600'>
          <input
            required
            type="text"
            id="userName"
            value={userName}
            name="userName"
            onChange={(a) => { setName(a.target.value) }}
            className='border-0 outline-none pl-1 border-black self-center flex-grow rounded-full focus:text-black' />
        </div>
        <label htmlFor='userGen'>Gender: </label>
        <div className='flex justify-center'>
          <input
            required
            type="radio"
            id="userGen"
            onClick={(e) => {
              setGen(e.target.value);
            }}
            value="Male"
            name="userGen"
            onChange={(a) => { setGen(a.target.value) }}
            className='mr-1' />  Male
          <input
            required
            type="radio"
            onClick={(e) => {
              setGen(e.target.value);
            }}
            id="userGen"
            value="Female"
            name="userGen"
            onChange={(a) => { setGen(a.target.value) }}
            className='mr-1 ml-1' /> Female
        </div>
        <label htmlFor='userDOB'>Date of Birth: </label>
        <input
          type='date'
          id='userDOB'
          name='userDOB'
          onChange={e=>{handleDOBChange(e, setDOB, setAge)}}
          value={userDOB}
          max={new Date().toISOString().split("T")[0]}
          className='border-0 outline-none pl-1 w-32 border-black self-center flex-grow rounded-full focus:text-black' />
        <label htmlFor='userAge'>Age: </label>
        <input
          required
          type="number"
          id="userAge"
          value={userAge}
          name="userAge"
          readOnly
          className='border-0 outline-none pl-1 w-32 border-black self-center flex-grow rounded-full focus:text-black' />
        <input type="submit" onClick={(e) => {
          e.preventDefault();
          if (userAge !== "" && userDOB !== "" && userName !== "" && userGender !== "") {
            saveUserInfo(userId, userName, userAge, userGender, userDOB, navigate, state);
          } else
            alert("Fields can not be left empty!");
        }} />
      </form>
    </>
  )
}