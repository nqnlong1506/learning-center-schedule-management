package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"learning-center-schedule-management/pkg/config"

	"github.com/gin-gonic/gin"
)

func ResponseAPI(c *gin.Context, code config.HTTP_STATUS_CODE, data any, message string) {
	response := gin.H{
		"status":  config.HTTP_STATUS_code[code],
		"data":    data,
		"message": message,
	}

	c.JSON(int(config.HTTP_STATUS_code[code]), response)
}

func RequestBodyReader(body io.ReadCloser, readMasks ...string) (map[string]any, error) {
	var mapBody gin.H

	b, err := ioutil.ReadAll(body)
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal([]byte(b), &mapBody)
	if err != nil {
		return nil, err
	}

	for _, key := range readMasks {
		if _, ok := mapBody[key]; !ok && key != "" {
			return nil, fmt.Errorf("%s required.", key)
		}
	}

	return mapBody, nil
}

func FormDataReader(c *gin.Context, readMasks ...string) (map[string]string, error) {
	reader := map[string]string{}
	for _, key := range readMasks {
		if key != "" {
			value := c.PostForm(key)
			if value == "" {
				return nil, fmt.Errorf("%s required.", key)
			}
			reader[key] = value
		}
	}

	return reader, nil
}
