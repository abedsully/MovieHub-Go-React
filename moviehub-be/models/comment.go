package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/moviehub/abedsully/enums"
	"gorm.io/gorm"
)

type Comment struct {
	ID            uuid.UUID 			`gorm:"type:char(36);primaryKey" json:"id"`
	MovieID       int       			`json:"movieId"`
	UserID        uuid.UUID 			`gorm:"type:char(36)" json:"userId"`
	Comment       string    			`json:"comment"`
	DateInputted  time.Time 			`json:"dateInputted"`
	Type          *enums.FavoriteType   `json:"type"`
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&User{}, &Comment{}, &Favorite{})
}