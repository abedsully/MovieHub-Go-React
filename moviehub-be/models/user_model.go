package models

import (
	"github.com/google/uuid"
)

type User struct {
	ID             uuid.UUID `gorm:"type:char(36);primaryKey" json:"id"`
	Username       string    `json:"username"`
	Email          string    `gorm:"unique" json:"email"`
	Password       string    `json:"password"`
	ProfilePicture string    `json:"profile_picture"`
}