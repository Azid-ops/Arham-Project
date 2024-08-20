import SignUp from "./components/SignUp"
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import LogIn from "./components/LogIn"
import Home from "./components/Home"
import UserInfo from "./components/UserInfo"

function App() {
  const Router = createBrowserRouter(createRoutesFromElements(
    <Route path="" element={<Outlet/>}>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/userinfo" element={<UserInfo/>}/>
    </Route>
  ))
  return (
    <>
      <RouterProvider router={Router}/>
    </>
  )
}

export default App
