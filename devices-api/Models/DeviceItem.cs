public class DeviceItem
{
    public string? Name { get; set; }
    public string? Id { get; set; }
    public DeviceStatus Status { get; set; }
    public IEnumerable<string>? Warnings { get; set; }
    public RoleStatus Role { get; set; }
}