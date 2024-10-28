package routes

import (
	"learning-center-schedule-management/pkg/handlers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupAuthRoutes(rg *gin.RouterGroup) {
	rg.POST("/login", handlers.LoginBodyRequest)

	rg.POST("/register", handlers.Register)
}

func SetupAdminRoutes(rg *gin.RouterGroup) {
	rg.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Administrator"})
	})
}

func SetupAPIRoutes(rg *gin.RouterGroup) {
	// user
	user := rg.Group("/user")
	SetupUserRoutes(user)
}
