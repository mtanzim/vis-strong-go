package managedb

type ExerciseStats struct {
	ID              int64   `json:"id"`
	Date            string  `json:"date"`
	WorkoutName     string  `json:"workoutName"`
	ExerciseName    string  `json:"exerciseName"`
	SetOrder        int64   `json:"setOrder"`
	MinWeight       float64 `json:"minWeight"`
	MaxWeight       float64 `json:"maxWeight"`
	NumSets         float64 `json:"numSets"`
	TotalWeight     float64 `json:"totalWeight"`
	TotalReps       int64   `json:"totalReps"`
	EachRep         string  `json:"eachRep"`
	WeightUnit      string  `json:"weightUnit"`
	TotalDistance   float64 `json:"totalDistance"`
	DistanceUnit    string  `json:"distanceUnit"`
	TotalSeconds    int64   `json:"totalSeconds"`
	EachRepDuration string  `json:"eachRepDuration"`
}
type ExerciseName struct {
	ExerciseName string `json:"exerciseName"`
}

const lbsPerKg = 2.20462

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
		round(MIN(weight),2) as minWeight, 
		round(MAX(weight),2) as maxWeight,
		COUNT(weight) as numSets,
		SUM(reps) as totalReps, 
		GROUP_CONCAT(round(weight,2) || weightUnit || " x " || reps, ", ") as eachRep, 
		round(SUM(weight*reps),2) as totalWeight, 
		weightUnit,
		round(SUM(distance),2) as totalDistance,
		distanceUnit,
		SUM(seconds) as totalSeconds,
		GROUP_CONCAT(seconds || "s", ", ") as eachRepDuration
		from strong
		WHERE exerciseName LIKE ?
		AND date >= DATE('now', '-24 month')
		GROUP BY date, exerciseName
		ORDER BY exerciseName DESC
		LIMIT 100000;
	`
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
			&resRow.TotalDistance,
			&resRow.DistanceUnit,
			&resRow.TotalSeconds,
			&resRow.EachRepDuration,
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
