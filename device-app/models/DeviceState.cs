public class DeviceState{
    public string? Name {get;set;}
    public string? Id {get;set;}
    public Status Status{get;set;}

    public IEnumerable<Sensor>? Sensors {get;set;}

} 
public enum Status{Offline,Online}
public enum SensorType {FlowerHumiditySensor}

public class Sensor {
    public string? Id {get;set;}
    public string? Name {get;set;}
    public SensorType SensorType {get;set;}
    public Status Status {get;set;}
    public IEnumerable<string>? Warnings {get;set;}
    public string? Data {get;set;}

}