import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer_public, reducer_private } from "./reducer";
import { thunk } from "redux-thunk";

export const store = createStore(combineReducers({
    reducer_public, reducer_private 
}),applyMiddleware(thunk)
    
);