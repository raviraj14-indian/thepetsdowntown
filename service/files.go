package service

import (
	"fmt"
	"mime/multipart"
	"strings"

	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/models"
)

func AddFile(id int64, doc_type string, fileHeader *multipart.FileHeader, expiry string) error {
	file, err := fileHeader.Open()
	if err != nil {
		fmt.Println(err)
		return err
	}

	data := make([]byte, 1024<<14)
	fmt.Println(len(data))
	n, err := file.Read(data)
	if err != nil {
		fmt.Println(err)
		return err
	}
	var extension string
	if len(strings.Split(fileHeader.Filename, ".")) > 1 {
		extension = strings.Split(fileHeader.Filename, ".")[1]
	}

	param := datatypes.FileDetails{
		LinkedId:  id,
		DocType:   doc_type,
		FileName:  fileHeader.Filename,
		Extension: extension,
		Data:      data[:n],
	}

	if doc_type == "owner" && expiry == "" {
		return models.AddIdentityFile(param)
	}

	param.Expiry = expiry
	return models.AddVaccinationFile(param)
}

func GetFile(id string, doc_type string) (datatypes.FileDetails, error) {
	file_db, err := models.GetFile(id, doc_type)
	if err != nil {
		return datatypes.FileDetails{}, err
	}

	file := datatypes.FileDetails{
		LinkedId:  file_db.LinkedId,
		DocType:   file_db.DocType,
		Data:      file_db.Data,
		FileName:  file_db.FileName,
		Extension: file_db.Extension,
	}

	if file_db.Expiry.Valid {
		file.Expiry = file_db.Expiry.String
	}

	return file, nil
}
