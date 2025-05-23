package csvread

import (
	"bufio"
	"encoding/csv"
	"errors"
	"io"
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

type CSVResult struct {
	Lines           [][]string
	HeaderPositions map[string]int
}

func checkDelims(file multipart.File, expectedDelim rune, expectedHeaders []string) (*CSVResult, error) {

	file.Seek(0, io.SeekStart)
	reader := csv.NewReader(bufio.NewReader(file))
	reader.LazyQuotes = true
	reader.Comma = expectedDelim
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	csvHeaderPositions := make(map[string]int)
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
	return &CSVResult{Lines: lines, HeaderPositions: csvHeaderPositions}, nil

}

func GetDataFromCSV(file multipart.File) ([]Row, error) {

	expectedHeaders := []string{
		"Workout #",
		"Date",
		"Workout Name",
		"Duration (sec)",
		"Exercise Name",
		"Set Order",
		"Weight (kg)",
		"Reps",
		"RPE",
		"Distance (meters)",
		"Seconds",
		"Notes",
		"Workout Notes",
	}

	expectedDelims := []rune{';', ','}

	var lines [][]string
	var csvHeaderPositions map[string]int
	for _, r := range expectedDelims {
		res, err := checkDelims(file, r, expectedHeaders)
		if err == nil {
			lines = res.Lines
			csvHeaderPositions = res.HeaderPositions
			break
		}
	}

	var rows []Row
	for _, line := range lines {

		var setOrder int64
		if setOrderPos, ok := csvHeaderPositions["Set Order"]; ok {
			setOrder, _ = strconv.ParseInt(line[setOrderPos], 10, 64)
		}

		var weight float64
		if weightPos, ok := csvHeaderPositions["Weight (kg)"]; ok {
			weight, _ = strconv.ParseFloat(line[weightPos], 64)
		}

		var reps int64
		if repsPosition, ok := csvHeaderPositions["Reps"]; ok {
			reps, _ = strconv.ParseInt(line[repsPosition], 10, 64)
		}

		var distance float64
		if distancePos, ok := csvHeaderPositions["Distance (meters)"]; ok {
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

		weightUnit := "kg"
		distanceUnit := "meters"

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
