package handlers

import (
	"learning-center-schedule-management/pkg/config"
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

	utils.ResponseAPI(c, config.HTTP_Status_OK, body, "Login sucessfully.")
	return
}

func LoginFormData(c *gin.Context) {
	readMasks := []string{"username", "password"}
	body, err := utils.FormDataReader(c, readMasks...)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_BAD_REQUEST, nil, err.Error())
		return
	}

	utils.ResponseAPI(c, config.HTTP_Status_OK, body, "Login sucessfully.")
	return
}

func Register(c *gin.Context) {
	readMasks := []string{"username", "password", "name", "birth", "email", "phone"}
	body, err := utils.RequestBodyReader(c.Request.Body, readMasks...)
	if err != nil {
		utils.ResponseAPI(c, config.HTTP_Status_BAD_REQUEST, nil, err.Error())
		return
	}

	utils.ResponseAPI(c, config.HTTP_Status_OK, body, "Registers sucessfully.")
}
