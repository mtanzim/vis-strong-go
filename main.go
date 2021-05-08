package main

import (
	"os"

	"github.com/mtanzim/vis-strong-go/csvread"
	"github.com/mtanzim/vis-strong-go/managedb"
)

func main() {
	dbPath := "./test3.db"
	os.Remove(dbPath)
	rows := csvread.GetDataFromCSV("strong-input.csv")
	userDB := managedb.NewUserDB(dbPath)
	defer userDB.CloseDB()
	userDB.Persist(rows)
}
