import axios from 'axios';


const baseUrl = "http://localhost:8000/api";

export const getCourses = async() => {
    try{
        const response = await axios.get(`${baseUrl}/course/public`);
        return response.data
    }catch(error){
        console.log(error)
    }
}