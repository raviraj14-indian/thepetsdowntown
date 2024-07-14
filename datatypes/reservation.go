package datatypes

import "database/sql"

type ReservationRequest struct {
	Id               int    `db:"id" json:"id,omitempty"`
	OwnerId          int    `db:"owner_id" json:"owner_id,omitempty"`
	PetId            int    `db:"pet_id" json:"pet_id,omitempty"`
	DewormingStatus  bool   `db:"deworming_status" json:"deworming_status,omitempty"`
	AntiTick         bool   `db:"anti_tick" json:"anti_tick,omitempty"`
	Diet             string `db:"diet" json:"diet,omitempty"`
	PreviousBoarding string `db:"previous_boarding" json:"previous_boarding,omitempty"`
	ExistingInjury   string `db:"existing_injury" json:"existing_injury,omitempty"`
	Start            string `db:"start_date" json:"start_date,omitempty"`
	End              string `db:"end_date" json:"end_date,omitempty"`
	Status           string `db:"status" json:"status,omitempty"`
	CreatedAt        string `db:"created_at" json:"created_at,omitempty"`
	UpdatedAt        string `db:"updated_at" json:"updated_at,omitempty"`
}

type Reservation struct {
	Id               int    `db:"id" json:"id,omitempty"`
	OwnerID          int    `db:"owner_id" json:"owner_id,omitempty"`
	PetID            int    `db:"pet_id" json:"pet_id,omitempty"`
	OwnerName        string `db:"owner_name" json:"owner_name,omitempty"`
	Phone            string `db:"phone" json:"phone,omitempty"`
	Address          string `db:"address" json:"address,omitempty"`
	PetName          string `db:"pet_name" json:"pet_name,omitempty"`
	DewormingStatus  bool   `db:"deworming_status" json:"deworming_status,omitempty"`
	AntiTick         bool   `db:"anti_tick" json:"anti_tick,omitempty"`
	Diet             string `db:"diet" json:"diet,omitempty"`
	Breed            string `db:"breed" json:"breed,omitempty"`
	PreviousBoarding string `db:"previous_boarding" json:"previous_boarding,omitempty"`
	ExistingInjury   string `db:"existing_injury" json:"existing_injury,omitempty"`
	Start            string `db:"start_date" json:"start_date,omitempty"`
	End              string `db:"end_date" json:"end_date,omitempty"`
	Status           string `db:"status" json:"status,omitempty"`
	CreatedAt        string `db:"created_at" json:"created_at,omitempty"`
	UpdatedAt        string `db:"updated_at" json:"updated_at,omitempty"`
}

type ReservationDB struct {
	Id               int            `db:"id"`
	OwnerID          int            `db:"owner_id"`
	PetID            int            `db:"pet_id"`
	OwnerName        string         `db:"owner_name"`
	Phone            string         `db:"phone"`
	Address          string         `db:"address"`
	PetName          string         `db:"pet_name"`
	DewormingStatus  bool           `db:"deworming_status"`
	AntiTick         bool           `db:"anti_tick"`
	Diet             string         `db:"diet"`
	Breed            string         `db:"breed"`
	PreviousBoarding string         `db:"previous_boarding"`
	ExistingInjury   string         `db:"existing_injury"`
	Start            string         `db:"start_date"`
	End              sql.NullString `db:"end_date"`
	Status           string         `db:"status"`
	CreatedAt        string         `db:"created_at"`
	UpdatedAt        string         `db:"updated_at"`
}

type GetReservationParams struct {
	Status    string `form:"status"`
	OwnerID   string `form:"owner_id"`
	PetID     string `form:"pet_id"`
	StartDate string `form:"start_date"`
	EndDate   string `form:"end_date"`
}
