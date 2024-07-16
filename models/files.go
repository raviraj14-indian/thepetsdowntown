package models

import (
	"fmt"

	"github.com/dhruv0711/pet_staycation/datatypes"
)

func AddIdentityFile(file datatypes.FileDetails) error {
	_, err := DB.Exec(insertIdentityQuery, file.LinkedId, file.DocType, file.FileName, file.Extension, file.Data)
	if err != nil {
		return err
	}
	return nil
}

func AddVaccinationFile(file datatypes.FileDetails) error {
	_, err := DB.Exec(insertVaccinationQuery, file.LinkedId, file.DocType, file.FileName, file.Extension, file.Data, file.Expiry)
	if err != nil {
		return err
	}
	return nil
}

func GetFile(id string, doc_type string) (datatypes.FileDetailsDB, error) {
	var file datatypes.FileDetailsDB
	err := DB.Get(&file, getFileQuery, id, doc_type)
	if err != nil {
		return datatypes.FileDetailsDB{}, err
	}
	return file, nil
}

func GetExpiry(pet_id string) (string, error) {
	var file datatypes.FileDetails
	err := DB.Get(&file, getExpiryQuery, pet_id)
	if err != nil {
		return "", err
	}
	fmt.Println(file.Expiry)
	return file.Expiry, nil
}
