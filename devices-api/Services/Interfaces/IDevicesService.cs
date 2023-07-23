public interface IDevicesService {
	IEnumerable<DeviceItem> GetDevices(string userId);
	DeviceDetail GetDeviceDetail(string id, string userId);
	void UpdateDevice(DeviceDetail device);

	void StartPairing(string pin , string id);

	void Pair(string email , string id , string pin);

	void AddRoleToDevice(string userEmail, string emailToAdd, string deviceId, RoleStatus roleStatus);
}