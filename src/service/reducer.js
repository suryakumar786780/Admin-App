import { ISLOGIN, ISLOADING, REGISTER, USER_DATA } from "./action_type";

const public_initialState = {
    isLogin:false,
    isLoading: false,
    registeredData: {},
    registerResponseError: {
        err: false,
        errValue: "",
    },
    loginResponseError: {
        err: false,
        errValue: ""
    }
}

export const reducer_public = (state = public_initialState, action) => {
    switch (action.type) {
        case ISLOGIN: {
            return { ...state, isLogin: action.payload }
        }
        case ISLOADING: {
            return { ...state, isLoading: action.payload }
        }
        case REGISTER: {
            return { ...state, registeredData: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}

const private_initValue = {
    user_data : []
}

export const reducer_private = (state = private_initValue, action) => {
    switch (action.type) {
        case USER_DATA: {
            return { ...state, user_data: action.payload }
        }
        
        default: {
            return { ...state }
        }
    }
}