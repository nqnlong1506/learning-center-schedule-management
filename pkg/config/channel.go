package config

import "github.com/gin-gonic/gin"

type DebugStruct struct {
	Ctx *gin.Context	
	Data any
}

var DebugChannel chan DebugStruct
var DoneChannel chan bool

func InitChannel() {
	DebugChannel = make(chan DebugStruct)
	DoneChannel = make(chan bool)
}