package config

type USER_TYPE string
type VERIFICATION_TYPE string

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

	MAPPING_VERIFICATION_TYPE = map[int32]VERIFICATION_TYPE{
		1: VERIFICATION_TYPE_CREATE_USER,
		2: VERIFICATION_TYPE_CREATE_TEACHER,
		3: VERIFICATION_TYPE_CREATE_STUDENT,
	}
	VERIFICATION_TYPE_CREATE_USER    VERIFICATION_TYPE = "CREATE_USER"
	VERIFICATION_TYPE_CREATE_TEACHER VERIFICATION_TYPE = "CREATE_TEACHER"
	VERIFICATION_TYPE_CREATE_STUDENT VERIFICATION_TYPE = "CREATE_STUDENT"
)

type Teacher struct {
	Subject   string `json:"subject"`
	Level     string `json:"level"`
	Address   string `json:"address"`
	Emerphone string `json:"emerphone"`
	Salary    int    `json:"salary"`
}

type Student struct {
	Emerphone string `json:"emerphone"`
	Dayofweek int    `json:"dayofweek"`
}
