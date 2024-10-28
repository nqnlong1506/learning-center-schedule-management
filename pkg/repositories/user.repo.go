package repo

import (
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/models"

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

func GetUserByUsername(username string, isLogin bool) (*User, error) {
	user := &User{}
	if err := database.DB.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}

	if !isLogin {
		user.Password = "*****"
	}
	return user, nil
}

func CreateUser(registerModel *models.RegisterModel, hashedPassword []byte) (any, error) {
	user := &User{
		Username:     registerModel.Username,
		Password:     string(hashedPassword),
		Name:         registerModel.Name,
		DayOfBirth:   int64(registerModel.GetDayOfBirth()),
		MonthOfBirth: int64(registerModel.GetMonthOfBirth()),
		YearOfBirth:  int64(registerModel.GetYearOfBirth()),
		Email:        registerModel.Email,
		Phone:        registerModel.Phone,
		Type:         registerModel.Type,
	}

	err := user.insert()
	if err != nil {
		return nil, err
	}

	return user.ID, nil
}

func (u *User) insert() error {
	insert := database.DB.Create(u)
	if insert.Error != nil {
		return insert.Error
	}

	return nil
}

func (u *User) update() error {
	insert := database.DB.Create(u)
	if insert.Error != nil {
		return insert.Error
	}

	return nil
}
