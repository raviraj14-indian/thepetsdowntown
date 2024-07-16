package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("the-pets-down-town")

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func CreateToken(username string) (string, error) {
	// Create a new JWT token with claims
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": username,                                  // Subject (user identifier)
		"iss": "tpd",                                     // Issuer
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(), // Expiration time
		"iat": time.Now().Unix(),                         // Issued at
	})

	// Print information about the created token
	fmt.Printf("Token claims added: %+v\n", claims)
	return claims.SignedString(jwtKey)
}

func ValidToken(jwttoken string) (bool, error) {
	claims := &Claims{}

	// Parse the JWT token
	token, err := jwt.ParseWithClaims(jwttoken, claims, func(token *jwt.Token) (interface{}, error) {
		// Check the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtKey, nil
	})
	if err != nil {
		return false, err
	}

	return token.Valid, nil
}
