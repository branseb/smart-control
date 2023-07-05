public interface IDevicesService {
	IEnumerable<DeviceItem> GetDevices(string userId);
	DeviceDetail GetDeviceDetail(string id, string userId);
}