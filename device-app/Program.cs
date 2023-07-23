using System.Text.Json;
using System.Net.Http.Headers;
using System.Device.Gpio;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var file = File.ReadAllText("./ID_100010.json");
        var data = JsonSerializer.Deserialize<DeviceConfig>(file, new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        var controler = new GpioController();
        var redLED = 17;
        var greenLED = 27;
        var yelouLED = 18;
        var button = 19;
        controler.OpenPin(redLED, PinMode.Output);
        controler.OpenPin(greenLED, PinMode.Output);
        controler.OpenPin(yelouLED, PinMode.Output);
        controler.OpenPin(button, PinMode.Input);
        controler.Write(redLED, PinValue.High);
        controler.Write(greenLED, PinValue.Low);
        System.Console.WriteLine("start");


        var state = new DeviceState
        {
            Name = "Unnamed",
            Id = data?.Id,
            Status = Status.Online,
            Sensors = new List<Sensor>{
                new Sensor {Id="sensortest1",
                Name="sensorTest1",
                SensorType=SensorType.FlowerHumiditySensor,
                Status=Status.Online,
                Warnings=new List<string>{"low water test"},
                Data = "humidity=20" }
            }
        };
        if (data != null)
        {
            var httpclient = new HttpClient();
            httpclient.BaseAddress = new Uri("https://devices-api-azure.azurewebsites.net/");
            httpclient.DefaultRequestHeaders.Add("Authorization", "Bearer " + data?.Token);
            await PostAsyncStartPairing(httpclient, data);
            controler.Write(redLED, PinValue.Low);
            controler.Write(yelouLED, PinValue.High);

            System.Console.WriteLine("done");

            controler.RegisterCallbackForPinValueChangedEvent(button, PinEventTypes.Rising, async (x, y) =>
            {
                var newStatus = state.Status == Status.Online ? Status.Offline : Status.Online;
                controler.Write(greenLED, newStatus == Status.Online ? PinValue.High : PinValue.Low);
                controler.Write(redLED, newStatus == Status.Offline ? PinValue.High : PinValue.Low);
                state.Status = newStatus;
                await PostAsyncUploadState(httpclient, state);
            });

            Console.ReadLine();

            // while (true)
            // {
            //     bool click = ((bool)controler.Read(button));
            //     var newStatus = click ? Status.Online : Status.Offline;

            //     if (newStatus != state.Status)
            //     {
            //         controler.Write(greenLED, click ? PinValue.High : PinValue.Low);
            //         controler.Write()
            //         state.Status = newStatus;
            //         await PostAsyncUploadState(httpclient, state);
            //     }

            //     Thread.Sleep(1000);
            // }
        }








    }

    static async Task PostAsyncStartPairing(HttpClient httpClient, DeviceConfig deviceConfig)
    {
        var response = await httpClient.PostAsync("Device/startPairing?pin=" + deviceConfig?.Pin, null);
        System.Console.WriteLine(response.StatusCode);
    }

    static async Task PostAsyncUploadState(HttpClient httpClient, DeviceState deviceState)
    {
        var content = new StringContent(JsonSerializer.Serialize(deviceState));

        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

        var response = await httpClient.PostAsync("Device/uploadState", content);
        System.Console.WriteLine(response.StatusCode);
    }
}