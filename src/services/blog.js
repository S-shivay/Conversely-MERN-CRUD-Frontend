import axios from 'axios';
import { BACKEND_URL } from '../utils/constant';

export const createBlog = async(data) => {
    const token = localStorage.getItem('token');
    try{
        const response = await axios.post(`${BACKEND_URL}/blog`, data,{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded',
                }
        });
        return response;
    }catch(error){
        return new Error(error.response.data.message);
    }
}

export const getBlog = async(id) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/blog/${id}`);
        return response;
    }catch(error){
        return new Error(error.response.data.message);
    }
}

export const getAllBlog = async() => {
    try{
        const response = await axios.get(`${BACKEND_URL}/blog`);
        return response;
    }catch(error){
        return new Error(error.response.data.message);
    }
}



export const updateBlog = async(id, data) => {
    const token = localStorage.getItem('token');
    try{
        const response = await axios.put(`${BACKEND_URL}/blog/${id}`, data, {
            headers: {
                'Authorization': token,
                'Content-Type':'application/x-www-form-urlencoded'
                }
                });
                return response;
                }catch(error){
                    return new Error(error.response.data.message);
                    }
}


export const deleteBlog = async(id) => {
    const token = localStorage.getItem('token');
    try{
        const response = await axios.delete(`${BACKEND_URL}/blog/${id}`, {
            headers: {
                'Authorization': token,
                }
                });
                return response;
                
                }catch(error){
                    return new Error(error.response.data.message);
                    }
}