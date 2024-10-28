package config

type USER_TYPE string

var (
	MAPPING_USER_TYPE = map[int32]USER_TYPE{
		1:  USER_TYPE_Admin,
		2:  USER_TYPE_User,
		5:  USER_TYPE_Teacher,
		10: USER_TYPE_Student,
	}
	USER_TYPE_Admin   USER_TYPE = "ADMIN"
	USER_TYPE_User    USER_TYPE = "USER"
	USER_TYPE_Teacher USER_TYPE = "TEACHER"
	USER_TYPE_Student USER_TYPE = "STUDENT"
)
