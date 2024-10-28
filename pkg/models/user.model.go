package models

import (
	"learning-center-schedule-management/pkg/config"
	"time"
)

type User struct {
	Username  string           `json:"username"`
	Name      string           `json:"name"`
	Birth     string           `json:"birth"`
	Email     string           `json:"email"`
	Phone     string           `json:"phone"`
	Type      config.USER_TYPE `json:"type"`
	CreatedAt time.Time        `json:"createdAt"`
	UpdatedAt time.Time        `json:"updatedAt,omitempty"`
}
