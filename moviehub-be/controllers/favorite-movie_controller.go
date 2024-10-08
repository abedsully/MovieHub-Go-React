package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moviehub/abedsully/enums"
	"github.com/moviehub/abedsully/models"
	"gorm.io/gorm"
)

type FavoriteMovieController struct {
	DB *gorm.DB
}

func isValidFavoriteType(types enums.FavoriteType) bool {
	switch types {
	case enums.People, enums.TV, enums.Movie:
		return true
	}
	return false
}

func (ctrl *FavoriteMovieController) CheckFavoriteState(c *gin.Context) {
	var existingFavorite models.Favorite

	var input models.Favorite

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.MovieID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movieId is required"})
		return
	}

	if input.Type == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type is required"})
		return
	}

	if !isValidFavoriteType(*input.Type) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "favorite type field is wrong"})
		return
	}

	currentUserIDStr, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}

	currentUserID, err := uuid.Parse(currentUserIDStr.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	err = ctrl.DB.Where("user_id = ? AND movie_id = ?", currentUserID, *input.MovieID).First(&existingFavorite).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusOK, gin.H{"isFavorite": false})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check favorite state"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"isFavorite": true})
}

func (ctrl *FavoriteMovieController) AddToFavorite(c *gin.Context) {
	var favorite models.Favorite

	var input models.Favorite

	var existingFavorite models.Favorite

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.MovieID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movieId is required"})
		return
	}


	if input.Type == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type is required"})
		return
	}

	if input.UserID == uuid.Nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user_id is required"})
		return
	}


	if !isValidFavoriteType(*input.Type) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "favorite type field is wrong"})
		return
	}

	currentUserIDStr := c.MustGet("user_id").(string)
	currentUserID, err := uuid.Parse(currentUserIDStr)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if err := ctrl.DB.Where("user_id = ? AND movie_id = ?", currentUserID, *input.MovieID).First(&existingFavorite).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "This movie is already in your favorites"})
		return
	} else if err != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check existing favorites"})
		return
	}

	if input.UserID != currentUserID {
		c.JSON(http.StatusForbidden, gin.H{"error": "User ID does not match the current user"})
		return
	}

	favorite.ID = uuid.New()
	favorite.DateInputted = time.Now()
	favorite.MovieID = input.MovieID;
	favorite.Type = input.Type;
	favorite.UserID = input.UserID;

	if err := ctrl.DB.Create(&favorite).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add to your favorite lists"})
		return
	}

	c.JSON(http.StatusOK, favorite)
}

func (ctrl *FavoriteMovieController) RemoveFromFavorite(c *gin.Context) {
	var favorite models.Favorite

	var input models.Favorite

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	currentUserIDStr := c.MustGet("user_id").(string)
	currentUserID, err := uuid.Parse(currentUserIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if input.MovieID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movieId is required"})
		return
	}

	if input.Type == nil || !isValidFavoriteType(*input.Type) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid favorite type"})
		return
	}

	if err := ctrl.DB.Where("user_id = ? AND movie_id = ?", currentUserID, *input.MovieID).First(&favorite).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Favorite not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check existing favorites"})
		return
	}

	if err := ctrl.DB.Delete(&favorite).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove from your favorite lists"})
		return
	}

	c.JSON(http.StatusOK, nil)
}
