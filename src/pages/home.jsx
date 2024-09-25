import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlog, getAllBlog } from "../services/blog";
import { verifyToken } from "../utils/auth";
import toast from "react-hot-toast";
import './home.css';

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response = await verifyToken();
                if(response.status === 200){
                    setUser(response.data);
                }
            }catch(error){
                console.log(error);
            }
        };

        const fetchAllBlogs = async () => {
            setLoading(false);
            const response = await getAllBlog();
            if(response.status === 200){
                setBlogs(response.data);
            }
            setLoading(false);
        };

        

        fetchUser();
        fetchAllBlogs();
    },[]);

    const handleDelete = async (id) => {
        try{
            const response = await deleteBlog(id);
            if(response.status === 200){
                toast.success("Blog deleted successfully");
                setBlogs(blogs.filter(blog => blog._id !== id));
        }else{
            toast.error("Failed to delete blog");
        }
    }catch (error) {
        toast.error("Error deleting blog");
    }
    };

    return(
        <div className="home-container">
  <div className="home-header">
    <h1>Home</h1>
  </div>
  <div className="button-container">
    {user && <button className="create-button" onClick={()=> navigate('/create')}>Create Blog</button>}
    <button className="logout-button" onClick={()=> {localStorage.removeItem('token'); navigate('/login');}}>Logout</button>
  </div>
  {loading ? (
    <div className="loading-indicator">
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="blog-list">
      {blogs.map(blog => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>By : {blog.author}</p>
          <p>{blog.content.substring(0,100)}...</p>
          <button className="view-button" onClick={()=> navigate(`/blog/${blog._id}`)}>View</button>
          {user && user.email === blog.author && (
            <>
            <button className="edit-button" onClick={()=> navigate(`/edit/${blog._id}`)}>Edit</button>
            <button className="delete-button" onClick={()=> handleDelete(blog._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  )}
</div>
    );
}