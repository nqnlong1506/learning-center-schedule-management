package services

import (
	"learning-center-schedule-management/pkg/models"
	userrepo "learning-center-schedule-management/pkg/repositories/user"
)

func GetListUsers() ([]*models.User, error) {
	return userrepo.GetListUsers()
}

func GetUser(username string) (*models.User, error) {
	return userrepo.GetUserByUsername(username)
}
