package repo

import (
	"fmt"
	"learning-center-schedule-management/pkg/config"
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/models"
	"time"
)

type UnverifiedUser struct {
	ID           uint   `gorm:"primarykey"`
	Username     string `gorm:"username;not null;unique"`
	Password     string `gorm:"password;not null"`
	Name         string `gorm:"name;not null"`
	DayOfBirth   int64  `gorm:"day_of_birth"`
	MonthOfBirth int64  `gorm:"month_of_birth"`
	YearOfBirth  int64  `gorm:"year_of_birth"`
	Email        string `gorm:"email;not null"`
	Phone        string `gorm:"phone;not null"`
	Type         int32  `gorm:"_type;not null"`
	Additional   string `gorm:"additional"`
	IsVerified   bool   `gorm:"is_verified; default:false"`
	CreatedAt    time.Time
}

func (u *UnverifiedUser) insert() error {
	insert := database.DB.Create(u)
	if insert.Error != nil {
		return insert.Error
	}

	return nil
}

// adapter with model
func (u *UnverifiedUser) toModel() *models.User {
	return &models.User{
		Username:  u.Username,
		Name:      u.Name,
		Birth:     fmt.Sprintf("%d-%d-%d", u.YearOfBirth, u.MonthOfBirth, u.DayOfBirth),
		Email:     u.Email,
		Phone:     u.Phone,
		Type:      config.MAPPING_USER_TYPE[u.Type],
		CreatedAt: u.CreatedAt,
	}
}
