package managedb

import (
	"database/sql"
	"log"

	"github.com/mtanzim/vis-strong-go/csvread"
)

type UserDB struct {
	DB *sql.DB
}

func NewUserDB(dbName string) *UserDB {
	db, err := sql.Open("sqlite3", dbName)
	if err != nil {
		log.Fatal(err)
	}
	return &UserDB{db}
}

func (userDB UserDB) CloseDB() {
	userDB.DB.Close()
}

func (userDB UserDB) Persist(rows []csvread.Row) {
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
		log.Println("Inserting row: ", i)
		log.Println(row)
		_, err = stmt.Exec(i, row.Date, row.WorkoutName, row.ExerciseName, row.SetOrder, row.Weight, row.WeightUnit, row.Reps)
		if err != nil {
			log.Fatal(err)
		}
	}
	tx.Commit()
}
