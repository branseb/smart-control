public interface IDevicesService {
	IEnumerable<DeviceItem> GetDevices();
	DeviceDetail GetDeviceDetail(string id);
}