import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { config } from "../config";
import { DeviceItemType } from "../models/deviceItem";

export const Login = () => {
	const [token, setToken] = useState<any>();
	const [tokenResponse, setTokenResponse] = useState<CredentialResponse>();
	const [user, setUser] = useState<any>();

	useEffect(() => {
		if (tokenResponse) {
			const body = JSON.stringify({ idToken: tokenResponse.credential });
			const headers = { "Content-Type": "application/json" };
			fetch(`${config.authApi}User/authenticate`, { method: 'POST', body, headers })
				.then(resp => resp.json())
				.then(setToken)
		}
	}, [tokenResponse]);

	useEffect(() => {
		if(token) {
			const headers = { 'Authorization': 'Bearer ' + token.authToken };
			fetch(`${config.api}Devices/user`, { headers })
				.then(resp => resp.json())
				.then(setUser)
		}
	}, [token]);

	console.log(token);
	console.log(user);

	if (token)
		return (
			<img src={token.picture} height={36} style={{ borderRadius: '50%' }} />
		)

	return (
		<GoogleLogin onSuccess={setTokenResponse} />
	)
};
