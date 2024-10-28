package services

import (
	"fmt"
	"learning-center-schedule-management/pkg/models"
	repo "learning-center-schedule-management/pkg/repositories"
	"learning-center-schedule-management/pkg/utils"
	"log"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Login(loginModel *models.LoginModel) (any, error) {
	// get user by username
	user, err := repo.GetUserByUsername(loginModel.Username, true)
	if err != nil {
		return nil, fmt.Errorf("username does not existed.")
	}

	// compare hash password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginModel.Password))
	if err != nil {
		return nil, err
	}

	// create jwt token
	expiredTime := utils.GetJWTExpireTime()
	claims := jwt.MapClaims{
		"username":    user.Username,
		"expiredTime": time.Now().Add(expiredTime).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	secretKey := os.Getenv("JWT_SECRET_KEY")
	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return nil, err
	}

	return tokenString, nil
}

func Register(registerModel *models.RegisterModel) (any, error) {
	// hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerModel.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user, err := repo.GetUserByUsername(registerModel.Username, false)
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
