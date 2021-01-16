CREATE TABLE IF NOT EXISTS anime_list (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     year DATE,
     episodes INT,
     is_checked BOOLEAN
);