import { useState } from "react";
import {login} from "../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './login.css';

export default function Login(){
    const [userData, setUserData] = useState({email:"", password:""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response = await login(userData);
            if(response.status === 200){
            toast.success("Login Successful");
            navigate("/");
            }
        }catch(error){
            toast.error("Login Failed");
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="login-container">
  <div className="login-header">
    <h1>Login</h1>
  </div>
  <form className="login-form" action="" onSubmit={handleSubmit}>
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required  />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required  />
    <button disabled={loading} type="submit">Login</button>
    <p style={{textAlign:"center"}}>Don't have an account? <button className="register-button" onClick={() => navigate('/register')}>Register</button></p>
  </form>
</div>
    );
}