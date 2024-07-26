package datatypes

type OldData struct {
	Date       string `db:"date" json:"date,omitempty"`
	Amount     int    `db:"amount" json:"amount,omitempty"`
	ClientName string `db:"client_name" json:"client_name,omitempty"`
	PetName    string `db:"pet_name" json:"pet_name,omitempty"`
}
