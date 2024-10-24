package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupUserRoutes(rg *gin.RouterGroup) {
	rg.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "All users"})
	})

	rg.GET("/:id", func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{"user": id})
	})

	rg.POST("/", func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{"message": "User created"})
	})
}
