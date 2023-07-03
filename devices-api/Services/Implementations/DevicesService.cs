using System.Web;
public class DevicesService : IDevicesService
{
	private List<DeviceDetail> _devices = new List<DeviceDetail>() {
		new DeviceDetail() {
			Id = "000001",
			Name = "Pi living room",
			Status = DeviceStatus.Online,
			Sensors = new List<Sensor>() {
				new Sensor() {
					Id = "000001-01",
					Name = "Avocado",
					SensorType = SensorType.FlowerHumiditySensor,
					Status = SensorStatus.Online,
					Data = new { Humidity= 90 }
				},
				new Sensor() {
					Id = "000001-02",
					Name = "Cacti",
					SensorType = SensorType.FlowerHumiditySensor,
					Status = SensorStatus.Online,
					Data = new { Humidity = 2 }
				},
				new Sensor() {
					Id = "000001-03",
					Name = "Aloe",
					SensorType = SensorType.FlowerHumiditySensor,
					Status = SensorStatus.Offline,
					Data = new { Humidity = 20 }
				}
			}
		},
		new DeviceDetail() {
			Id = "000002",
			Name = "Pi kitchen",
			Status = DeviceStatus.Online,
			Sensors = new List<Sensor>() {
				new Sensor() {
					Id = "000002-01",
					Name = "Palm tree 1",
					SensorType = SensorType.FlowerHumiditySensor,
					Status = SensorStatus.Online,
					Data = new { Humidity= 20 }
				},
				new Sensor() {
					Id = "000002-02",
					Name = "Palm tree 2",
					SensorType = SensorType.FlowerHumiditySensor,
					Status = SensorStatus.Online,
					Data = new { Humidity = 22 }
				},
				new Sensor() {
					Id = "000002-03",
					Name = "Palm tree 3",
					SensorType = SensorType.FlowerHumiditySensor,
					Status = SensorStatus.Offline,
					Data = new { Humidity = 18 }
				}
			}
		},
		new DeviceDetail() {
			Id = "000003",
			Name = "Pi library",
			Status = DeviceStatus.Offline,
			Sensors = new List<Sensor>() { }
		}
	};

	public DeviceDetail GetDeviceDetail(string id)
	{
		var device = _devices.FirstOrDefault(d => d.Id == id);

		if (device == null)
			throw new HttpResponseException(404, "Device detail not found");

		return device;
	}

	public IEnumerable<DeviceItem> GetDevices()
	{
		return _devices;
	}
}