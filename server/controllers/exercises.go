package controllers

import (
	"encoding/json"
	"errors"
	"net/http"
	"os"

	"github.com/mtanzim/vis-strong-go/csvread"
	"github.com/mtanzim/vis-strong-go/managedb"
)

func ExerciseController(w http.ResponseWriter, req *http.Request) {

	if req.Method != http.MethodGet {
		w.WriteHeader(http.StatusNotFound)
		HandlerError(w, errors.New("not found"), errors.New("not found"))

		return
	}

	minDate := req.URL.Query().Get("start")
	maxDate := req.URL.Query().Get("end")
	exercise := req.URL.Query().Get("exercise")

	err := ValidateQueryDate(minDate, maxDate)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		HandlerError(w, err, err)
		return
	}

	// TODO: remove this hardcoded value
	dbPath := ":memory:"
	inputPath := "strong-input.csv"
	os.Remove(dbPath)
	rows := csvread.GetDataFromCSV(inputPath)
	userDB, closeDB := managedb.NewUserDB(dbPath)
	defer closeDB()
	userDB.Persist(rows)
	result, err := userDB.Read(minDate, maxDate, exercise)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		HandlerError(w, err, err)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		HandlerError(w, err, errors.New("something went wrong"))
		return
	}

}
