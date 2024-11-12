package utils

import (
	"fmt"
	"learning-center-schedule-management/pkg/config"

	"github.com/gin-gonic/gin"
)

func Debug(c *gin.Context, data any) error {
	test := config.DebugStruct{
		Ctx: c,
		Data: data,
	}

	config.DebugChannel <- test
	<- config.DoneChannel
	
	return fmt.Errorf("Debug")
}