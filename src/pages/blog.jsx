import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlog, deleteBlog } from "../services/blog";
import toast from "react-hot-toast";
import './blog.css';


export default function Blog() {
    const {id} = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            const response = await getBlog(id);
            if(response.status === 200){
                setBlog(response.data);
            }
            setLoading(false);
        };
        fetchBlog();
    },[id]);

    const handleDelete = async (id) => {
        try{
            const response = await deleteBlog(id);
            if(response.status === 200){
                toast.success("Blog deleted successfully");
                navigate("/");
        }else{
            toast.error("Failed to delete blog");
        }
    }catch (error) {
        toast.error("Error deleting blog");
    }
    };

    return(
        <div className="blog-details-container">
        <div className="blog-details-header">
          <h1>Blog Details</h1>
        </div>
        {loading ? (
          <div className="loading-indicator">
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="blog-details-content">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <button className="edit-button" onClick={() => navigate(`/edit/${id}`)}>Edit Blog</button>
            <button className="delete-button" onClick={() => handleDelete(blog._id)}>Delete Blog</button>
          </div>
        )}
      </div>
    );
}