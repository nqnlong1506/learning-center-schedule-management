package utils

import (
	"learning-center-schedule-management/pkg/config"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ResponseAPI(c *gin.Context, code string, data any, message string) {
	response := gin.H{
		"status":  config.HTTP_STATUS_code[code],
		"data":    data,
		"message": message,
	}

	c.JSON(http.StatusOK, response)
}
