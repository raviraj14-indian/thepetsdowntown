package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"

	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/models"
	"github.com/dhruv0711/pet_staycation/service"
	"github.com/jmoiron/sqlx"
	"github.com/xuri/excelize/v2"
)

func main() {
	// Open the Excel file
	f, err := excelize.OpenFile("Dhruv.xlsx")
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}
	defer func() {
		// Close the Excel file
		if err := f.Close(); err != nil {
			log.Fatalf("Error closing file: %v", err)
		}
	}()

	db, err := sqlx.Connect("mysql", "root:password@tcp(localhost:3306)/tpd")
	if err != nil {
		log.Fatal("database connection failed", err)
		return
	}
	models.DB = db
	// Get all the rows in the specified sheet
	rows, err := f.GetRows("Sheet1")
	if err != nil {
		log.Fatalf("Error getting rows: %v", err)
	}
	var result []datatypes.OldData
	// Iterate through the rows and print each cell
	for _, row := range rows {
		if len(row) == 2 {
			continue
		}
		var datarow datatypes.OldData

		for j, colCell := range row {
			if j == 1 {
				fmt.Println(getDate(colCell))
				datarow.Date = getDate(colCell)
			}
			if j == 2 {
				datarow.ClientName = colCell
			}
			if j == 3 {
				datarow.Amount, _ = strconv.Atoi(colCell)
			}
			if j == 4 {
				datarow.PetName = colCell
			}
			if len(row) == 4 {
				datarow.PetName = "-"
			}
		}
		if datarow.Amount != 0 {
			result = append(result, datarow)
		}
	}
	for _, val := range result {
		err = service.AddEntry(val)
		if err != nil {
			fmt.Println(err)
		}
	}
}

func getDate(da string) string {
	sp := strings.Split(da, "-")
	var date string
	if len(sp) > 1 {
		switch sp[1] {
		case "Jan":
			date += "2024-01-"
		case "Feb":
			date += "2024-02-"
		case "Mar":
			date += "2024-03-"
		case "Apr":
			date += "2024-04-"
		case "May":
			date += "2023-05-"
		case "Jun":
			date += "2023-06-"
		case "Jul":
			date += "2023-07-"
		case "Aug":
			date += "2023-08-"
		case "sept":
			date += "2023-09-"
		case "Oct":
			date += "2023-10-"
		case "Nov":
			date += "2023-11-"
		case "Dec":
			date += "2023-12-"
		}
	}
	date += sp[0]
	return date
}
