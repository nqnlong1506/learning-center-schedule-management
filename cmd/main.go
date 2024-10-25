package main

import (
	"fmt"
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/handlers"
	repo "learning-center-schedule-management/pkg/repositories"
	"learning-center-schedule-management/pkg/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	{
		database.InitPostgreSQL()
		repo.InitializeModels()
	}
}

func main() {
	fmt.Println("LEARNING CENTER SCHEDULE MANAGEMENT!!!")

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
