import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {

    const {token} = useSelector((state) => state.auth )
    
    const axiosWithToken = axios.create({
        baseURL: 'https://some-domain.com/api/',       
        headers: {'Authorization': `Token ${token}`}
      });

    return { axiosWithToken }
  }
  
  export default useAxios