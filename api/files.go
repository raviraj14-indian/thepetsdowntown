package api

import (
	"fmt"
	"net/http"

	"github.com/dhruv0711/pet_staycation/service"
	"github.com/gin-gonic/gin"
)

func GetOwnerIdentity(c *gin.Context) {
	user := c.Param("id")
	if user == "" {
		fmt.Println("user detail not found")
		c.JSON(http.StatusBadRequest, "something went wrong")
		return
	}

	data, err := service.GetFile(user, "owner")
	if err != nil {
		fmt.Println("error saving pet owner info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, data)
}

func GetPetVaccination(c *gin.Context) {
	user := c.Param("id")
	if user == "" {
		fmt.Println("pet id not found")
		c.JSON(http.StatusBadRequest, "pet id not found")
		return
	}

	data, err := service.GetFile(user, "pet")
	if err != nil {
		fmt.Println("error saving pet vaccination", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, data)
}
