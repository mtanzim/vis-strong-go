package csvread

import (
	"bufio"
	"encoding/csv"
	"log"
	"os"
	"strconv"
	"strings"

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
}

func readCsv(filename string) ([][]string, error) {

	// Open CSV file
	f, err := os.Open(filename)
	if err != nil {
		return [][]string{}, err
	}
	defer f.Close()

	// Read File into a Variable
	reader := csv.NewReader(bufio.NewReader(f))
	reader.Comma = ';'
	reader.LazyQuotes = true

	lines, err := reader.ReadAll()
	if err != nil {
		log.Println(err)
		return [][]string{}, err
	}

	return lines, nil
}

func GetDataFromCSV(filename string) []Row {
	lines, err := readCsv(filename)
	if err != nil {
		panic(err)
	}
	var rows []Row
	for i, line := range lines {
		// skip the header
		if i == 0 {
			continue
		}
		setOrder, err := strconv.ParseInt(line[3], 10, 64)
		if err != nil {
			setOrder = 0
		}
		reps, err := strconv.ParseInt(line[6], 10, 64)
		if err != nil {
			reps = 0
		}
		weight, err := strconv.ParseFloat(line[4], 64)
		if err != nil {
			weight = 0.0
		}
		date := strings.Split(line[0], " ")[0]
		row := Row{
			Date:         date,
			WorkoutName:  line[1],
			ExerciseName: line[2],
			SetOrder:     setOrder,
			Weight:       weight,
			WeightUnit:   line[5],
			Reps:         reps,
		}
		rows = append(rows, row)
	}
	return rows
}
