package api

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/dhruv0711/pet_staycation/constants"
	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/service"
	"github.com/gin-gonic/gin"
)

func AddReservation(c *gin.Context) {
	ownerId := c.PostForm("owner_id")
	owner_id, _ := strconv.Atoi(ownerId)

	petId := c.PostForm("pet_id")
	pet_id, _ := strconv.Atoi(petId)

	dewormingStatus := c.PostForm("deworming_status")
	deworming_status, _ := strconv.ParseBool(dewormingStatus)

	antiTick := c.PostForm("anti_tick")
	anti_tick, _ := strconv.ParseBool(antiTick)

	res := datatypes.ReservationRequest{
		OwnerId:          owner_id,
		PetId:            pet_id,
		DewormingStatus:  deworming_status,
		AntiTick:         anti_tick,
		Diet:             c.PostForm("diet"),
		PreviousBoarding: c.PostForm("previous_boarding"),
		ExistingInjury:   c.PostForm("existing_injury"),
		Start:            c.PostForm("start_date"),
	}

	err := service.AddReservation(res)
	if errors.Is(err, constants.ErrorReservationAlreadyExists) {
		fmt.Println("a live reservation for same pet exists", err)
		c.JSON(http.StatusBadRequest, "Reservation for same pet exists")
		return
	}

	if err != nil {
		fmt.Println("error saving pet info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	vaccination, vaccination_err := c.FormFile("vaccination")
	if vaccination_err == nil {
		expiry := c.PostForm("expiry")
		if expiry == "" {
			fmt.Println("expiry not found")
			c.JSON(http.StatusBadRequest, "expiry not found")
			return
		}
		err = service.AddFile(int64(res.PetId), "pet", vaccination, expiry)
		if err != nil {
			fmt.Println("error uploading file", err)
			c.JSON(http.StatusInternalServerError, "something went wrong")
			return
		}
	} else {
		fmt.Println("error fetching identity proof", vaccination_err)
	}

	c.JSON(http.StatusOK, "reservation info saved successfully")
}

func UpdateReservation(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		fmt.Println("invalid request body, reservation id not provided")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	var res datatypes.Reservation
	err := c.ShouldBindJSON(&res)
	if err != nil {
		fmt.Println("invalid request body")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	err = service.UpdateReservation(id, res)
	if err != nil && errors.Is(err, constants.ErrorNoUpdate) {
		fmt.Println("reservation doesn't exists, or nothing updated", err)
		c.JSON(http.StatusBadRequest, "reservation doesn't exists, or nothing updated")
		return
	}

	if err != nil {
		fmt.Println("error saving reservation info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, "reservation updated successfully")
}

func GetReservationByID(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		fmt.Println("invalid request body, reservation id not provided")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	res_id, err := strconv.Atoi(id)
	if err != nil {
		fmt.Println("invalid request body, reservation id should be int")
		c.JSON(http.StatusBadRequest, "invalid request body")
		return
	}

	reservation, err := service.GetReservationByID(res_id)
	if err != nil && errors.Is(err, sql.ErrNoRows) {
		fmt.Println("reservation doesn't exists", err)
		c.JSON(http.StatusNotFound, "reservation doesn't exists")
		return
	}
	if err != nil {
		fmt.Println("error fetching reservation info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, reservation)
}

func GetReservations(c *gin.Context) {
	var params datatypes.GetReservationParams
	err := c.BindQuery(&params)
	if err != nil {
		fmt.Println("error binding query params", err)
		c.JSON(http.StatusBadRequest, "error binding query params")
		return
	}

	reservations, err := service.GetReservation(params)
	if err != nil && errors.Is(err, sql.ErrNoRows) {
		fmt.Println("reservation doesn't exists", err)
		c.JSON(http.StatusNotFound, "reservation doesn't exists")
		return
	}
	if err != nil {
		fmt.Println("error fetching reservation info", err)
		c.JSON(http.StatusInternalServerError, "something went wrong")
		return
	}

	c.JSON(http.StatusOK, reservations)
}
