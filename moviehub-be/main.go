package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/moviehub/abedsully/controllers"
	"github.com/moviehub/abedsully/middleware"
	"github.com/moviehub/abedsully/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Set up database connection
	dsn := os.Getenv("DB_USERNAME") + ":" + os.Getenv("DB_PASSWORD") + "@tcp(" + os.Getenv("DB_HOST") + ":" + os.Getenv("DB_PORT") + ")/" + os.Getenv("DB_NAME") + "?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Migrate the schema
	models.Migrate(db)

	r := gin.Default()

	// Use the CORS middleware from the gin-contrib package
	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Frontend origin
		AllowMethods:     []string{"POST", "GET", "OPTIONS"}, // Allowed methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true, // Allow credentials
	}

	r.Use(cors.New(corsConfig))

	// Initialize controllers
	authCtrl := &controllers.AuthController{DB: db}
	userCtrl := &controllers.UserController{DB: db}

	// Routes
	r.POST("/auth/register", authCtrl.Register)
	r.POST("/auth/login", authCtrl.Login)
	r.POST("/auth/logout", authCtrl.Logout)
	r.GET("/auth/current_user", middleware.AuthMiddleWare(), userCtrl.GetCurrentUser)

	// Start server
	r.Run(":8080")
}
