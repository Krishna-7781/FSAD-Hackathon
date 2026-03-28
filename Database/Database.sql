CREATE DATABASE vaccination_db;
USE vaccination_db;
CREATE TABLE citizens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  aadhaar VARCHAR(20),
  age INT
);

CREATE TABLE vaccination_centers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  pincode VARCHAR(10)
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  citizen_id INT,
  center_id INT,
  date DATE
);

CREATE TABLE dose_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  citizen_id INT,
  vaccine_name VARCHAR(50),
  dose_number INT
);

CREATE TABLE certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cert_id VARCHAR(100),
  citizen_id INT
);

CREATE TABLE vaccine_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  center_id INT,
  vaccine_name VARCHAR(50),
  total_received INT,
  total_used INT
);
ALTER TABLE vaccination_centers
ADD COLUMN location VARCHAR(100);
INSERT INTO vaccination_centers (name, location) VALUES
('City Hospital', 'Hyderabad'),
('Apollo Clinic', 'Hyderabad'),
('Govt Hospital', 'Secunderabad');
SELECT * FROM vaccination_centers;
SELECT * FROM dose_records;
SELECT * FROM certificates;
DELETE FROM vaccination_centers
WHERE id = 1;
UPDATE vaccination_centers 
SET pincode = '500001' 
WHERE id = 1;

UPDATE vaccination_centers 
SET pincode = '500002' 
WHERE id = 2;

UPDATE vaccination_centers 
SET pincode = '500003' 
WHERE id = 3;

UPDATE vaccination_centers 
SET pincode = '500004' 
WHERE id = 4;
SELECT * FROM vaccination_centers;
SELECT * FROM dose_records;