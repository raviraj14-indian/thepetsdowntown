package datatypes

import "database/sql"

type FileDetails struct {
	LinkedId  int64  `db:"linked_id" json:"linked_id,omitempty"`
	DocType   string `db:"doc_type" json:"doc_type,omitempty"`
	Data      []byte `db:"data" json:"data,omitempty"`
	FileName  string `db:"file_name" json:"file_name,omitempty"`
	Extension string `db:"extension" json:"extension,omitempty"`
	Expiry    string `db:"expiry" json:"expiry,omitempty"`
	CreatedAt string `db:"created_at" json:"created_at,omitempty"`
	UpdatedAt string `db:"updated_at" json:"updated_at,omitempty"`
}

type FileDetailsDB struct {
	LinkedId  int64          `db:"linked_id"`
	DocType   string         `db:"doc_type"`
	Data      []byte         `db:"data"`
	FileName  string         `db:"file_name"`
	Extension string         `db:"extension"`
	Expiry    sql.NullString `db:"expiry"`
	CreatedAt string         `db:"created_at"`
	UpdatedAt string         `db:"updated_at"`
}
