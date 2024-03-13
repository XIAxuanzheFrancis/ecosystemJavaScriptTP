package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	_ "github.com/mattn/go-sqlite3"
	log "github.com/sirupsen/logrus"
)

var db *sql.DB

type login struct {
	Username string
	Password string
}

func main() {

	jwtKeyString := os.Getenv("JWT_SECRET")
	if jwtKeyString == "" {
		log.Fatal("Missing jwt secret in the environement variable JWT_SECRET")
	}

	var err error

	db, err = sql.Open(
		"sqlite3",
		fmt.Sprintf("file:%s?cache=shared", os.Getenv("DB_PATH")),
	)

	if err != nil {
		log.Fatal(err)
	}

	var jwtKey = []byte(jwtKeyString)
	log.Infof("Use key %s", string(jwtKey))
	r := gin.Default()
	r.POST("/login", func(c *gin.Context) {

		var login login
		err := json.NewDecoder(c.Request.Body).Decode(&login)
		if err != nil {
			c.Status(http.StatusUnprocessableEntity)
			log.Warn(err)
			return
		}

		u, err := findUser(c, login.Username)
		if err != nil {
			log.Info(err)
			c.Status(http.StatusNotFound)
			return
		}

		err = bcrypt.CompareHashAndPassword(
			[]byte(u.Password), []byte(login.Password),
		)

		if err != nil {
			log.Warn(err)
			c.Status(http.StatusNotFound)
			return
		}

		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		now := time.Now()
		exp := now
		claims["exp"] = exp.Add(10 * time.Minute).Unix()
		claims["iss"] = "http://localhost"
		claims["iat"] = now.Unix()
		claims["nbf"] = now.Unix()
		claims["sub"] = u.Uuid

		tokenString, err := token.SignedString(jwtKey)
		if err != nil {
			log.Error(err)
			c.Status(http.StatusInternalServerError)
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"token": tokenString,
		})
	})
	r.Run()
}

type user struct {
	Uuid     string
	Username string
	Password string
}

func findUser(ctx context.Context, username string) (user, error) {
	rows, err := db.QueryContext(
		ctx, "SELECT * FROM user WHERE username = ? LIMIT 1", username,
	)
	if err != nil {
		return user{}, err
	}

	var u user

	if !rows.Next() {
		rows.Close()
		return user{}, errors.New("no user found")
	}
	err = rows.Scan(&u.Uuid, &u.Username, &u.Password)
	rows.Close()
	if err != nil {
		return user{}, err
	}

	return u, nil
}
