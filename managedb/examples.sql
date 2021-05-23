-- SQLite
SELECT id, date, workoutName, exerciseName, setOrder, weight, weightUnit
FROM strong;

-- All exercise names
select DISTINCT exerciseName from strong;

-- max/min dates
SELECT min(date), max(date) FROM strong;

-- simple date filter
select date, exerciseName, weight, weightUnit, reps from strong
WHERE date > "2021-05-01"
AND date < "2021-05-31"
LIMIT 500;

select date, exerciseName, SUM(weight*reps) as total, weightUnit from strong
WHERE date > "2021-05-01"
AND date < "2021-05-31"
GROUP BY date, exerciseName
LIMIT 500;

-- example aggregagtion
SELECT date, workoutName, exerciseName, MIN(weight) as minWeight, 
MAX(weight) as maxWeight, 
SUM(reps) as totalReps, 
GROUP_CONCAT(weight || weightUnit || " x " || reps, ", ") as eachRep, 
SUM(weight*reps) as totalWeight, 
weightUnit 
from strong
WHERE reps > 0
AND exerciseName LIKE "%Bench%"
GROUP BY date, exerciseName
ORDER BY exerciseName;