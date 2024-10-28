package services

import (
	"fmt"
	"learning-center-schedule-management/pkg/models"
	repo "learning-center-schedule-management/pkg/repositories"
	"log"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Login(loginModel *models.LoginModel) (any, error) {
	log.Println(loginModel.Username, loginModel.Password)
	return nil, nil
}

func Register(registerModel *models.RegisterModel) (any, error) {
	// hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerModel.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user, err := repo.GetUserByUsername(registerModel.Username)
	if err == nil {
		log.Println(user)
		return nil, fmt.Errorf("username existed.")
	}

	userID, err := repo.CreateUser(registerModel, hashedPassword)
	if err != nil {
		return nil, err
	}

	return gin.H{
		"userID": userID,
	}, nil
}
