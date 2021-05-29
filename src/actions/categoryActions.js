import {
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_FAIL,
    SUB_CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_REQUEST
} from '../constants/categoryConstants';
import axios from 'axios';
import Axios from 'axios';

const listCategory = () => async (dispatch, getState) => {
    try {
        dispatch({type: CATEGORY_LIST_REQUEST});
        const {
            userSignin: {userInfo}
        } = getState();

        const {data} = await axios.get("http://localhost:8000/api/category", {
            headers: {
                Authorization: "Bearer " + userInfo.meta.token
            }
        });
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CATEGORY_LIST_FAIL, payload: error.message});
    }
};

const listSubCategory = (id = null
) => async (dispatch, getState) => {
    try {
        dispatch({type: SUB_CATEGORY_LIST_REQUEST});
        const {
            userSignin: {userInfo}
        } = getState();

        let url = ''
        if(id){
            url = "http://localhost:8000/api/sub-category/"+ id
        }else{
            url = "http://localhost:8000/api/sub-category"
        }
        const {data} = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + userInfo.meta.token
            }
        });
        dispatch({type: SUB_CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: SUB_CATEGORY_LIST_FAIL, payload: error.message});
    }
};

export {
    listCategory,
    listSubCategory,
};
