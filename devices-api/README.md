# Devices api

Rest api for smart-home devices.

## Startup

Execute commands `dotnet run` or `dotnet watch` to run devices api.

## Endpoints

### Devices (HttpGet)

Gets list of devices registered for user.
Access token must be provided (not done yet).

Status codes:

* 200 - success - device detail obtained
* 401 - unauthorized - you are not authenticated, access token not provided, is expired or invalid
* 500 - internal server error - unhandled exception occurred

### Devices/detail (HttpGet)

Gets device detail by id.
Access token must be provided (not done yet).

Status codes:

* 200 - success - device detail obtained
* 404 - not found - device with given id does not exist
* 401 - unauthorized - you are not authenticated, access token not provided, is expired or invalid
* 403 - forbidden - you have no access to this device information
* 500 - internal server error - unhandled exception occurred
