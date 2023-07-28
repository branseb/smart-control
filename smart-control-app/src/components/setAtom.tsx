import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { tokenResponseAtom } from "../store/loginAtom";

export const SetAtom = () => {
    const setToken = useSetAtom(tokenResponseAtom);
    useEffect(() => {

        setToken({
            clientId
                :
                "clientid@google",
            credential
                :
                "token here",
            select_by
                :
                "user"
        })
    }, [])
    return null;
}