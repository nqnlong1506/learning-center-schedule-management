package handlers

import (
	"github.com/gin-gonic/gin"

	"learning-center-schedule-management/pkg/config"
	"learning-center-schedule-management/pkg/utils"
)

func Ping(c *gin.Context) {
	utils.ResponseAPI(c, config.HTTP_Status_OK, nil, "ping successfully.")
}

func Info(c *gin.Context) {
	utils.ResponseAPI(c, config.HTTP_Status_OK, gin.H{
		"name": "system",
	}, "learning center schedule management.")
}
