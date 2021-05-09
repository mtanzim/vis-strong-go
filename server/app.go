package server

import (
	"log"
	"net/http"
	"os"

	"github.com/mtanzim/vis-strong-go/server/controllers"
)

var (
	ApiURL = "/api/v1"
)

func Start() {
	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.HandleFunc(ApiURL+"/health", controllers.HealthController)
	http.HandleFunc(ApiURL+"/data", controllers.ExerciseController)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("Starting server on PORT:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
