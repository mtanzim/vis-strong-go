package controllers

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"sync"

	"github.com/mtanzim/vis-strong-go/managedb"
)

func ExerciseController(w http.ResponseWriter, req *http.Request) {

	if req.Method != http.MethodGet {
		w.WriteHeader(http.StatusNotFound)
		HandlerError(w, errors.New("not found"), errors.New("not found"))

		return
	}

	// minDate := req.URL.Query().Get("start")
	// maxDate := req.URL.Query().Get("end")
	// exercise := req.URL.Query().Get("exercise")

	// err := ValidateQueryDate(minDate, maxDate)
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	HandlerError(w, err, err)
	// 	return
	// }

	// TODO: remove this hardcoded value
	// dbPath := ":memory:"
	dbPath := "test2.db"
	// inputPath := "strong-input.csv"
	// os.Remove(dbPath)
	// rows := csvread.GetDataFromCSV(inputPath)
	userDB, closeDB := managedb.NewUserDB(dbPath)
	defer closeDB()
	// userDB.Persist(rows)
	exerciseNames, err := userDB.ReadExerciseNames()
	m := make(map[string][]managedb.ExerciseStats)
	var wg sync.WaitGroup
	for _, exercise := range exerciseNames {
		wg.Add(1)
		go func(excName string, wg *sync.WaitGroup) {
			defer wg.Done()
			exerciseStats, err := userDB.ReadExerciseStats(excName)
			if err != nil {
				log.Println(err)
				return
			}
			m[excName] = exerciseStats
		}(exercise.ExerciseName, &wg)
	}
	wg.Wait()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		HandlerError(w, err, err)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	if err := json.NewEncoder(w).Encode(m); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		HandlerError(w, err, errors.New("something went wrong"))
		return
	}

}
