import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { config } from "../config";

export const Login = () => {
	const [user, setUser] = useState<any>();
	const [tokenResponse, setTokenResponse] = useState<CredentialResponse>();

	useEffect(() => {
		if (tokenResponse) {
			const body = JSON.stringify({ idToken: tokenResponse.credential });
			const headers = { "Content-Type": "application/json" };
			fetch(`${config.api}User/authenticate`, { method: 'POST', body, headers })
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
