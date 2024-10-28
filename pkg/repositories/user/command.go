package repo

import "learning-center-schedule-management/pkg/models"

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
