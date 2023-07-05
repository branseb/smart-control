public class DeviceDetail
{
	public string? Name { get; set; }
	public string? Id { get; set; }
	public DeviceStatus Status { get; set; }
	public IEnumerable<Sensor>? Sensors { get; set; }
}