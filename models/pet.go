package models

import (
	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB

func AddPet(pet datatypes.Pet) error {
	_, err := DB.Exec(insertPetQuery, pet.OwnerId, pet.Name, pet.Breed, pet.Age, pet.Gender, pet.IsSterilized)
	if err != nil {
		return err
	}
	return nil
}

func GetPet(id string) (datatypes.Pet, error) {
	var pet datatypes.Pet
	err := DB.Get(&pet, getPetQuery, id)
	if err != nil {
		return datatypes.Pet{}, err
	}

	return pet, nil
}
