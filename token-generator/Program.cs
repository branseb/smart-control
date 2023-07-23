using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
public class Result
{
    public string Id { get; set; }
    public string Pin { get; set; }
    public string Token { get; set; }
}

static class Program
{
    static void Main()
    {
        if (!Directory.Exists("devices"))
        {
            Directory.CreateDirectory("devices");
        }

        var result = GenerateTokenAsymmetric();
        string id = result.Id;
        string pin = result.Pin;
        string token = result.Token;
        string json = JsonSerializer.Serialize(result, new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        System.Console.WriteLine(json);
        File.WriteAllText($"devices/ID_{result.Id}.json", json);
        Console.WriteLine($"Id:{id}");
        Console.WriteLine($"Pin:{pin}");
        Console.WriteLine($"Token:{token}");
    }

    static string StringSeparation(this string source, int length)
    {

        StringBuilder result = new StringBuilder();

        for (int i = 0; i < source.Length; i++)
        {
            result.Append(source[i]);
            if ((i + 1) % length == 0 && i != source.Length - 1)
            {
                result.Append("-");
            }
        }

        return result.ToString();
    }

    static string GetLast(this string source, int tail_length)
    {
        if (tail_length >= source.Length)
            return source;
        return source.Substring(source.Length - tail_length);
    }

    static Result GenerateTokenAsymmetric()
    {
        string filename = "counter.txt";
        string id = "";

        if (File.Exists(filename))
        {
            string filetext = File.ReadAllText(filename);

            try
            {
                int result = Int32.Parse(filetext);
                result++;

                File.WriteAllText(filename, result.ToString());
                id = result.ToString();
            }
            catch (FormatException)
            {
                Console.WriteLine($"Unable to parse'{filetext}'");
            }

        }
        else
        {
            id = "100000";
            File.WriteAllText(filename, "100000");
            Console.WriteLine("file not exist , is created!");
        }


        using RSA rsa = RSA.Create();
        var privateKey = File.ReadAllText("./private-key.txt");

        Console.WriteLine(privateKey);

        rsa.ImportRSAPrivateKey(
            source: Convert.FromBase64String(privateKey),
            bytesRead: out int _);

        var signingCredentials = new SigningCredentials(
            key: new RsaSecurityKey(rsa),
            algorithm: SecurityAlgorithms.RsaSha256 // Important to use RSA version of the SHA algo 
        )
        {
            CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
        };

        var jwt = new JwtSecurityToken(
            audience: "jwt-test-app",
            issuer: "jwt-test-app",
            claims: new Claim[] { new Claim(ClaimTypes.NameIdentifier, id) },
            signingCredentials: signingCredentials
        );

        string token = new JwtSecurityTokenHandler().WriteToken(jwt);

        string pin = Guid.NewGuid().ToString().ToUpper().GetLast(12).StringSeparation(4);

        return new Result()
        {
            Id = id,
            Pin = pin,
            Token = token
        };
    }
}