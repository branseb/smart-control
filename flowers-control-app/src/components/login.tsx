import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { config } from "../config";

export const Login = () => {
	const [tokenResponse, setTokenResponse] = useState<CredentialResponse>();
	const [user, setUser] = useState<any>();

	useEffect(() => {
		if(tokenResponse) {
			const headers = { 'Authorization': 'Bearer ' + tokenResponse.credential };
			fetch(`${config.api}Devices/user`, { headers })
				.then(resp => resp.json())
				.then(setUser)
		}
	}, [tokenResponse]);

	if (user)
		return (
			<img src={user.picture} height={36} style={{ borderRadius: '50%' }} />
		)

	return (
		<GoogleLogin onSuccess={setTokenResponse} />
	)
};
