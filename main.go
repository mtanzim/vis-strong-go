package main

import (
	"fmt"
	"os"

	"github.com/mtanzim/vis-strong-go/csvread"
	"github.com/mtanzim/vis-strong-go/managedb"
)

func main() {
	dbPath := "./test3.db"
	inputPath := "strong-input.csv"
	os.Remove(dbPath)
	rows := csvread.GetDataFromCSV(inputPath)
	userDB, closeDB := managedb.NewUserDB(dbPath)
	defer closeDB()
	userDB.Persist(rows)
	result := userDB.Read()
	fmt.Println(result)
}
