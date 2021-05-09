package main

import (
	"github.com/mtanzim/vis-strong-go/server"
)

func main() {
	// dbPath := "./test3.db"
	// inputPath := "strong-input.csv"
	// os.Remove(dbPath)
	// rows := csvread.GetDataFromCSV(inputPath)
	// userDB, closeDB := managedb.NewUserDB(dbPath)
	// defer closeDB()
	// userDB.Persist(rows)
	// result := userDB.Read()
	// fmt.Println(result)
	server.Start()

}
