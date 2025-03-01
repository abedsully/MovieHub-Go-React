package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/moviehub/abedsully/enums"
)

type Favorite struct {
	ID       		uuid.UUID 			   `json:"id"`
	UserID        	uuid.UUID 	 		   `gorm:"type:char(36)" json:"user_id"`
	MovieID       	*int            	   `json:"movie_id"`
	Type         	*enums.FavoriteType    `json:"type"`
	DateInputted  	time.Time      		   `json:"dateInputted"`
}