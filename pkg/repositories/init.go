package repo

import (
	database "learning-center-schedule-management/pkg/database/postgre"
	user "learning-center-schedule-management/pkg/repositories/user"
)

func InitializeModels() {
	database.DB.AutoMigrate(&user.User{})
}
