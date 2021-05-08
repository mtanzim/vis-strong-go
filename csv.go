package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strconv"
)

// only weighted exercises for now
type Row struct {
	Date         string
	WorkoutName  string
	ExerciseName string
	SetOrder     int64
	Weight       float64
	WeightUnit   string
	Reps         int32
}

func ReadCsv(filename string) ([][]string, error) {

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

func main() {
	fmt.Println("Hello, world.")
	lines, err := ReadCsv("strong.csv")
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
		weight, err := strconv.ParseFloat(line[4], 64)
		if err != nil {
			weight = 0.0
		}
		row := Row{
			Date:         line[0],
			WorkoutName:  line[1],
			ExerciseName: line[2],
			SetOrder:     setOrder,
			Weight:       weight,
			WeightUnit:   line[5],
		}
		rows = append(rows, row)
		// fmt.Println(row)
	}
	fmt.Println(rows)
}
