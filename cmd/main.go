package main

import (
	"fmt"
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/handlers"
	"learning-center-schedule-management/pkg/middlewares"
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
	// router.GET("/verify", middlewares.VerifyJWTToken)

	// authentication
	auth := router.Group("/auth")
	{
		routes.SetupAuthRoutes(auth)
	}

	// routes
	{
		admin := router.Group("/admin")
		admin.Use(middlewares.VerifyAdminToken)
		routes.SetupAdminRoutes(admin)

		api := router.Group("/api")
		api.Use(middlewares.VerifyUserToken)
		routes.SetupAPIRoutes(api)
	}

	router.Run(":8080")
}
