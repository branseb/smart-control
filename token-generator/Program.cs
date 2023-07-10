﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;



class Program
{
    static void Main()
    {
        var result = GenerateTokenAsymmetric();
        string id = result.Id;
        string Pin = result.Pin;
        string Token = result.Token;
        Console.WriteLine(id);

    }

    static (string Token, string Id, string Pin) GenerateTokenAsymmetric()
    {
        using RSA rsa = RSA.Create();
        rsa.ImportRSAPrivateKey(
            source: Convert.FromBase64String("MIIEpgIBAAKCAQEA27rpMS4MT/9PFyFLK37eteZik0M/t/KIMu/hDjgfJwCPwNYIUYnWHcE3Hg3d1wgtLKi+OABGQFbXVkJlPxpdTXSUd9BIC0pA+vZq2Bg75gyp57j3ojqfCl7MtOwn+TawRhnigXixWK/V45xcW/zWnRPLwNaHvbSHTYxcms8rkaaSv3ULhcT0zxfsk9u/I6y6NFxnWS4rQg11vRB6vlCywvQUyvs1jB1YqzZa0hR+ZFKvqXxBq52T6FsNkCAwkYgabrpAzJUaAkdOFAbXdSB6WrYn5p8/eLpvqPBofgjf0eV4csgaBxyAOyNC2V8rgfwxa4BVinNs/Blhra7h9HqFjQIDAQABAoIBAQDF7VYFIO+iV95MfYcSxROkUsTU1izda7DYAVB+2HrnTRAwqhuQJ1MiNluJzP/ZpNnccpv2IfkmF5Odde1xrDQDg1IBozJiSR7DcZjI0vuRvDKIMwuNrLR6SO6owlk3mdWrL8Hi0m8d7jYC82QW0GgZ0i0lpZlcfvOqHReFs7wRU4hCMoAdj3btyoxHo7b4MMk/jjepEoyqstGqOiG0V6tPz7spV2Sj3wMS9WhjqJnvO8SwjFLT03AlGydqhyqq+R5Ncja9unx4d4h8nLGBUw8I2+h7mWFGpMXokmg8uGE9wnVbq8jfjW35SIAPsTFfCIEJx9daHUwZovXmolBL6DBZAoGBANwyupozA+lk4bVHri4aiUK5iCQpstN6QKDJVZaEagtpoj9/Dr1BLY05xy4ZNjXH3jRVxnRqtkch5qbd6tFwkKU2/EUv+xksvPdOlcqTDw1kUKtbod7IRA1sO8dk9cI3pAXvC2jaTKtfNTBC4w7/Kr/Cq1SQ9NqTVBNwWlx32MMjAoGBAP90s2zFCiNj5DZ5CxSG6AQVoGkAsLM7Q/z5KQMx/nQuPsQKmLTZv08HjXapylZrUu0mT7t5KfXg3e57Q0B4H0mMAaYG8bZNnhvzV65vM2nXL9+A7gFhx/NbJ65unQz50wtU7JK8XZEyvFPKVcWxkOQJkQdiVJgEQU4YCRR1szePAoGBALhJmJSvN4nhDWnLiQI64T+/ySoC4BBP08D9X60uOxY8HTcpHmvUHcyBW6rAHPebw+NnGkWafd1AiSqEth79J4GuaCl7g5pJMAmGcqTsuP9LQpx3fxzV3Oai+9DgNTKLoLH6o0Do2pvefcRbZm7Jrbx5ryyCePpprUbrlCSphPejAoGBAIeKjy0WOzPd65evj957Wh3Yr70m/ZqLxp4yQb2NSDqy0uDH0pCavHQdSMT+f/pshZqI6mNJfacVggvoYR2S3t7yJ2nFY3jcJBkme451OC1fXOpVCXO4QxRveFWIIVJiN8VacQ/GXEsPRXeb8virJ3qnTMlDNilWkKP0AtVVQhsnAoGBAKDxU4StSLa9/BroN0qkMqYPH+GMg2YyGw+j3vgeXuiY9WUokC8QBkDBy6OKpwNmrauUQBzTnRJcvDxiBPt9HZQ2o6YlAgK2M/t/ZmyDrZ5JgoJhVPmNItswJBMC/ACz3TMUlAr4wANzBAS6aNVfj7ZlOuA41rQKfl7zI6gJ5+1b"),
            bytesRead: out int _);

        var id = Guid.NewGuid().ToString();

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

        string pin = Guid.NewGuid().ToString();

        return (token, id, pin);

    }
}