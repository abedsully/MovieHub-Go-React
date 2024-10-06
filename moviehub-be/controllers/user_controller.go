package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/moviehub/abedsully/models"
	"gorm.io/gorm"
)

type UserController struct {
	DB *gorm.DB
}

func (ctrl *UserController) GetCurrentUser(c *gin.Context) {
	userID := c.MustGet("user_id").(string)

	var user models.User

	if err := ctrl.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (ctrl *UserController) GetUserByUserId(c *gin.Context) {
	userID := c.Param("id")

	var user models.User

	if err := ctrl.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}