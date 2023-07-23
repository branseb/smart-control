public class DeviceDetail
{
	public string? Name { get; set; }
	public string? Id { get; set; }
	public DeviceStatus Status { get; set; }
	public IEnumerable<Sensor>? Sensors { get; set; }
	public List<string>? Admins {get;set;}
	public List<string>? Guests {get;set;}
}