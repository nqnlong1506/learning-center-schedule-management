package services

import (
	models "learning-center-schedule-management/pkg/models/auth"
	"log"

	"github.com/gin-gonic/gin"
)

func Login(loginModel *models.LoginModel) (any, error) {
	log.Println(loginModel.Username, loginModel.Password)
	return nil, nil
}

func Register(registerModel *models.RegisterModel) (any, error) {
	log.Println(registerModel.Email, registerModel.Birth)
	return gin.H{
		"day":   registerModel.GetDayOfBirth(),
		"month": registerModel.GetMonthOfBirth(),
		"year":  registerModel.GetYearOfBirth(),
	}, nil
}
