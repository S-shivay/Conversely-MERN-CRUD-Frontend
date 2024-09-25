import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import { Toaster } from "react-hot-toast";
import Create from "./pages/create";
import  Blog  from "./pages/blog";

function App() {
  

  return (
    <>
      <Toaster/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/create" element={<Create/>}/>
    <Route path="/blog/:id" element={<Blog/>}/>
    <Route path="/edit/:id" element={<Create/>}/>
    </Routes>
    </>
  )
}

export default App


