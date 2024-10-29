package repo

import (
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/models"
	"time"
)

type Verification struct {
	ID          uint      `gorm:"primarykey"`
	Token       string    `gorm:"token;not null"`
	OTP         string    `gorm:"otp;not null"`
	Type        int32     `gorm:"_type;not null"`
	ReferenceID uint      `gorm:"ref_id;not null"`
	ExpiredTime time.Time `gorm:"expired_time;not null"`
	CreatedAt   time.Time
}

func (v *Verification) insert() error {
	insert := database.DB.Create(v)
	if insert.Error != nil {
		return insert.Error
	}

	return nil
}

func (v *Verification) update() error {
	insert := database.DB.Create(v)
	if insert.Error != nil {
		return insert.Error
	}

	return nil
}

// adapter with model
func (u *Verification) toModel() *models.User {
	return &models.User{}
}
