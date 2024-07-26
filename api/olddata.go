package api

import (
	"fmt"
	"net/http"

	"github.com/dhruv0711/pet_staycation/service"
	"github.com/gin-gonic/gin"
)

func GetOldData(c *gin.Context) {
	billed, err := service.ListEntry()
	if err != nil {
		fmt.Println("error saving billing info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, billed)
}
