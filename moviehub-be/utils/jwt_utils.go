package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtSecret = []byte("mysecretkey")

type Claims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

func GenerateToken(userID string) (string, error) {
	claims := Claims {
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(jwtSecret)
}

func ParseToken(tokenString string) (Claims, error) {
	var claims Claims

	token, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return claims, err
	}

	return claims, nil
}