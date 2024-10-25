package repo

import (
	database "learning-center-schedule-management/pkg/database/postgre"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username     string `gorm:"username;not null;unique"`
	Password     string `gorm:"password;not null"`
	Name         string `gorm:"username;not null"`
	DayOfBirth   int64  `gorm:"day_of_birth"`
	MonthOfBirth int64  `gorm:"mointh_of_birth"`
	YearOfBirth  int64  `gorm:"year_of_birth"`
	Email        string `gorm:"email;not null"`
	Phone        string `gorm:"phone;not null"`
	Type         int32  `gorm:"_type;not null"`
}

func InitializeUser() {
	database.DB.AutoMigrate(&User{})
}
