package models

import (
	"github.com/gin-gonic/gin"
)

type LoginModel struct {
	Username string
	Password string
}

func GetLoginModel(login gin.H) *LoginModel {
	return &LoginModel{
		Username: login["username"].(string),
		Password: login["password"].(string),
	}
}

type birth struct {
	day   float64
	month float64
	year  float64
}

type RegisterModel struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Birth    birth  `json:"birth"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Type     int32  `json:"type"`
}

func GetRegisterModel(register gin.H) *RegisterModel {
	long := register["birth"].(map[string]interface{})
	birthModel := birth{
		day:   long["day"].(float64),
		month: long["month"].(float64),
		year:  long["year"].(float64),
	}

	return &RegisterModel{
		Username: register["username"].(string),
		Password: register["password"].(string),
		Name:     register["name"].(string),
		Birth:    birthModel,
		Email:    register["email"].(string),
		Phone:    register["phone"].(string),
		Type:     register["type"].(int32),
	}
}

func (rm *RegisterModel) GetDayOfBirth() float64 {
	return rm.Birth.day
}
func (rm *RegisterModel) GetMonthOfBirth() float64 {
	return rm.Birth.month
}
func (rm *RegisterModel) GetYearOfBirth() float64 {
	return rm.Birth.year
}
