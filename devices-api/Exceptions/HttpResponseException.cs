public class HttpResponseException : Exception
{
	public readonly int StatusCode;
	public HttpResponseException(int statusCode, string message) : base(message)
	{
		StatusCode = statusCode;
	}
}