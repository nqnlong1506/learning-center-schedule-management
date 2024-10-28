package repo

import (
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/models"
)

var (
	readMasks = []string{"id", "created_at", "updated_at", "username", "name", "day_of_birth", "month_of_birth", "year_of_birth", "email", "phone", "type"}
)

func GetUserPassByUsername(username string) (*User, error) {
	user := &User{}
	if err := database.DB.Select([]string{"username", "password"}).Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func GetUserByUsername(username string) (*models.User, error) {
	user := &User{}
	if err := database.DB.Select(readMasks).Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}

	return user.toModel(), nil
}

func GetUsers() ([]*User, error) {
	return nil, nil
}

func GetListUsers() ([]*models.User, error) {
	var users []*User
	if err := database.DB.Select(readMasks).Find(&users).Error; err != nil {
		return nil, err
	}

	var usersModel []*models.User
	for _, u := range users {
		usersModel = append(usersModel, u.toModel())
	}

	return usersModel, nil
}
