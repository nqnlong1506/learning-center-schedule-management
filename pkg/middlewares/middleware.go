package middlewares

import (
	"learning-center-schedule-management/pkg/config"
	userrepo "learning-center-schedule-management/pkg/repositories/user"
	"learning-center-schedule-management/pkg/utils"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func VerifyJWTToken(c *gin.Context) {
	// get token
	authorization := c.GetHeader("Authorization")
	if authorization == "" {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "token needed.")
		c.AbortWithStatus(401)
		return
	}
	token := strings.Replace(authorization, "Bearer ", "", 1)

	// parse token
	signingKey := []byte(os.Getenv("JWT_SECRET_KEY"))
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, err.Error())
		c.AbortWithStatus(401)
		return
	}

	claims := parsedToken.Claims.(jwt.MapClaims)

	// compare & check expired time
	now := time.Now().Unix()
	exp := claims["expiredTime"].(float64)
	if now > int64(exp) {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "token is expired.")
		c.AbortWithStatus(401)
		return
	}

	username := claims["username"].(string)
	_, err = userrepo.GetUserByUsername(username)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "verified failed.")
		c.AbortWithStatus(401)
		return
	}

	// verification done
	c.Next()
}

func VerifyAdminToken(c *gin.Context) {
	// get token
	authorization := c.GetHeader("Authorization")
	if authorization == "" {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "token needed.")
		c.AbortWithStatus(401)
		return
	}
	token := strings.Replace(authorization, "Bearer ", "", 1)

	// parse token
	signingKey := []byte(os.Getenv("JWT_SECRET_KEY"))
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, err.Error())
		c.AbortWithStatus(401)
		return
	}

	claims := parsedToken.Claims.(jwt.MapClaims)

	// compare & check expired time
	now := time.Now().Unix()
	exp := claims["expiredTime"].(float64)
	if now > int64(exp) {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "token is expired.")
		c.AbortWithStatus(401)
		return
	}

	// role verify
	role := claims["role"].(float64)
	if config.MAPPING_USER_TYPE[int32(role)] != config.USER_TYPE_Admin {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "you are not admin.")
		c.AbortWithStatus(401)
		return
	}

	username := claims["username"].(string)
	userModel, err := userrepo.GetUserByUsername(username)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "verified failed.")
		c.AbortWithStatus(401)
		return
	}

	if userModel.Type != config.USER_TYPE_Admin {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "you are not admin.")
		c.AbortWithStatus(401)
		return
	}

	// verification done
	c.Next()
}

func VerifyUserToken(c *gin.Context) {
	// get token
	authorization := c.GetHeader("Authorization")
	if authorization == "" {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "token needed.")
		c.AbortWithStatus(401)
		return
	}
	token := strings.Replace(authorization, "Bearer ", "", 1)

	// parse token
	signingKey := []byte(os.Getenv("JWT_SECRET_KEY"))
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, err.Error())
		c.AbortWithStatus(401)
		return
	}

	claims := parsedToken.Claims.(jwt.MapClaims)

	// compare & check expired time
	now := time.Now().Unix()
	exp := claims["expiredTime"].(float64)
	if now > int64(exp) {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "token is expired.")
		c.AbortWithStatus(401)
		return
	}

	// role verify
	role := claims["role"].(float64)
	if config.MAPPING_USER_TYPE[int32(role)] != config.USER_TYPE_User {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "you are not user.")
		c.AbortWithStatus(401)
		return
	}

	username := claims["username"].(string)
	userModel, err := userrepo.GetUserByUsername(username)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "verified failed.")
		c.AbortWithStatus(401)
		return
	}

	if userModel.Type != config.USER_TYPE_User {
		utils.ResponseAPI(c, config.HTTP_Status_UNAUTHORIZED, nil, "you are not user.")
		c.AbortWithStatus(401)
		return
	}

	// verification done
	c.Next()
}
