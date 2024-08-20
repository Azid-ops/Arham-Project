import { React, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteAcc, showData, hideData, fetchData, logOut } from './HomeFunc';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log("state:", state);
  const [userData, setUserData] = useState(null);
  const [showDataButton, setShowDataButton] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token"))
      navigate("/");
  }, [])

  useEffect(() => {
    fetchData(state, setUserData);
  }, [])


  return (
    <>
    <div className='border-2 border-black flex flex-col text-center'>
      <button onClick={e=>{logOut(navigate)}}>LogOut</button>
      <button onClick={() => {
        navigate("/userinfo", { state: { update: "UPDATE", userID: state?.ID } });
      }}>Update Info</button>
      <button onClick={e=>{deleteAcc(state, navigate)}}>Delete Account</button>
      {showDataButton ? (
        <button onClick={e=>{showData(setShowDataButton)}}>Show User Data</button>
      ) : (
        <button onClick={e=>{hideData(setShowDataButton)}}>Hide User Data</button>
      )}
      {!showDataButton && userData && (
        <>
          <h2>Name: </h2>
          <p>{userData.usdName}</p>
          <h2>Gender: </h2>
          <p>{userData.usdGender}</p>
          <h2>Date of Birth: </h2>
          <p>{userData.usdDOB}</p>
          <h2>Age: </h2>
          <p>{userData.usdAge}</p>
        </>
      )}
      </div>
    </>
  )
}