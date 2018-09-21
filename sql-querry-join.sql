



  SELECT  m.ID, m.masterName
  FROM masters m   
  
  LEFT JOIN orders o 
	ON m.ID = o.masterID
    -- select all masters who are "new" and did not get any orders yet and also belong to city we need
	WHERE o.masterID is null 
		AND m.cityID = req.cityID
    OR
	-- select masters who works on any day exept choosen
	o.date != req.date
   	OR 
    -- selecting all masters who definetly not busy on choosen time but  works on choosen date date
    (o.date = req.date 
		AND 
			(o.time not BETWEEN req.time AND (req.time+req.duration-1) )
            AND
            (
				(o.time + o.duration -1) not BETWEEN req.time AND (req.time+req.duration-1)
            )            
	)		
GROUP BY m.ID
  ;