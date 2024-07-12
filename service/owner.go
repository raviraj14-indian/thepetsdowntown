package service

import (
	"strconv"

	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/models"
)

func AddOwner(owner datatypes.Owner) (int64, error) {
	return models.AddOwner(owner)
}

func GetOwner(phone string) (datatypes.Owner, error) {
	return models.GetOwner(phone)
}

func GetOwners() ([]datatypes.Owner, error) {
	return models.GetOwners()
}

func GetOwnerPets(phone string) ([]datatypes.Pet, error) {
	pets, err := models.GetOwnerPets(phone)
	if err != nil {
		return nil, err
	}

	for ind, val := range pets {
		expiry, err := models.GetExpiry(strconv.Itoa(val.Id))
		if err != nil {
			pets[ind].VacinationExpired = true
			continue
		}
		pets[ind].VacinationExpired = checkExpired(expiry)
	}

	return pets, nil
}
