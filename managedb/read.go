package managedb

type ExerciseStats struct {
	ID           int64   `json:"id"`
	Date         string  `json:"date"`
	WorkoutName  string  `json:"workoutName"`
	ExerciseName string  `json:"exerciseName"`
	SetOrder     int64   `json:"setOrder"`
	MinWeight    float64 `json:"minWeight"`
	MaxWeight    float64 `json:"maxWeight"`
	NumSets      float64 `json:"numSets"`
	TotalWeight  float64 `json:"totalWeight"`
	TotalReps    int64   `json:"totalReps"`
	EachRep      string  `json:"eachRep"`
	WeightUnit   string  `json:"weightUnit"`
}
type ExerciseName struct {
	ExerciseName string `json:"exerciseName"`
}

// const lbsPerKg = 2.20462

func (userDB UserDB) ReadExerciseNames() ([]ExerciseName, error) {
	db := userDB.DB
	sqlStmt := `
	select DISTINCT exerciseName from strong;
	`
	rows, err := db.Query(sqlStmt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	resRows := []ExerciseName{}
	for rows.Next() {
		resRow := ExerciseName{}
		err := rows.Scan(
			&resRow.ExerciseName,
		)
		if err != nil {
			return nil, err
		}
		resRows = append(resRows, resRow)

	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return resRows, nil

}

func (userDB UserDB) ReadExerciseStats(excName string) ([]ExerciseStats, error) {
	db := userDB.DB
	sqlStmt := `
		SELECT 
		id, 
		date, 
		workoutName,
		exerciseName,
		MIN(weight) as minWeight, 
		MAX(weight) as maxWeight,
		COUNT(weight) as numSets,
		SUM(reps) as totalReps, 
		GROUP_CONCAT(weight || weightUnit || " x " || reps, ", ") as eachRep, 
		SUM(weight*reps) as totalWeight, 
		weightUnit 
		from strong
		-- WHERE date > ?
		-- AND date < ?
		WHERE reps > 0
		AND exerciseName LIKE ?
		GROUP BY date, exerciseName
		ORDER BY exerciseName
		LIMIT 5000;
	`
	// rows, err := db.Query(sqlStmt, minDate, maxDate, "%"+excName+"%")
	rows, err := db.Query(sqlStmt, "%"+excName+"%")

	if err != nil {
		return nil, err
	}
	defer rows.Close()
	resRows := []ExerciseStats{}
	for rows.Next() {
		resRow := ExerciseStats{}
		err = rows.Scan(
			&resRow.ID,
			&resRow.Date,
			&resRow.WorkoutName,
			&resRow.ExerciseName,
			&resRow.MinWeight,
			&resRow.MaxWeight,
			&resRow.NumSets,
			&resRow.TotalReps,
			&resRow.EachRep,
			&resRow.TotalWeight,
			&resRow.WeightUnit,
		)
		if err != nil {
			return nil, err
		}
		// convert lbs to kg
		// if resRow.WeightUnit == "lbs" {
		// 	resRow.MaxWeight = resRow.MaxWeight / lbsPerKg
		// 	resRow.MinWeight = resRow.MaxWeight / lbsPerKg
		// 	resRow.TotalWeight = resRow.MaxWeight / lbsPerKg
		// 	resRow.WeightUnit = "kg"
		// }
		resRows = append(resRows, resRow)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return resRows, nil
}
