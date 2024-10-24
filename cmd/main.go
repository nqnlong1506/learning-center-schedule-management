package main

import (
	"fmt"
	"learning-center-schedule-management/pkg/config"
	"learning-center-schedule-management/pkg/routes"
	"learning-center-schedule-management/pkg/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("learning center schedule management")

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		utils.ResponseAPI(c, config.HTTP_Status_OK, nil, "welcome to learning center schedule management.")
	})

	router.GET("/ping", func(c *gin.Context) {
		utils.ResponseAPI(c, config.HTTP_Status_OK, "pong", "ping successfully.")
	})

	// Create a group for API routes
	api := router.Group("/api")
	{
		userGroup := api.Group("/users")
		routes.SetupUserRoutes(userGroup)

		adminGroup := api.Group("/admin")
		routes.SetupAdminRoutes(adminGroup)
	}

	router.Run(":8080")
}
