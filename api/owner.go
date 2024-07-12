package api

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"

	"github.com/dhruv0711/pet_staycation/constants"
	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/service"
	"github.com/gin-gonic/gin"
)

func CreateOwner(c *gin.Context) {
	owner := datatypes.Owner{
		Phone:          c.PostForm("phone"),
		Name:           c.PostForm("name"),
		AlternatePhone: c.PostForm("alternate_phone"),
		AlternateName:  c.PostForm("alternate_name"),
		Address:        c.PostForm("address"),
	}

	identity, err := c.FormFile("identity")
	if err != nil {
		fmt.Println("error fetching identity proof", err)
		c.JSON(http.StatusBadRequest, "something went wrong")
		return
	}

	// owner.Identity = identity
	id, err := service.AddOwner(owner)
	if err == constants.ErrorOwnerAlreadyExists {
		fmt.Println("owner already exists", err)
		c.JSON(http.StatusBadRequest, "owner already exists")
		return
	}
	if err != nil {
		fmt.Println("error saving pet owner info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	err = service.AddFile(id, "owner", identity, "")
	if err != nil {
		fmt.Println("error uploading file", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, "pet owner info saved successfully")
}

func GetOwner(c *gin.Context) {
	phone := c.Param("phone")
	if phone == "" {
		fmt.Println("invalid request body, phone number not provided")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	owner, err := service.GetOwner(phone)
	if err != nil && errors.Is(err, sql.ErrNoRows) {
		fmt.Println("pet owner doesn't exists", err)
		c.JSON(http.StatusNotFound, "pet owner doesn't exists")
		return
	}
	if err != nil {
		fmt.Println("error getting pet owner info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, owner)
}

func GetOwnerPets(c *gin.Context) {
	phone := c.Param("phone")
	if phone == "" {
		fmt.Println("invalid request body, phone number not provided")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	owner, err := service.GetOwner(phone)
	if err != nil && errors.Is(err, sql.ErrNoRows) {
		fmt.Println("pet owner doesn't exists", err)
		c.JSON(http.StatusNotFound, "pet owner doesn't exists")
		return
	}

	pets, err := service.GetOwnerPets(phone)
	if err != nil && errors.Is(err, sql.ErrNoRows) {
		fmt.Println("pet owner doesn't exists", err)
		c.JSON(http.StatusNotFound, "pet owner doesn't exists")
		return
	}
	if err != nil {
		fmt.Println("error getting pet owner info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"owner_id": owner.Id,
		"pets":     pets,
	})
}

func GetAllOwners(c *gin.Context) {

	owners, err := service.GetOwners()
	if err != nil {
		fmt.Println("error getting pet owner info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}
	response := make([]datatypes.OwnersResponse, len(owners))
	for i, owner := range owners {
		pets, err := service.GetOwnerPets(owner.Phone)
		if err != nil {
			fmt.Println("error getting pet info", err)
			c.JSON(http.StatusInternalServerError, "something went wrong")
			return
		}

		response[i] = datatypes.OwnersResponse{
			ID:             owner.Id,
			Name:           owner.Name,
			Phone:          owner.Phone,
			Pets:           pets,
			AlternateName:  owner.AlternateName,
			AlternatePhone: owner.AlternatePhone,
			Address:        owner.Address,
		}
	}

	c.JSON(http.StatusOK, response)
}
