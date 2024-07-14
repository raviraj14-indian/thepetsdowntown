package api

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/dhruv0711/pet_staycation/constants"
	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/service"
	"github.com/gin-gonic/gin"
)

func AddBilling(c *gin.Context) {
	var bill datatypes.Billing
	err := c.ShouldBindJSON(&bill)
	if err != nil {
		fmt.Println("invalid request body")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	billed, err := service.AddBilling(bill)
	if err != nil {
		fmt.Println("error saving billing info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	err = service.UpdateReservation(strconv.Itoa(bill.ReservationId), datatypes.Reservation{
		End: bill.EndDate,
	})
	if err != nil && errors.Is(err, constants.ErrorNoUpdate) {
		fmt.Println("error updating reservation info", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	if err != nil {
		fmt.Println("error updating reservation info", err)
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, billed)
}

func GetBilling(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		fmt.Println("reservation id not found")
		c.JSON(http.StatusBadRequest, "reservation id not found")
		return
	}

	invoice_details, err := service.GetBilling(id)
	if err != nil {
		fmt.Println("error fetching billing info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, invoice_details)
}
