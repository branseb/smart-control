using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class HttpResponseExceptionFilterAttribute : ExceptionFilterAttribute
{
	public override void OnException(ExceptionContext context)
	{
		var exception = context.Exception as HttpResponseException;

		if (exception != null)
		{
			var body = new
			{
				StatusCode = exception.StatusCode,
				Message = exception.Message
			};

			context.Result = new JsonResult(body) { StatusCode = exception.StatusCode };
		}
	}
}