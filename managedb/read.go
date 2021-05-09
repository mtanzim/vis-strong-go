package managedb

type QueryResult struct {
	ID           int64   `json:"id"`
	Date         string  `json:"date"`
	WorkoutName  string  `json:"workoutName"`
	ExerciseName string  `json:"exerciseName"`
	SetOrder     int64   `json:"setOrder"`
	MinWeight    float64 `json:"minWeight"`
	MaxWeight    float64 `json:"maxWeight"`
	TotalWeight  float64 `json:"totalWeight"`
	TotalReps    int64   `json:"totalReps"`
	EachRep      string  `json:"eachRep"`
	WeightUnit   string  `json:"weightUnit"`
}

func (userDB UserDB) Read(minDate, maxDate, excName string) ([]QueryResult, error) {
	db := userDB.DB
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
		AND exerciseName LIKE ?
		AND reps > 0
		GROUP BY date, exerciseName
		ORDER BY exerciseName
		LIMIT 500;
	`
	rows, err := db.Query(sqlStmt, minDate, maxDate, "%"+excName+"%")
	if err != nil {
		return nil, err
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
