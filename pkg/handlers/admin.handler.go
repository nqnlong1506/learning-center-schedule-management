package handlers

import (
	"learning-center-schedule-management/pkg/config"
	"learning-center-schedule-management/pkg/services"
	"learning-center-schedule-management/pkg/utils"

	"github.com/gin-gonic/gin"
)

func AccountInfo(c *gin.Context) {
	readMasks := []string{"username"}
	body, err := utils.RequestBodyReader(c.Request.Body, readMasks...)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_BAD_REQUEST, nil, err.Error())
		return
	}

	users, err := services.GetUser(body["username"].(string))
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_INTERNAL_SERVER_ERROR, nil, err.Error())
		return
	}

	utils.ResponseAPI(c, config.HTTP_Status_OK, users, "list users.")
	return
}

func GetListUsers(c *gin.Context) {
	users, err := services.GetListUsers(c)
	if err != nil {
		utils.ResponseErrorAPI(c, err)
		return
	}

	utils.ResponseAPI(c, config.HTTP_Status_OK, users, "list users.")
	return
}

func GetUsers(c *gin.Context)  {
	err := services.GetUsers(c)
	if err != nil {
		utils.ResponseErrorAPI(c, err)
		return
	}
	// if err != nil {
	// 	utils.ResponseAPI(c, config.HTTP_Status_INTERNAL_SERVER_ERROR, nil, err.Error())
	// 	return
	// }

	// test := config.DebugStruct{
	// 	Ctx: c,
	// 	Data: gin.H{
	// 		"name": "long",
	// 		"age": 21,
	// 	},
	// }

	// config.DebugChannel <- test
	// <- config.DoneChannel

	// utils.ResponseAPI(c, config.HTTP_Status_OK, "", "list users.")
	// utils.ResponseAPI(c, config.HTTP_Status_OK, "", "list users ngoclong.")
	return
}
