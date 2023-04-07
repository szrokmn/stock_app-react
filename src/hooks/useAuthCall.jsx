import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = "https://12126.fullstack.clarusway.com/";
  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/stock");
      console.log(data);
      return data;
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/stock");
      console.log(data);
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Register can not be performed");
      console.log(error);
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}account/auth/logout/`);
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      navigate("/");
      console.log(data);
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
      console.log(error);
    }
  };

  return { login, register, logout };
};

export default useAuthCall;
