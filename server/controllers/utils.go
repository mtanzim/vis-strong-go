package controllers

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"
)

func HandlerError(w http.ResponseWriter, actualErr error, resErr error) {
	log.Println(actualErr)
	errorRv := struct {
		Error string `json:"error"`
	}{resErr.Error()}
	if err := json.NewEncoder(w).Encode(errorRv); err != nil {
		log.Println(err)
		return
	}
}

func ValidateQueryDate(start, end string) error {
	dateLayout := "2006-01-02"
	timeStart, err := time.Parse(dateLayout, start)
	if err != nil {
		return errors.New("invalid start date")
	}

	timeEnd, err := time.Parse(dateLayout, end)
	if err != nil {
		return errors.New("invalid end date")
	}

	if timeEnd.Before(timeStart) {
		return errors.New("end date is before start date")
	}

	return nil
}
