package csvread

import (
	"bufio"
	"encoding/csv"
	"errors"
	"mime/multipart"
	"strconv"

	_ "github.com/mattn/go-sqlite3"
)

// only weighted exercises for now
type Row struct {
	Date         string
	WorkoutName  string
	ExerciseName string
	SetOrder     int64
	Weight       float64
	WeightUnit   string
	Reps         int64
	Distance     float64
	DistanceUnit string
	Seconds      int64
}

func GetDataFromCSV(file multipart.File) ([]Row, error) {

	reader := csv.NewReader(bufio.NewReader(file))
	reader.LazyQuotes = true

	csvHeaderPositions := make(map[string]int)
	expectedHeaders := []string{
		"Date",
		"Workout Name",
		"Exercise Name",
		"Set Order",
		"Weight",
		"Reps",
		"Distance",
		"Seconds",
	}

	reader.Comma = ','
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	for i, token := range header {
		if token != "" {
			csvHeaderPositions[token] = i
		}
	}

	for _, expectedToken := range expectedHeaders {
		if _, ok := csvHeaderPositions[expectedToken]; !ok {
			return nil, errors.New("unable to parse csv")
		}
	}

	lines, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	var rows []Row
	for _, line := range lines {

		var setOrder int64
		if setOrderPos, ok := csvHeaderPositions["Set Order"]; ok {
			setOrder, _ = strconv.ParseInt(line[setOrderPos], 10, 64)
		}

		var weight float64
		if weightPos, ok := csvHeaderPositions["Weight"]; ok {
			weight, _ = strconv.ParseFloat(line[weightPos], 64)
		}

		var reps int64
		if repsPosition, ok := csvHeaderPositions["Reps"]; ok {
			reps, _ = strconv.ParseInt(line[repsPosition], 10, 64)
		}

		var distance float64
		if distancePos, ok := csvHeaderPositions["Distance"]; ok {
			distance, _ = strconv.ParseFloat(line[distancePos], 64)

		}

		var seconds int64
		if secondsPos, ok := csvHeaderPositions["Seconds"]; ok {
			seconds, _ = strconv.ParseInt(line[secondsPos], 10, 64)

		}

		var date string
		if datePos, ok := csvHeaderPositions["Date"]; ok {
			date = line[datePos]
		}

		var workoutName string
		if workoutNamePos, ok := csvHeaderPositions["Workout Name"]; ok {
			workoutName = line[workoutNamePos]
		}

		var excName string
		if excNamePos, ok := csvHeaderPositions["Exercise Name"]; ok {
			excName = line[excNamePos]
		}

		// TODO: fix full stack treatment of default units
		weightUnit := "lbs"
		if weightUnitPos, ok := csvHeaderPositions["Weight Unit"]; ok {
			weightUnit = line[weightUnitPos]
		}

		distanceUnit := "mi"
		if distanceUnitPos, ok := csvHeaderPositions["Distance Unit"]; ok {
			distanceUnit = line[distanceUnitPos]
		}

		row := Row{
			Date:         date,
			WorkoutName:  workoutName,
			ExerciseName: excName,
			SetOrder:     setOrder,
			Weight:       weight,
			WeightUnit:   weightUnit,
			Reps:         reps,
			Distance:     distance,
			DistanceUnit: distanceUnit,
			Seconds:      seconds,
		}
		rows = append(rows, row)
	}
	return rows, nil
}
