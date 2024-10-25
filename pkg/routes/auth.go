package routes

import (
	"learning-center-schedule-management/pkg/handlers"

	"github.com/gin-gonic/gin"
)

func SetupAuthRoutes(rg *gin.RouterGroup) {
	rg.POST("/login", handlers.LoginBodyRequest)

	rg.POST("/register", handlers.Register)
}
