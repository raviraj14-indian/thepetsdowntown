package service

import (
	"fmt"
	"time"

	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/models"
)

func AddPet(pet datatypes.Pet) error {
	return models.AddPet(pet)
}

func GetPet(id string) (datatypes.PetDetails, error) {
	pet, err := models.GetPet(id)
	if err != nil {
		return datatypes.PetDetails{}, err
	}

	pet_details := datatypes.PetDetails{
		Id:                pet.Id,
		OwnerId:           pet.OwnerId,
		Name:              pet.Name,
		Breed:             pet.Breed,
		Age:               pet.Age,
		Gender:            pet.Gender,
		IsSterilized:      pet.IsSterilized,
		VacinationExpired: pet.VacinationExpired,
		CreatedAt:         pet.CreatedAt,
		UpdatedAt:         pet.UpdatedAt,
	}

	reservations_db, err := models.GetReservationByPetID(id)
	if err != nil {
		return datatypes.PetDetails{}, err
	}
	vaccination, err := models.GetExpiry(id)
	if err != nil {
		pet_details.VacinationExpired = true
	} else {
		pet_details.VacinationExpired = checkExpired(vaccination)
	}
	reservations := make([]datatypes.Reservation, len(reservations_db))
	for i, val := range reservations_db {
		reservation := datatypes.Reservation{
			Id:               val.Id,
			OwnerID:          val.OwnerID,
			PetID:            val.PetID,
			OwnerName:        val.OwnerName,
			Address:          val.Address,
			PetName:          val.PetName,
			DewormingStatus:  val.DewormingStatus,
			AntiTick:         val.AntiTick,
			Diet:             val.Diet,
			Breed:            val.Breed,
			PreviousBoarding: val.PreviousBoarding,
			ExistingInjury:   val.ExistingInjury,
			Start:            val.Start,
			Status:           val.Status,
			CreatedAt:        val.CreatedAt,
			UpdatedAt:        val.UpdatedAt,
		}

		if val.End.Valid {
			reservation.End = val.End.String
		}
		reservations[i] = reservation
	}
	pet_details.Reservation = reservations
	return pet_details, nil
}

func checkExpired(expiry string) bool {
	exp, err := time.Parse("2006-01-02", expiry)
	if err != nil {
		fmt.Println("Error parsing time:", err)
		return false
	}

	location, err := time.LoadLocation("Asia/Kolkata")
	if err != nil {
		fmt.Println("Error loading location:", err)
		return false
	}

	exp = time.Date(exp.Year(), exp.Month(), exp.Day(), 23, 59, 59, 0, location)
	expired := time.Now().After(exp)
	return expired
}
