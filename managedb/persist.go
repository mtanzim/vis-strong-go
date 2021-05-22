package managedb

import (
	"database/sql"
	"log"

	"github.com/mtanzim/vis-strong-go/csvread"
)

type UserDB struct {
	DB *sql.DB
}

func NewUserDB(dbName string) (*UserDB, func() error) {
	db, err := sql.Open("sqlite3", dbName+"?cache=shared")
	db.SetMaxOpenConns(1)
	if err != nil {
		log.Fatal(err)
	}
	return &UserDB{db}, db.Close
}

func (userDB UserDB) Persist(rows []csvread.Row) error {
	db := userDB.DB

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
	_, err := db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return err
	}
	tx, err := db.Begin()
	if err != nil {
		return err
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
		return err

	}
	defer stmt.Close()
	for i, row := range rows {
		_, err = stmt.Exec(i, row.Date, row.WorkoutName, row.ExerciseName, row.SetOrder, row.Weight, row.WeightUnit, row.Reps)
		if err != nil {
			return err
		}
	}
	tx.Commit()
	return nil
}
