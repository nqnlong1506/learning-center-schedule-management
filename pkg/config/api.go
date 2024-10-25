package config

type HTTP_STATUS_CODE string

var (
	HTTP_STATUS_code = map[HTTP_STATUS_CODE]int32{
		"OK":                    200,
		"BAD_REQUEST":           400,
		"FORBIDDEN":             403,
		"NOT_FOUND":             404,
		"INTERNAL_SERVER_ERROR": 500,
	}
	HTTP_Status_OK                    HTTP_STATUS_CODE = "OK"
	HTTP_Status_BAD_REQUEST           HTTP_STATUS_CODE = "BAD_REQUEST"
	HTTP_Status_FORBIDDEN             HTTP_STATUS_CODE = "FORBIDDEN"
	HTTP_Status_NOT_FOUND             HTTP_STATUS_CODE = "NOT_FOUND"
	HTTP_Status_INTERNAL_SERVER_ERROR HTTP_STATUS_CODE = "INTERNAL_SERVER_ERROR"
)
