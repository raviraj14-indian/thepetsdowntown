package models

import (
	"github.com/dhruv0711/pet_staycation/datatypes"
)

func AddBilling(bill datatypes.Billing) (datatypes.BillResponse, error) {
	result, err := DB.Exec(insertBillingQuery, bill.OwnerId, bill.PetId, bill.ReservationId, bill.NoOfDays, bill.DayCareHours, bill.DayCareMinutes, bill.BoardingChargePerDay, bill.BoardingCharge, bill.DaycareCharge, bill.Discount, bill.Amount)
	if err != nil {
		return datatypes.BillResponse{}, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return datatypes.BillResponse{}, err
	}

	var res datatypes.BillResponse
	err = DB.Get(&res, getBillingIDQuery, id)
	if err != nil {
		return datatypes.BillResponse{}, err
	}

	return datatypes.BillResponse{
		Id: res.Id,
	}, nil
}

func GetBilling(id string) (datatypes.Billing, error) {
	var res datatypes.Billing
	err := DB.Get(&res, getBillingDetailQuery, id)
	if err != nil {
		return datatypes.Billing{}, err
	}

	return res, nil
}
