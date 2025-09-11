to run front:
cd front
npm install
npm run dev


for bdd:
CREATE TABLE Users (user_id int NOT NULL PRIMARY KEY,
 name varchar(255) NOT NULL, 
 email varchar(255) NOT NULL);

CREATE TABLE Storyboards (storyboard_id int NOT NULL PRIMARY KEY, 
user_id int NOT NULL, 
title varchar(255), 
prompt varchar(255), 
reff_image text, 
FOREIGN KEY (user_id) REFERENCES Users(user_id));

CREATE TABLE Storypoints (storypoint_id int NOT NULL PRIMARY KEY, 
user_id int NOT NULL, 
storyboard_id int NOT NULL,
title varchar(255), 
description text,
image text, 
FOREIGN KEY (user_id) REFERENCES Users(user_id),
FOREIGN KEY (storyboard_id) REFERENCES Storyboards(storyboard_id));