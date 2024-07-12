package api

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"

	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/service"
	"github.com/gin-gonic/gin"
)

func AddPet(c *gin.Context) {
	var pet datatypes.Pet
	err := c.ShouldBindJSON(&pet)
	if err != nil {
		fmt.Println("invalid request body")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	err = service.AddPet(pet)
	if err != nil {
		fmt.Println("error saving pet info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, "pet info saved successfully")
}

func GetPetDetails(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		fmt.Println("invalid request body, pet id not provided")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	pet, err := service.GetPet(id)
	if err != nil && errors.Is(err, sql.ErrNoRows) {
		fmt.Println("record not found", err)
		c.JSON(http.StatusBadRequest, "record not found")
		return
	}
	if err != nil {
		fmt.Println("error fetching pet info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, pet)
}
