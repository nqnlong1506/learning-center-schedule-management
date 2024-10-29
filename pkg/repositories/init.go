package repo

import (
	database "learning-center-schedule-management/pkg/database/postgre"
	unverifieduser "learning-center-schedule-management/pkg/repositories/unverifieduser"
	user "learning-center-schedule-management/pkg/repositories/user"
	verification "learning-center-schedule-management/pkg/repositories/verification"
)

func InitializeModels() {
	database.DB.AutoMigrate(&user.User{})
	database.DB.AutoMigrate(&unverifieduser.UnverifiedUser{})
	database.DB.AutoMigrate(&verification.Verification{})
}
