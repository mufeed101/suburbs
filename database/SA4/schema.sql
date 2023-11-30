CREATE DATABASE IF NOT EXISTS SA4;
USE SA4;

DROP TABLE IF EXISTS income_info;
CREATE TABLE income_info (
    SA4_CODE INT PRIMARY KEY,
    age INT,
    Median_mortgage_monthly INT,
    Median_personal_income INT,
    Median_rent_weekly INT,
    Median_total_household_income INT
);


LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.1/Uploads/2021Census_G02_AUST_SA4.csv" INTO TABLE income_info FIELDS TERMINATED BY ','  ENCLOSED BY '"' LINES TERMINATED BY '\n' (@col1, @col2, @col3, @col4, @col5, @col8) SET SA4_CODE = @col1, age = @col2, Median_mortgage_monthly = @col3, Median_personal_income = @col4, Median_rent_weekly = @col5, Median_total_household_income = @col5;


