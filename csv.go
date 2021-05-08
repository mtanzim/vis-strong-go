package main

import (
	"bufio"
	"database/sql"
	"encoding/csv"
	"fmt"
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

func GetDataFromCSV(filename string) []Row {
	lines, err := ReadCsv(filename)
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
		// fmt.Println(row)
	}
	return rows
}

func Persist(rows []Row) {
	// db, err := sql.Open("sqlite3", ":memory")
	fmt.Println(rows)

	db, err := sql.Open("sqlite3", "./test.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	sqlStmt := `
	create table strong (
		id INTEGER NOT NULL PRIMARY KEY,
		date DATE,
		workoutName TEXT,
		exerciseName TEXT,
		setOrder INT,
		weight FLOAT,
		weightUnit TEXT,
		reps INT
	);
	`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}
	tx, err := db.Begin()
	if err != nil {
		log.Fatal(err)
	}
	stmt, err := tx.Prepare(`
	INSERT INTO strong (id,
		date,
		workoutName,
		exerciseName,
		setOrder,
		weight,
		weightUnit,
		reps
	)
	VALUES (?,?,?,?,?,?,?,?)
	`)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	for i, row := range rows {
		_, err = stmt.Exec(i, row.Date, row.WorkoutName, row.ExerciseName, row.SetOrder, row.Weight, row.WeightUnit, row.Reps)
		if err != nil {
			log.Fatal(err)
		}
	}
	tx.Commit()
}

func main() {
	rows := GetDataFromCSV("strong-input.csv")
	Persist(rows)

}
