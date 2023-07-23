public class Sensor
{
    public string? Id { get; set; }
    public string? Name { get; set; }
    public SensorType SensorType { get; set; }
    public SensorStatus Status { get; set; }
    public IEnumerable<string>? Warnings { get; set; }
    public dynamic? Data { get; set; }
}