package models

import (
	"github.com/dhruv0711/pet_staycation/datatypes"
)

func AddEntry(data datatypes.OldData) error {
	_, err := DB.Exec(insertOldDataQuery, data.ClientName, data.Amount, data.PetName, data.Date)
	if err != nil {
		return err
	}
	if err != nil {
		return err
	}

	return nil
}

func ListEntry() ([]datatypes.OldData, error) {
	var data []datatypes.OldData
	err := DB.Select(&data, listOldDataQuery)
	if err != nil {
		return nil, err
	}

	if len(data) == 0 {
		return []datatypes.OldData{}, nil
	}

	return data, nil
}
