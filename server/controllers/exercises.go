package controllers

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"

	"github.com/mtanzim/vis-strong-go/csvread"
	"github.com/mtanzim/vis-strong-go/managedb"
)

const MAX_UPLOAD_SIZE = 1024 * 1024 // 1MB

func process(data []csvread.Row) (map[string][]managedb.ExerciseStats, error) {
	userDB, close := managedb.NewUserDB(":memory:")
	defer close()
	err := userDB.Persist(data)
	if err != nil {
		return nil, err
	}
	exerciseNames, err := userDB.ReadExerciseNames()
	m := make(map[string][]managedb.ExerciseStats)

	// TOOD: concurrency here causes intermittent crashes; investigate
	for _, exercise := range exerciseNames {
		func(excName string) {
			exerciseStats, err := userDB.ReadExerciseStats(excName)
			if err != nil {
				log.Println(err)
				return
			}
			m[excName] = exerciseStats
		}(exercise.ExerciseName)
	}
	return m, err
}

func UploadController(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusNotFound)
		HandlerError(w, errors.New("not found"), errors.New("not found"))
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	if os.Getenv("DEVELOPMENT") == "1" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
	}

	if err := r.ParseMultipartForm(MAX_UPLOAD_SIZE); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		HandlerError(w, err, errors.New("upload size too big"))
		return
	}
	file, handler, err := r.FormFile("myFile")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		HandlerError(w, err, errors.New("failed to upload file"))
		return
	}
	defer file.Close()
	log.Printf("Uploaded File: %+v\n", handler.Filename)
	log.Printf("File Size: %+v\n", handler.Size)
	log.Printf("MIME Header: %+v\n", handler.Header)

	data, err := csvread.GetDataFromCSV(file)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		HandlerError(w, err, errors.New("failed to read file"))
		return
	}

	m, err := process(data)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		HandlerError(w, err, errors.New("failed to process file"))
		return
	}

	if err := json.NewEncoder(w).Encode(m); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		HandlerError(w, err, errors.New("something went wrong"))
		return
	}

}
