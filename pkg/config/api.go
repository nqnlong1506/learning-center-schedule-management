package config

var (
	HTTP_STATUS_code = map[string]int32{
		"OK":                    200,
		"FORBIDDEN":             403,
		"NOT_FOUND":             404,
		"INTERNAL_SERVER_ERROR": 500,
	}
	HTTP_Status_OK                    = "OK"
	HTTP_Status_FORBIDDEN             = "FORBIDDEN"
	HTTP_Status_NOT_FOUND             = "NOT_FOUND"
	HTTP_Status_INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
)
