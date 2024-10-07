package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moviehub/abedsully/models"
	"gorm.io/gorm"
)

type CommentController struct {
	DB *gorm.DB
}

func (ctrl *CommentController) AddComment(c *gin.Context) {
	var newComment models.Comment

	if err := c.ShouldBindJSON(&newComment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	currentUserIDStr := c.MustGet("user_id").(string)
	currentUserID, err := uuid.Parse(currentUserIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if newComment.UserID != currentUserID {
		c.JSON(http.StatusForbidden, gin.H{"error": "User ID does not match the current user"})
		return
	}
	
	newComment.ID = uuid.New()
	newComment.DateInputted = time.Now()

	if err := ctrl.DB.Create(&newComment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
		return
	}

	c.JSON(http.StatusCreated, newComment)
}

func (ctrl *CommentController) GetCommentByMovieID(c *gin.Context) {
	movieId := c.Param("movieId")

	var comments []models.Comment

	if err := ctrl.DB.Where("movie_id = ?", movieId).Find(&comments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch comments"})
		return
	}

	c.JSON(http.StatusOK, comments)
}

func (ctrl *CommentController) GetCommentByUserID(c *gin.Context) {
	userId := c.Param("userId")

	var comments []models.Comment

	currentUserIDStr := c.MustGet("user_id").(string)
	currentUserID, err := uuid.Parse(currentUserIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if err := ctrl.DB.Where("user_id = ?", userId).Find(&comments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch comments"})
		return
	}

	if len(comments) > 0 && comments[0].UserID != currentUserID {
		c.JSON(http.StatusForbidden, gin.H{"error": "User ID does not match the current user"})
		return
	}

	c.JSON(http.StatusOK, comments)
}