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

	c.JSON(http.StatusOK, gin.H{"id": user.ID, "username": user.Username, "profile_picture": user.ProfilePicture})
}

func (ctrl *UserController) EditUserProfile(c *gin.Context) {
	userId := c.Param("id")

	var user models.User

	if err := ctrl.DB.Where("id = ?", userId).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var input struct {
		Username *string `form:"username"`
	}

	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Username == nil && c.Request.MultipartForm == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "At least one field (username or profile picture) must be provided"})
		return
	}

	if input.Username != nil {
		user.Username = *input.Username
	}

	if file, err := c.FormFile("profile_picture"); err == nil {
		if err := c.SaveUploadedFile(file, "./uploads/"+file.Filename); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save profile picture"})
			return
		}
		user.ProfilePicture = file.Filename
	}

	if err := ctrl.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully", "username": user.Username, "profile_picture": user.ProfilePicture})
}
