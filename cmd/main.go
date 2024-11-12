package main

import (
	"fmt"
	"learning-center-schedule-management/pkg/config"
	database "learning-center-schedule-management/pkg/database/postgre"
	"learning-center-schedule-management/pkg/handlers"
	"learning-center-schedule-management/pkg/middlewares"
	repo "learning-center-schedule-management/pkg/repositories"
	"learning-center-schedule-management/pkg/routes"
	"learning-center-schedule-management/pkg/utils"
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

		config.InitChannel()
	}
}

func main() {
	fmt.Println("LEARNING CENTER SCHEDULE MANAGEMENT!!!")

	gin.SetMode(gin.ReleaseMode)
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

	go func() {
		for {
			c := <- config.DebugChannel

			utils.ResponseAPI(c.Ctx, config.HTTP_Status_OK, c.Data, "Debug.")
			config.DoneChannel <- true
		}
	}()

	router.Run(":8080")
}
