package repo

import (
	"encoding/json"
	"fmt"
	"learning-center-schedule-management/pkg/config"
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/models"
	"log"

	"gorm.io/gorm"
)

var (
	readMasks = []string{"id", "created_at", "updated_at", "username", "name", "day_of_birth", "month_of_birth", "year_of_birth", "email", "phone", "type"}
)

func GetUserPassByUsername(username string) (*User, error) {
	user := &User{}
	if err := database.DB.Select([]string{"username", "type", "password"}).Where("username = ?", username).First(&user).Error; err != nil {
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
	t := config.Teacher{
		Subject:   "chinese",
		Level:     "hsk5",
		Address:   "tan phu",
		Emerphone: "0988988988",
		Salary:    250000,
	}

	rs, err := json.Marshal(&t)
	if err != nil {
		return nil, err
	}
	log.Println(string(rs))

	stringTest := `{"subject": "english", "level": "ielts 8.0", "address": "Wonderland", "emerphone": "0111222333", "salary": 190000}`

	var person config.Teacher

	// Convert (unmarshal) JSON string to struct
	err = json.Unmarshal([]byte(stringTest), &person)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	return nil, nil
}

func GetListUsers() ([]*models.User, error) {
	var users []*User
	if err := database.DB.Select(readMasks).Find(&users).Error; err != nil {
		return nil, err
	}

	// TODO: get last query
	long := database.DB.ToSQL(func(tx *gorm.DB) *gorm.DB {
		return tx.Select(readMasks).Find(&users)
	})

	log.Println(long)

	var usersModel []*models.User
	for _, u := range users {
		usersModel = append(usersModel, u.toModel())
	}

	return usersModel, nil
}
