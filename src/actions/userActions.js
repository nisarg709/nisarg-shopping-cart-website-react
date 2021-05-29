import Axios from "axios";
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";

const update = ({userId, name, email, password}) => async (dispatch, getState) => {
    const {userSignin: {userInfo}} = getState();
    dispatch({type: USER_UPDATE_REQUEST, payload: {userId, name, email, password}});
    try {
        const {data} = await Axios.put("/api/users/" + userId,
            {name, email, password}, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token
                }
            });
        dispatch({type: USER_UPDATE_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_UPDATE_FAIL, payload: error.message});
    }
}

const signin = (email, password) => async dispatch => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await Axios.post("http://localhost:8000/api/login", {
            email,
            password
        });
        if (data.meta.status === 0) {
            dispatch({type: USER_SIGNIN_FAIL, payload: data.meta.message});
        } else {
            dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
            Cookie.set("userInfo", JSON.stringify(data));
        }
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message});
    }
};

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({type: USER_LOGOUT})
}
export {signin, logout, update};