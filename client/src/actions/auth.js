import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, history) => async (disptach) => {
    try {
        const {data} = await  api.signIn(formData);
        disptach({type: AUTH, data});
        history.push('/');
    } catch (err) {
        console.log(err)
    }
}

export const signUp = (formData, history) => async (disptach) => {
    try {
        const {data} = await api.signUp(formData);
        disptach({type: AUTH, data});
        history.push('/');
    } catch (err) {
        console.log(err)
    }
}