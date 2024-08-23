import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;


export const getCourses = async() => {
    try{
        const response = await axios.get(`${baseUrl}/course/public`);
        return response.data
    }catch(error){
        return {
            success: false,
            message: error.message || 'Failed to fetch courses'
        };
    }
}