package managedb

import (
	"log"
)

type QueryResult struct {
	ID           int64
	Date         string
	WorkoutName  string
	ExerciseName string
	SetOrder     int64
	MinWeight    float64
	MaxWeight    float64
	TotalWeight  float64
	TotalReps    int64
	EachRep      string
	WeightUnit   string
}

func (userDB UserDB) Read() []QueryResult {
	db := userDB.DB
	minDate := "2021-03-01"
	maxDate := "2021-04-30"
	sqlStmt := `
		SELECT 
		id, 
		date, 
		workoutName,
		exerciseName,
		MIN(weight) as minWeight, 
		MAX(weight) as maxWeight, 
		SUM(reps) as totalReps, 
		GROUP_CONCAT(weight || weightUnit || " x " || reps, ", ") as eachRep, 
		SUM(weight*reps) as totalWeight, 
		weightUnit 
		from strong
		WHERE date > ?
		AND date < ?
		GROUP BY date, exerciseName
		ORDER BY exerciseName
		LIMIT 500;
	
	`
	rows, err := db.Query(sqlStmt, minDate, maxDate)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	resRows := []QueryResult{}
	for rows.Next() {
		resRow := QueryResult{}
		err = rows.Scan(
			&resRow.ID,
			&resRow.Date,
			&resRow.WorkoutName,
			&resRow.ExerciseName,
			&resRow.MinWeight,
			&resRow.MaxWeight,
			&resRow.TotalReps,
			&resRow.EachRep,
			&resRow.TotalWeight,
			&resRow.WeightUnit,
		)
		if err != nil {
			log.Fatal(err)
		}
		resRows = append(resRows, resRow)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	return resRows
}
