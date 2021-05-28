package csvread

import (
	"bufio"
	"encoding/csv"
	"errors"
	"mime/multipart"
	"strconv"

	"github.com/csimplestring/go-csv/detector"
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

func getDelimiter(file multipart.File) []string {
	detector := detector.New()

	delimiters := detector.DetectDelimiter(file, '"')
	return delimiters
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

		setOrder, err := strconv.ParseInt(line[csvHeaderPositions["Set Order"]], 10, 64)
		if err != nil {
			setOrder = 0
		}
		weight, err := strconv.ParseFloat(line[csvHeaderPositions["Weight"]], 64)
		if err != nil {
			weight = 0.0
		}
		reps, err := strconv.ParseInt(line[csvHeaderPositions["Reps"]], 10, 64)
		if err != nil {
			reps = 0
		}
		distance, err := strconv.ParseFloat(line[csvHeaderPositions["Distance"]], 64)
		if err != nil {
			distance = 0.0
		}
		seconds, err := strconv.ParseInt(line[csvHeaderPositions["Seconds"]], 10, 64)
		if err != nil {
			seconds = 0.0
		}
		date := line[csvHeaderPositions["Date"]]

		row := Row{
			Date:         date,
			WorkoutName:  line[csvHeaderPositions["Workout Name"]],
			ExerciseName: line[csvHeaderPositions["Exercise Name"]],
			SetOrder:     setOrder,
			Weight:       weight,
			WeightUnit:   line[csvHeaderPositions["Weight Unit"]],
			Reps:         reps,
			Distance:     distance,
			DistanceUnit: line[csvHeaderPositions["Distance Unit"]],
			Seconds:      seconds,
		}
		rows = append(rows, row)
	}
	return rows, nil
}
