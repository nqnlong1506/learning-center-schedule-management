package utils

import (
	"os"
	"strconv"
	"time"
)

func GetJWTExpireTime() time.Duration {
	unit := os.Getenv("JWT_UNIT_TIME")
	quantity := os.Getenv("JWT_TIME_QUANTITY")

	number, err := strconv.Atoi(quantity)
	if err != nil {
		return time.Second * 60
	}

	switch unit {
	case "SECOND":
		return time.Second * time.Duration(number)
	case "MINUTE":
		return time.Minute * time.Duration(number)
	case "HOUR":
		return time.Hour * time.Duration(number)
	default:
		return time.Second * 60
	}
}
