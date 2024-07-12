package datatypes

type Pet struct {
	Id                int    `db:"id" json:"id,omitempty"`
	OwnerId           int    `db:"owner_id" json:"owner_id,omitempty"`
	Name              string `db:"name" json:"name,omitempty"`
	Breed             string `db:"breed" json:"breed,omitempty"`
	Age               int    `db:"age" json:"age,omitempty"`
	Gender            string `db:"gender" json:"gender,omitempty"`
	IsSterilized      bool   `db:"is_sterilized" json:"is_sterilized,omitempty"`
	VacinationExpired bool   `json:"vaccination_expired"`
	CreatedAt         string `db:"created_at" json:"created_at,omitempty"`
	UpdatedAt         string `db:"updated_at" json:"updated_at,omitempty"`
}

type PetDetails struct {
	Id                int           `db:"id" json:"id,omitempty"`
	OwnerId           int           `db:"owner_id" json:"owner_id,omitempty"`
	Name              string        `db:"name" json:"name,omitempty"`
	Breed             string        `db:"breed" json:"breed,omitempty"`
	Age               int           `db:"age" json:"age,omitempty"`
	Gender            string        `db:"gender" json:"gender,omitempty"`
	IsSterilized      bool          `db:"is_sterilized" json:"is_sterilized,omitempty"`
	Reservation       []Reservation `json:"reservations"`
	VacinationExpired bool          `json:"vaccination_expired"`
	CreatedAt         string        `db:"created_at" json:"created_at,omitempty"`
	UpdatedAt         string        `db:"updated_at" json:"updated_at,omitempty"`
}
