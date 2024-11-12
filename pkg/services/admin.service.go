package services

import (
	"learning-center-schedule-management/pkg/models"
	userrepo "learning-center-schedule-management/pkg/repositories/user"
	"learning-center-schedule-management/pkg/utils"

	"github.com/gin-gonic/gin"
)

func GetListUsers(c *gin.Context) ([]*models.User, error) {
	results, err := userrepo.GetListUsers()
	return nil, utils.Debug(c, results)

	return results, err
}

func GetUsers(c *gin.Context) error {
	userrepo.GetUsers()
	
	return utils.Debug(c, gin.H{"class": "golang", "school": "hanbiro"})
}

func GetUser(username string) (*models.User, error) {
	return userrepo.GetUserByUsername(username)
}
