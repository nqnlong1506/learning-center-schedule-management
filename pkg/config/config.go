package config

type USER_TYPE string

var (
	MAPPING_USER_TYPE = map[int32]USER_TYPE{
		1: USER_TYPE_Admin,
		2: USER_TYPE_User,
	}
	USER_TYPE_User  USER_TYPE = "USER"
	USER_TYPE_Admin USER_TYPE = "ADMIN"
)
