import { Button } from "@mui/material";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

export const Login = () => {
	const [user, setUser] = useState<any>();
	const [tokenResponse, setTokenResponse] = useState<TokenResponse>();

	const login = useGoogleLogin({
		onSuccess: setTokenResponse,
		onError: (error) => console.log('Login Failed:', error),
	});

	useEffect(() => {
		if (tokenResponse)
			fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`)
				.then(resp => resp.json())
				.then(resp => setUser(resp))
	}, [tokenResponse]);

	if (user)
		return (
			<img src={user.picture} height={36} style={{ borderRadius: '50%' }} />
		)

	return (
		<Button onClick={() => login()} color="inherit">LOGIN</Button>
	)
};
