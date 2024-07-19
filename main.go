package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/dhruv0711/pet_staycation/api"
	"github.com/dhruv0711/pet_staycation/models"
	"github.com/dhruv0711/pet_staycation/utils"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

func authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.Request.Header.Get("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "no authentication header found",
			})
			c.Abort()
			return
		}

		seperatedHeader := strings.Split(authHeader, " ")
		if len(seperatedHeader) != 2 {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "invalid authentication header",
			})
			c.Abort()
			return
		}

		valid, err := utils.ValidToken(seperatedHeader[1])
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "invalid token",
			})
			c.Abort()
			return
		}

		if !valid {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "invalid token",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	db, err := sqlx.Connect("mysql", "root:password@tcp(localhost:3306)/tpd")
	if err != nil {
		log.Fatal("database connection failed", err)
		return
	}
	models.DB = db

	// Create a new Gin router
	router := gin.Default()

	// Middlewares
	router.Use(CORSMiddleware())
	router.Use(authenticate())

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

	router.GET("/old-data", api.GetOldData)

	// Run the server on port 8080
	router.Run(":8080")
}
