package service

import (
	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/models"
)

func AddBilling(bill datatypes.Billing) (datatypes.BillResponse, error) {
	return models.AddBilling(bill)
}

func GetBilling(id string) (datatypes.Billing, error) {
	return models.GetBilling(id)
}
