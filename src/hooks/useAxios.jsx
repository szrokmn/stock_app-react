import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {

    const {token} = useSelector((state) => state.auth )
   
    const axiosWithToken = axios.create({
        baseURL: "https://12126.fullstack.clarusway.com/",       
        headers: {'Authorization': `Token ${token}`}
      });

    return { axiosWithToken }
  }
  
  export default useAxios