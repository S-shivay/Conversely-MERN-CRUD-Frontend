import { useState } from "react";
import {register} from "../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './register.css';

export default function Register() {
    const [userData, setUserData] = useState({
        name:"",
        email:"",
        password:"",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!userData.name || !userData.email || !userData.password){
            toast.error("All fields are required");
            setLoading(false);
            return;
        }
        try {
            const {name,email,password} = userData;
            const response = await register({name,email,password});
            if(response.status === 200){
                toast.success("User registered successfully");
                navigate("/login");
            }
        }
        catch(error){
            alert(error.message);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="register-container">
  <div className="register-header">
    <h1>Register</h1>
  </div>
  <form className="register-form" action="" onSubmit={handleSubmit}>
    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <button disabled={loading} type="submit">Register</button>
  </form>
  <p style={{textAlign:"center"}}>Already have an account? <button className="login-button" onClick={() => navigate('/login')}>Login</button></p>
</div>
    )
}
