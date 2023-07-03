import { atom } from "jotai";

export type User = {
    id:string,
    name:string,
    password:string
};

const unloginUser:User = {
    id:'log',
    name:'',
    password:''
} 

export const  loginUserAtom = atom<User>(unloginUser)