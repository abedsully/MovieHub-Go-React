package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moviehub/abedsully/models"
	"github.com/moviehub/abedsully/utils"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthController struct {
	DB *gorm.DB
}

func (ctrl *AuthController) Register(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	user.ID = uuid.New()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password = string(hashedPassword)

	if err := ctrl.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User registered successfully",
	})
}



func (ctrl *AuthController) Login(c *gin.Context) {
	var user models.User
	var foundUser models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	if err := ctrl.DB.Where("email = ?", user.Email).First(&foundUser).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(user.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := utils.GenerateToken(foundUser.ID.String())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.SetCookie("access_token", token, 3600, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

func (ctrl *AuthController) Logout(c *gin.Context) {
	c.SetCookie("access_token", "", -1, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Successfully logged out"})
}