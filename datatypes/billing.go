package datatypes

type Billing struct {
	Id                   int    `db:"id" json:"id,omitempty"`
	OwnerId              int    `db:"owner_id" json:"owner_id,omitempty"`
	PetId                int    `db:"pet_id" json:"pet_id,omitempty"`
	ReservationId        int    `db:"reservation_id" json:"reservation_id,omitempty"`
	NoOfDays             int    `db:"no_of_days" json:"no_of_days,omitempty"`
	DayCareHours         int    `db:"day_care_hours" json:"day_care_hours,omitempty"`
	DayCareMinutes       int    `db:"day_care_minutes" json:"day_care_minutes,omitempty"`
	DaycareCharge        int    `db:"daycare_charge" json:"daycare_charge,omitempty"`
	BoardingChargePerDay int    `db:"boarding_charge_per_day" json:"boarding_charge_per_day,omitempty"`
	BoardingCharge       int    `db:"boarding_charge" json:"total_boarding_charge,omitempty"`
	Discount             int    `db:"discount" json:"discount,omitempty"`
	Amount               int    `db:"amount" json:"amount,omitempty"`
	EndDate              string `json:"end_date,omitempty"`
	CreatedAt            string `db:"created_at" json:"created_at,omitempty"`
	UpdatedAt            string `db:"updated_at" json:"updated_at,omitempty"`
}

type BillResponse struct {
	Id int `db:"id" json:"id,omitempty"`
}

type BillingDetails struct {
	Id                   int    `db:"id" json:"id,omitempty"`
	OwnerId              int    `db:"owner_id" json:"owner_id,omitempty"`
	OwnerName            string `db:"owner_name" json:"owner_name,omitempty"`
	PetId                int    `db:"pet_id" json:"pet_id,omitempty"`
	ReservationId        int    `db:"reservation_id" json:"reservation_id,omitempty"`
	NoOfDays             int    `db:"no_of_days" json:"no_of_days,omitempty"`
	DayCareHours         int    `db:"day_care_hours" json:"day_care_hours,omitempty"`
	DayCareMinutes       int    `db:"day_care_minutes" json:"day_care_minutes,omitempty"`
	DaycareCharge        int    `db:"daycare_charge" json:"daycare_charge,omitempty"`
	BoardingChargePerDay int    `db:"boarding_charge_per_day" json:"boarding_charge_per_day,omitempty"`
	BoardingCharge       int    `db:"boarding_charge" json:"total_boarding_charge,omitempty"`
	Discount             int    `db:"discount" json:"discount,omitempty"`
	Amount               int    `db:"amount" json:"amount,omitempty"`
	EndDate              string `json:"end_date,omitempty"`
	CreatedAt            string `db:"created_at" json:"created_at,omitempty"`
	UpdatedAt            string `db:"updated_at" json:"updated_at,omitempty"`
}
