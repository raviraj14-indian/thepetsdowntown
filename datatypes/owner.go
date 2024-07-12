package datatypes

import "mime/multipart"

type Owner struct {
	Id             int                   `db:"id" json:"id,omitempty"`
	Phone          string                `db:"phone" json:"phone,omitempty"`
	AlternatePhone string                `db:"alternate_phone" json:"alternate_phone,omitempty"`
	Name           string                `db:"name" json:"name,omitempty"`
	AlternateName  string                `db:"alternate_name" json:"alternate_name,omitempty"`
	Address        string                `db:"address" json:"address,omitempty"`
	Identity       *multipart.FileHeader `json:"identity,omitempty"`
	CreatedAt      string                `db:"created_at" json:"created_at,omitempty"`
	UpdatedAt      string                `db:"updated_at" json:"updated_at,omitempty"`
}

type OwnersResponse struct {
	ID             int    `json:"id,omitempty"`
	Name           string `json:"name,omitempty"`
	Phone          string `json:"phone,omitempty"`
	Pets           []Pet  `json:"pets"`
	AlternateName  string `json:"alternate_name,omitempty"`
	AlternatePhone string `json:"alternate_phone,omitempty"`
	Address        string `json:"address,omitempty"`
}
