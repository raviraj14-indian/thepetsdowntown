package main

import (
	"log"
	"net/http"

	"github.com/dhruv0711/pet_staycation/api"
	"github.com/dhruv0711/pet_staycation/models"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

func main() {
	db, err := sqlx.Connect("mysql", "root:password@tcp(localhost:3306)/tpd")
	if err != nil {
		log.Fatal("database connection failed", err)
		return
	}
	models.DB = db

	// Create a new Gin router
	router := gin.Default()

	router.GET("/login", api.Login)
	router.POST("/login", api.HandleLogin)

	router.POST("/pet", api.AddPet)
	router.GET("/pet-vaccination/:id", api.GetPetVaccination)
	router.GET("/pet/:id", api.GetPetDetails)

	router.POST("/owner", api.CreateOwner)
	router.GET("/owner/:phone", api.GetOwner)
	router.GET("/owner/:phone/pets", api.GetOwnerPets)
	router.GET("/owners", api.GetAllOwners)
	router.GET("/owner-identification/:id", api.GetOwnerIdentity)

	router.POST("/reservation", api.AddReservation)
	router.PUT("/reservation/:id", api.UpdateReservation)
	router.GET("/reservation/:id", api.GetReservationByID)
	router.GET("/reservations", api.GetReservations)

	router.POST("/billing", api.AddBilling)
	router.GET("/billing/:id", api.GetBilling)

	router.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "./client/dist/index.html", gin.H{})
	})
	// Run the server on port 8080
	router.Run(":8080")
}
