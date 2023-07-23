using System.Web;
public class DevicesService : IDevicesService
{
    private List<(string, string, RoleStatus)> _assignedDevices = new List<(string, string, RoleStatus)>() {
        ("branseb@gmail.com", "000001" ,RoleStatus.Admin),
        ("branseb@gmail.com", "000003",RoleStatus.Guest),
    };

    private List<(string id, string pin)> _pairingDevices = new List<(string, string)>();

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
                    Data = new { Humidity= 90 },
                    Warnings = new List<string> () { SensorWarnings.HUMIDITY_HIGH }
                },
                new Sensor() {
                    Id = "000001-02",
                    Name = "Cacti",
                    SensorType = SensorType.FlowerHumiditySensor,
                    Status = SensorStatus.Online,
                    Data = new { Humidity = 2 },
                    Warnings = new List<string> () { SensorWarnings.HUMIDITY_LOW }
                },
                new Sensor() {
                    Id = "000001-03",
                    Name = "Aloe",
                    SensorType = SensorType.FlowerHumiditySensor,
                    Status = SensorStatus.Offline,
                    Data = new { Humidity = 20 },
                }
            },
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
            },
        },
        new DeviceDetail() {
            Id = "000003",
            Name = "Pi library",
            Status = DeviceStatus.Offline,
            Sensors = new List<Sensor>() { }
        }
    };
    public DeviceDetail GetDeviceDetail(string id, string userId)
    {
        var device = _devices.FirstOrDefault(d => d.Id == id);

        if (device == null)
            throw new HttpResponseException(404, "Device detail not found");

        var hasAccess = _assignedDevices.Exists(pair => pair.Item1 == userId && pair.Item2 == device.Id);
        if (!hasAccess)
            throw new HttpResponseException(403, "You have no access to this device");

        device.Admins = _assignedDevices
        .Where(a => a.Item2 == id && a.Item3 == RoleStatus.Admin)
        .Select(a => a.Item1)
        .ToList();


        device.Guests = _assignedDevices
        .Where(a => a.Item2 == id && a.Item3 == RoleStatus.Guest)
        .Select(a => a.Item1)
        .ToList();
        return device;
    }

    public IEnumerable<DeviceItem> GetDevices(string userId)
    {
        return _devices
            .Where(d => _assignedDevices.Exists(pair => pair.Item1 == userId && d.Id == pair.Item2))
            .Select((d) => DeviceDetailToDeviceItem(d, userId));
    }

    private DeviceItem DeviceDetailToDeviceItem(DeviceDetail deviceDetail, string userId) =>
        new DeviceItem()
        {
            Id = deviceDetail.Id,
            Name = deviceDetail.Name,
            Status = deviceDetail.Status,
            Warnings = MergeSensorWarnings(deviceDetail),
            Role = _assignedDevices.FirstOrDefault(i => i.Item1 == userId && i.Item2 == deviceDetail.Id).Item3
        };

    private static IEnumerable<string> MergeSensorWarnings(DeviceDetail deviceDetail) =>
        deviceDetail.Sensors?.SelectMany(s => s.Warnings ?? Enumerable.Empty<string>()) ?? Enumerable.Empty<string>();

    public void UpdateDevice(DeviceDetail device)
    {
        _devices.RemoveAll(dev => dev.Id == device.Id);
        _devices.Add(device);
    }

    public void StartPairing(string pin, string id)
    {
        var isInPairingList = _pairingDevices.Exists(i => i == (id, pin));
        var isAlreadyPaired = _assignedDevices.Exists(i => i.Item2 == id);

        if (isAlreadyPaired)
            throw new HttpResponseException(403, "device is paierd");

        if (isInPairingList)
            throw new HttpResponseException(403, "device is already in pairing state");

        if (!isAlreadyPaired && !isInPairingList)
            _pairingDevices.Add((id, pin));
    }

    public void Pair(string email, string id, string pin)
    {
        var isReadyToPairing = _pairingDevices.Exists(i => i.id == id && i.pin == pin);

        if (!isReadyToPairing)
            throw new HttpResponseException(403, "Incorrect id, pin or device is not waiting for pairing");

        _assignedDevices.Add((email, id, RoleStatus.Admin));
        _pairingDevices.RemoveAll(i => i == (id, pin));
    }

    public void AddRoleToDevice(string userEmail, string emailToAdd, string deviceId, RoleStatus roleStatus)
    {

        var hasAddUserPermission = _assignedDevices.Exists(a => a == (userEmail, deviceId, RoleStatus.Admin));
        if (!hasAddUserPermission)
            throw new HttpResponseException(403, "No permission to add user");

        var userInDeviceExist = _assignedDevices.Exists(a => a.Item1 == emailToAdd && a.Item2 == deviceId);

        if (userInDeviceExist)
        {
            _assignedDevices.RemoveAll(a => a.Item1 == emailToAdd && a.Item2 == deviceId);
        }
        _assignedDevices.Add((emailToAdd, deviceId, roleStatus));

    }
}