package api

import (
	"fmt"
	"net/http"

	"github.com/dhruv0711/pet_staycation/datatypes"
	"github.com/dhruv0711/pet_staycation/utils"
	"github.com/gin-gonic/gin"
)

func HandleLogin(c *gin.Context) {
	var login datatypes.Login
	err := c.BindJSON(&login)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid username or password",
		})
	}
	if Authenticate(login.Username, login.Password) {
		token, err := utils.CreateToken(login.Username)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "error creating jwt token",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"token": token,
		})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid username or password",
		})
	}
}

func Login(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", gin.H{})
}

var users = map[string]string{
	"admin": "password123",
	"anita": "anita123",
}

type User struct {
	Username string
	Password string
}

func Authenticate(username, password string) bool {
	if pass, ok := users[username]; ok {
		return pass == password
	}
	return false
}
