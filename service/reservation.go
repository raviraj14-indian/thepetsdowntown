package service

import (
	"strconv"

	"github.com/dhruv0711/pet_staycation/constants"

	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/models"
)

func AddReservation(res datatypes.ReservationRequest) error {
	params := datatypes.GetReservationParams{
		Status:  "live",
		PetID:   strconv.Itoa(res.PetId),
		OwnerID: strconv.Itoa(res.OwnerId),
	}
	reservations, err := GetReservation(params)
	if err != nil {
		return err
	}

	if len(reservations) > 0 {
		return constants.ErrorReservationAlreadyExists
	}
	return models.AddReservation(res)
}

func UpdateReservation(id string, res datatypes.Reservation) error {
	updated, err := models.UpdateReservation(id, res)
	if err != nil {
		return err
	}

	if updated == 0 {
		return constants.ErrorNoUpdate
	}
	return nil
}

func GetReservationByID(id int) (datatypes.Reservation, error) {
	return models.GetReservationByID(id)
}

func GetReservation(params datatypes.GetReservationParams) ([]datatypes.Reservation, error) {
	var query string
	var list []interface{}
	if params.Status == "" {
		params.Status = "live"
	}
	list = append(list, params.Status)

	if params.StartDate != "" {
		query += " AND start_date > ?"
		list = append(list, params.StartDate)
	}

	if params.EndDate != "" {
		query += " AND end_date < ?"
		list = append(list, params.EndDate)
	}

	if params.OwnerID != "" {
		query += " AND o.id = ?"
		list = append(list, params.OwnerID)
	}

	if params.PetID != "" {
		query += " AND p.id = ?"
		list = append(list, params.PetID)
	}

	return models.GetReservations(list, query)
}
