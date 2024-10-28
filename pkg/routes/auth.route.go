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

func SetupUserRoutes(rg *gin.RouterGroup) {
	rg.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "All users"})
	})

	rg.GET("/:id/view", func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{"user": id})
	})

	rg.POST("/", func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{"message": "User created"})
	})
}
