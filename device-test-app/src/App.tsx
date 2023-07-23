import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { DeviceType } from './hooks/hooks';

type SensorType = {
	id: string,
	name: string,
	type: number,
	status: number,
	warnings: string[],
	data: string,
}

function App() {

	const [device, setDevice] = useState<DeviceType>({});

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.addEventListener('load', (event) => {
				const textContent = event.target?.result;
				if (textContent) {
					const result = JSON.parse(textContent as string);
					setDevice(result);
				}
			});
			reader.readAsText(file);
		}
	}
	const [deviceName, setDeviceName] = useState<string>('');
	const [deviceStatus, setDeviceStatus] = useState<number>(0);

	const [sensorName, setSensorName] = useState<string>('');
	const [sensorType, setSensorType] = useState<number>(0);
	const [sensorStatus, setSensorStatus] = useState<number>(0)
	const [sensorWarning, setSensorWarning] = useState<string>('');
	const [sensorWarnings, setSensorWarnings] = useState<string[]>([]);
	const [sensorData, setSensorData] = useState<any>({});

	const [sensors, setSensors,] = useState<SensorType[]>([]);

	const updateDevice = () => {
		const newDevice: any = {
			id: device.id, name: deviceName, status: deviceStatus, sensors: sensors
		};
		const body = JSON.stringify(newDevice);
		const headers = {
			'Authorization': 'Bearer ' + device.token,
			"Content-Type": "application/json",
		};
		fetch('http://localhost:5104/device/uploadState', { body, headers, method: 'POST' })
			.then(() => console.log('device updated'))
			.catch((err) => console.log('device update failed', err))
	};

	const startPairing = () => {
		const headers = { 'Authorization': 'Bearer ' + device.token };
		fetch(`http://localhost:5104/Device/startPairing?pin=${device.pin}`, { headers, method:'POST' })

	}

	const onAddSensorButtonClick = () => {
		setSensors(prev => [...prev, {
			id: Math.random().toString(30),
			name: sensorName,
			status: sensorStatus,
			type: sensorType,
			warnings: sensorWarnings,
			data: sensorData
		}]);
		setSensorName('');
		setSensorStatus(0);
		setSensorType(0);
		setSensorWarning('');
		setSensorWarnings([]);
		setSensorData('');
	}


	return (
		<div>
			<input type='file' onChange={handleFileChange}></input>
			<div>{device.token?.length ?
				<div>
					<div>token: {device.token}</div>
					<div>id: {device.id}</div>
					<div>pin: {device.pin}</div>
					<Button variant='contained' onClick={startPairing}>Pair device</Button>

					<div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10, padding: 5, alignItems: 'center' }}>
						<TextField label='Device Name' value={deviceName} onChange={(e) => setDeviceName(e.target.value)}></TextField>
						<FormControl>
							<FormLabel>Status</FormLabel>
							<RadioGroup>
								<FormControlLabel value={0} control={<Radio onClick={() => setDeviceStatus(0)} />} label='Offline'></FormControlLabel>
								<FormControlLabel value={1} control={<Radio onClick={() => setDeviceStatus(1)} />} label='Online'></FormControlLabel>
							</RadioGroup>
						</FormControl>
						<Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', width: '55%', margin: 2, }}>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 10 }}>
								{sensors.length > 0 &&
									<Grid paddingBottom={2} container spacing={1}>
										{sensors.map(sensor =>
											<Grid key={sensor.id} item onClick={() => setSensors(prev => prev.filter(sen => sen.id !== sensor.id))} >
												<Paper elevation={2} sx={{ padding: 1 }}>{sensor.name}</Paper>

											</Grid>)}
									</Grid>}
								<Typography>Sensor</Typography>
								<TextField label='Sensor name' value={sensorName} onChange={(e) => setSensorName(e.target.value)}></TextField>
								<InputLabel>Sensor Type</InputLabel>
								<Select
									value={sensorType}
									type='number'
									onChange={e => setSensorType(e.target.value as number)} >
									<MenuItem value={0}>Humidity Sensor</MenuItem>
								</Select>
								<FormControl>
									<FormLabel>Status</FormLabel>
									<RadioGroup >
										<FormControlLabel value={0} control={<Radio onClick={() => setSensorStatus(0)} />} label='Offline'></FormControlLabel>
										<FormControlLabel value={1} control={<Radio onClick={() => setSensorStatus(1)} />} label='Online'></FormControlLabel>
									</RadioGroup>
								</FormControl>
								{sensorWarnings.length > 0 &&
									<Grid paddingBottom={2} container spacing={1}>
										{sensorWarnings.map(warning =>
											<Grid item onClick={() => setSensorWarnings(prev => prev.filter(warn => warn !== warning))} >
												<Paper elevation={2} sx={{ padding: 1 }}>{warning}</Paper>

											</Grid>)}
									</Grid>}
								<TextField label='Warning' value={sensorWarning} onChange={e => setSensorWarning(e.target.value)}></TextField>
								<Button
									disabled={sensorWarning.length < 5}
									onClick={() => { setSensorWarnings(prev => [...prev, sensorWarning]), setSensorWarning('') }}>
									Add warning
								</Button>
								<TextField type='number' label='Humidity' value={sensorData.humidity ?? ''} onChange={e => setSensorData({ humidity: +e.target.value })} ></TextField>
								<Button variant='contained' onClick={onAddSensorButtonClick}>Add Sensor</Button>
							</div>

						</Paper>
					</div>

					<Button variant='contained' onClick={updateDevice}>send device data</Button>
				</div>
				: <div>
					<p>Device Document not Fount !</p>
				</div>}
			</div>
		</div>
	)
}


export default App;
