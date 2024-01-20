import { ISLOGIN, ISLOADING, USER_DATA } from "./action_type";
import axios from "axios";

export const isLogin = (payload) => {
    return {
        type: ISLOGIN,
        payload
    }
}

export const isLoading = (payload) => {
    return {
        type: ISLOADING,
        payload
    }
}

export const userData = (payload) => {
    return {
        type: USER_DATA,
        payload
    }
}
// REGISTER

export const registerUser = (data) => async (dispatch) => {
    let result;
    try {
        const res = await axios({
            method: 'POST',
            url: `http://node.mitrahsoft.co.in/register`,
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password
            }
        })
        result = res.data;
        return result;
    }
    catch (error) {
        console.log(error);
    }

}

// LOGIN

export const loginUser = (data) => async(dispatch) => {
    let result;
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://node.mitrahsoft.co.in/login',
            data: {
                email: data.email,
                password: data.password
            }
        })
        result = res;
        return result;
    }
    catch (error) {
        return error.response;
    }
}

// Get User Data

export const getUserData = (token, id) => async (dispatch) => {
    let data;
    let userId = Number(id);
    try {
        const res = await axios({
            method: 'GET',
            url: id > 0 ? `http://node.mitrahsoft.co.in/user/${userId}` : 'http://node.mitrahsoft.co.in/users',
            headers: {
                Authorization: token
            }
        })
        data = res.data.recordset;
        dispatch(userData(data));
    }
    catch (error) {
        console.log(error);
    }

    return data;
}

// Add user data

export const addEditUserData = (token, userData, id, method) => async () => {
    let data;
    try {
        const res = await axios({
            method: method,
            url: method === 'POST' ? `http://node.mitrahsoft.co.in/user` : `http://node.mitrahsoft.co.in/user/${id}`,
            headers: {
                Authorization: token
            },
            data: {
                name: userData.name,
                gender: userData.gender,
                job: userData.job,
                profile_img: userData.profile_picture
            }
        })
        data = res;
    }
    catch (error) {
        console.log(error);
    }
    return data;
}

// Edit user data
export const deleteUserData = (token, id) => async () => {
    let data;
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://node.mitrahsoft.co.in/user/${id}`,
            headers: {
                Authorization: token
            }
        })
        data = res.data;
    }
    catch (error) {
        console.log(error);
    }
    return data;
}