import { CredentialResponse } from "@react-oauth/google";
import { atom } from "jotai";

type User = {
    email: string;
    picture: string;
}

export const loginUserAtom = atom<User | undefined>(undefined);

export const tokenResponseAtom = atom<CredentialResponse>({})