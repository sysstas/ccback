



SELECT  m.ID, m.masterName 
FROM masters m
WHERE m.cityID = 4 
AND  m.ID, m.masterName  NOT IN (
  SELECT DISTINCT m.ID, m.masterName
  FROM masters m
  LEFT JOIN orders o ON o.masterID = m.ID
  WHERE m.cityID = 4
  AND 
      (
          (o.date = 2147483647)
          AND
          (
            (11 BETWEEN o.time AND (o.time+o.duration-1))
            OR 
            (13 BETWEEN o.time AND (o.time+o.duration-1))
          )
  )
);

