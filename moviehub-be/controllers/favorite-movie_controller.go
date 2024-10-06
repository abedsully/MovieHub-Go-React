package controllers

import (
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

func (ctrl *FavoriteMovieController) AddToFavorite(c *gin.Context) {
	var favorite models.Favorite
	var existingFavorite models.Favorite

	if err := c.ShouldBindJSON(&favorite); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if favorite.MovieID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movieId is required"})
		return
	}

	if favorite.Type == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type is required"})
		return
	}

	if !isValidFavoriteType(*favorite.Type) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "favorite type field is wrong"})
		return
	}

	currentUserIDStr := c.MustGet("user_id").(string)
	currentUserID, err := uuid.Parse(currentUserIDStr)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if err := ctrl.DB.Where("user_id = ? AND movie_id = ?", currentUserID, *favorite.MovieID).First(&existingFavorite).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "This movie is already in your favorites"})
		return
	} else if err != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check existing favorites"})
		return
	}

	if favorite.UserID != currentUserID {
		c.JSON(http.StatusForbidden, gin.H{"error": "User ID does not match the current user"})
		return
	}

	favorite.ID = uuid.New()
	favorite.DateInputted = time.Now()

	if err := ctrl.DB.Create(&favorite).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add to your favorite lists"})
		return
	}

	c.JSON(http.StatusOK, favorite)
}

func (ctrl *FavoriteMovieController) RemoveFromFavorite(c *gin.Context) {
	var favorite models.Favorite
	var existingFavorite models.Favorite

	if err := c.ShouldBindJSON(&favorite); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	currentUserIDStr := c.MustGet("user_id").(string)
	curentUserID, err := uuid.Parse(currentUserIDStr)

	if favorite.MovieID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movieId is required"})
		return
	}

	if favorite.Type == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type is required"})
		return
	}

	if !isValidFavoriteType(*favorite.Type) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "favorite type field is wrong"})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if favorite.UserID != curentUserID {
		c.JSON(http.StatusForbidden, gin.H{"error": "User ID does not match the current user"})
		return
	}

	if err := ctrl.DB.Where("user_id = ? AND movie_id = ?", curentUserID, *favorite.MovieID).First(&existingFavorite).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Favorite not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check existing favorites"})
		return
	}

	if err := ctrl.DB.Delete(&favorite, favorite.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove from your favorite lists"})
		return
	}

	c.JSON(http.StatusOK, nil)
}
