import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from "../features/authSlice";

const useAuthCall = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate() 
  const BASE_URL = "https://12126.fullstack.clarusway.com/";

  const login = async (userInfo) => {
    dispatch(fetchStart());

    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data))
      navigate("/stock")
      console.log(data);
      {/*return data;*/}
    } catch (error) {
      dispatch(fetchFail())
      console.log(error);
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());

    try {
      const { data } = await axios.post(
        `${BASE_URL}account/account/register/`,
        userInfo
      );
      dispatch(registerSuccess(data))
      navigate("/stock")
      console.log(data);
      {/*return data;*/}
    } catch (error) {
      dispatch(fetchFail())
      console.log(error);
    }
  };
  
  const logout = async () => {
    dispatch(fetchStart());

    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/logout/`);
      dispatch(logoutSuccess(data))
      navigate("/")
      console.log(data);
      {/*return data;*/}
    } catch (error) {
      dispatch(fetchFail())
      console.log(error);
    }
  };

  return { login, register, logout }
};

export default useAuthCall;
