import { useState, useEffect } from "react";
import { createBlog, getBlog, updateBlog } from "../services/blog";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import './create.css';

export default function Create() {
    const {id} = useParams();
    const [formData, setFormData] = useState({ title:"", content:""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            const fetchBlog = async() => {
                const response = await getBlog(id);
                if(response.status === 200){
                    setFormData(response.data);
                }
            };
            fetchBlog();
        }
    },[id]);

    const handleChange= (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            if(id){
                const response = await updateBlog(id, formData);
                if(response.status===200)
                toast.success("Blog Updated Successfully");
            else toast.error("Failed to Update Blog");
            }else{
                const response = await createBlog(formData);
                if(response.status===201)
                toast.success("Blog Created Successfully");
                else toast.error("Failed to Create Blog");
            }
            navigate("/");
        }catch(error){
            toast.error("Error creating/updating blog");
        }finally{
            setLoading(false);
        }
        
    };

    return(
        <div className="blog-form-container">
  <div className="blog-form-header">
    <h1>{id ? "Edit Blog" : "Create Blog"}</h1>
  </div>
  <form className="blog-form" onSubmit={handleSubmit}>
    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required/>
    <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} required/>
    <button disabled={loading} type="submit">{id? "Update" : "Create"}Blog</button>
    <button type="button" onClick={() => navigate('/')}>Cancel</button>
  </form>
</div>
    );
}