import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error}); 
    }
};

export const logoutCall = async(userCredentials, dispatch) => {
    dispatch({ type: "LOGOUT_START"});
    try {
        const res = await axios.get("/auth/logout", userCredentials);
        dispatch({ type: "LOGOUT_SUCCESS", payload: res.status(200)});
    } catch (error) {
        dispatch({ type: "LOGOUT_FAILURE", payload: error});
    }
}