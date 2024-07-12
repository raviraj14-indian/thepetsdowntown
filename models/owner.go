package models

import (
	"github.com/dhruv0711/pet_staycation/constants"
	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/go-sql-driver/mysql"
)

func AddOwner(owner datatypes.Owner) (int64, error) {
	result, err := DB.Exec(insertOwnerQuery, owner.Phone, owner.AlternatePhone, owner.Name, owner.AlternateName, owner.Address)
	if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
		return 0, constants.ErrorOwnerAlreadyExists
	}
	if err != nil {
		return 0, err
	}
	return result.LastInsertId()
}

func GetOwner(phone string) (datatypes.Owner, error) {
	var owner datatypes.Owner
	err := DB.Get(&owner, getOwnerQuery, phone)
	if err != nil {
		return datatypes.Owner{}, err
	}
	return owner, nil
}

func GetOwners() ([]datatypes.Owner, error) {
	var owner []datatypes.Owner
	err := DB.Select(&owner, getOwnersQuery)
	if err != nil {
		return []datatypes.Owner{}, err
	}
	return owner, nil
}

func GetOwnerPets(phone string) ([]datatypes.Pet, error) {
	var pets []datatypes.Pet
	err := DB.Select(&pets, getOwnerPetsQuery, phone)
	if err != nil {
		return []datatypes.Pet{}, err
	}
	if len(pets) == 0 {
		return []datatypes.Pet{}, nil
	}
	return pets, nil
}
