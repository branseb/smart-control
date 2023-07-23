import { CredentialResponse } from "@react-oauth/google";
import { atom } from "jotai";

export const loginUserAtom = atom<any>(undefined)

export const tokenResponseAtom = atom<CredentialResponse>({})