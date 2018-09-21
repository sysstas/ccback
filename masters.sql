



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



--schedule 
  SELECT 
    orders.ID,
    orders.cityID,
    cities.cityName,
    orders.masterID,
    masters.masterName,
    orders.clientID,
    clients.clientName,
    clients.clientEmail,
    orders.date,
    orders.time,
    orders.duration
  FROM orders
  LEFT JOIN cities 
    ON orders.cityID = cities.ID
  LEFT JOIN masters
    ON orders.masterID = masters.ID
  LEFT JOIN clients
    ON orders.clientID = clients.ID
  WHERE orders.cityID = 4 AND orders.date = 1528664400000
