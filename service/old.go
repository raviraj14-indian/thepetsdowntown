package service

import (
	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/models"
)

func AddEntry(data datatypes.OldData) error {
	return models.AddEntry(data)
}

func ListEntry() ([]datatypes.OldData, error) {
	return models.ListEntry()
}
