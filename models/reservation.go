package models

import (
	"github.com/dhruv0711/pet_staycation/datatypes"
)

func AddReservation(res datatypes.ReservationRequest) error {
	_, err := DB.Exec(insertReservationQuery, res.OwnerId, res.PetId, res.DewormingStatus, res.AntiTick, res.Diet, res.PreviousBoarding, res.ExistingInjury, res.Start, "live")
	if err != nil {
		return err
	}
	return nil
}

func UpdateReservation(id string, res datatypes.Reservation) (int64, error) {
	a, err := DB.Exec(updateReservationQuery, res.End, "released", id)
	if err != nil {
		return 0, err
	}
	return a.RowsAffected()
}

func GetReservations(list []interface{}, query string) ([]datatypes.Reservation, error) {
	var res []datatypes.ReservationDB
	exec := getReservationsQuery
	if query != "" {
		exec = exec + query
	}
	err := DB.Select(&res, exec, list...)
	if err != nil {
		return []datatypes.Reservation{}, err
	}
	reservations := make([]datatypes.Reservation, len(res))

	for i, val := range res {
		reservations[i] = datatypes.Reservation{
			Id:               val.Id,
			PetID:            val.PetID,
			OwnerID:          val.OwnerID,
			OwnerName:        val.OwnerName,
			Phone:            val.Phone,
			Address:          val.Address,
			PetName:          val.PetName,
			DewormingStatus:  val.DewormingStatus,
			AntiTick:         val.AntiTick,
			Diet:             val.Diet,
			Breed:            val.Breed,
			PreviousBoarding: val.PreviousBoarding,
			ExistingInjury:   val.ExistingInjury,
			Start:            val.Start,
		}

		if val.End.Valid {
			reservations[i].End = val.End.String
		}
	}

	return reservations, nil
}

func GetReservationByID(id int) (datatypes.Reservation, error) {
	var res datatypes.ReservationDB
	err := DB.Get(&res, getReservationByIDQuery, id)
	if err != nil {
		return datatypes.Reservation{}, err
	}
	reservation := datatypes.Reservation{
		Id:               res.Id,
		OwnerName:        res.OwnerName,
		Phone:            res.Phone,
		Address:          res.Address,
		PetName:          res.PetName,
		DewormingStatus:  res.DewormingStatus,
		AntiTick:         res.AntiTick,
		Diet:             res.Diet,
		PreviousBoarding: res.PreviousBoarding,
		ExistingInjury:   res.ExistingInjury,
		Start:            res.Start,
	}

	if res.End.Valid {
		reservation.End = res.End.String
	}

	return reservation, nil
}

func GetReservationByPetID(id string) ([]datatypes.ReservationDB, error) {
	var reservations []datatypes.ReservationDB
	err := DB.Select(&reservations, getReservationByPetQuery, id)
	if err != nil {
		return []datatypes.ReservationDB{}, err
	}

	return reservations, nil
}
