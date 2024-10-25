package main

import (
	"fmt"
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/handlers"
	"learning-center-schedule-management/pkg/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("LEARNING CENTER SCHEDULE MANAGEMENT!!!")

	// Initializing
	{
		database.InitPostgreSQL()
	}

	router := gin.Default()
	router.GET("/", handlers.Info)
	router.GET("/ping", handlers.Ping)

	// Create a group for API routes
	api := router.Group("/api")
	{
		userGroup := api.Group("/users")
		routes.SetupUserRoutes(userGroup)
	}

	// authentication
	auth := router.Group("/auth")
	{
		routes.SetupAuthRoutes(auth)
	}

	// admin routes
	admin := router.Group("/admin")
	{
		routes.SetupAdminRoutes(admin)
	}

	router.Run(":8080")
}
