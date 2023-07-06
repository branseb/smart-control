import { useCallback, useState } from 'react';

function App() {
	const [device, setDevice] = useState<any>();
	const [deviceData, setDeviceData] = useState<any>();

	const loginDevice = useCallback(() => {
		fetch('http://localhost:5104/device', { method: 'POST' })
			.then(resp => resp.json())
			.then(setDevice);
	}, []);

	const loadData = useCallback(() => {
		if (device) {
			const headers = { 'Authorization': 'Bearer ' + device.token };
			fetch('http://localhost:5104/device', { headers })
				.then(resp => resp.json())
				.then(setDeviceData);
		}
	}, [device]);

	return (
		<div>
			{!device && <button onClick={loginDevice}>Login device</button>}

			{device && <div>token: {device.token}</div>}
			{device && <div>id: {device.id}</div>}

			{device && <button onClick={loadData}>Get secret data using token</button>}

			{deviceData && <div>device data: {JSON.stringify(deviceData)}</div>}
		</div>
	)
}

export default App;
