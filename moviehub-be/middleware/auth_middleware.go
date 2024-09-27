package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/moviehub/abedsully/utils"
)

func AuthMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Cookie("access_token")

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		claims, err := utils.ParseToken(cookie)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Next()
	}
}