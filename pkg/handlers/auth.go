package handlers

import (
	"learning-center-schedule-management/pkg/config"
	models "learning-center-schedule-management/pkg/models/auth"
	"learning-center-schedule-management/pkg/services"
	"learning-center-schedule-management/pkg/utils"

	"github.com/gin-gonic/gin"
)

func LoginBodyRequest(c *gin.Context) {
	readMasks := []string{"username", "password"}
	body, err := utils.RequestBodyReader(c.Request.Body, readMasks...)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_BAD_REQUEST, nil, err.Error())
		return
	}

	loginModel := models.GetLoginModel(body)
	services.Login(loginModel)

	utils.ResponseAPI(c, config.HTTP_Status_OK, body, "login sucessfully.")
	return
}

func LoginFormData(c *gin.Context) {
	readMasks := []string{"username", "password"}
	body, err := utils.FormDataReader(c, readMasks...)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_BAD_REQUEST, nil, err.Error())
		return
	}

	utils.ResponseAPI(c, config.HTTP_Status_OK, body, "login sucessfully.")
	return
}

func Register(c *gin.Context) {
	readMasks := []string{"username", "password", "name", "birth", "email", "phone", "type"}
	body, err := utils.RequestBodyReader(c.Request.Body, readMasks...)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_BAD_REQUEST, nil, err.Error())
		return
	}

	_type, ok := body["type"].(float64)
	if !ok {
		utils.ResponseAPI(c, config.HTTP_Status_BAD_REQUEST, nil, "invalid user type.")
		return
	}

	if _, ok = config.MAPPING_USER_TYPE[int32(_type)]; !ok {
		utils.ResponseAPI(c, config.HTTP_Status_BAD_REQUEST, nil, "this user type dose not exist.")
		return
	}
	body["type"] = int32(_type)

	registerModel := models.GetRegisterModel(body)
	result, err := services.Register(registerModel)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_OK, nil, err.Error())
	}

	utils.ResponseAPI(c, config.HTTP_Status_OK, result, "register sucessfully.")
	return
}
