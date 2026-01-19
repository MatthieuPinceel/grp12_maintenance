CREATE USER 'miniuser'@'localhost' IDENTIFIED BY 'r606maintenance';

CREATE DATABASE maintenance CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

GRANT ALL PRIVILEGES ON maintenance.* TO 'miniuser'@'localhost';
FLUSH PRIVILEGES;



CREATE TABLE UserTable (
    userID INT AUTO_INCREMENT,
    userName VARCHAR(50) NOT NULL,
    userPWD VARCHAR(255) NOT NULL,
    PRIMARY KEY (userID)
);

CREATE TABLE TagsTable (
    tagID INT AUTO_INCREMENT,
    tagName VARCHAR(30) NOT NULL,
    PRIMARY KEY (tagID)
);


CREATE TABLE ItemTable (
    itemID INT AUTO_INCREMENT,
    itemImg VARCHAR(100),
    itemDescription VARCHAR(255),
    tagID INT,
    userID INT,
    PRIMARY KEY (itemID),
    FOREIGN KEY (tagID) REFERENCES TagsTable(tagID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES UserTable(userID) ON DELETE CASCADE
);


-- Insérer un utilisateur
INSERT INTO UserTable (userName, userPWD) VALUES ('Stolas', 'blitzoo');

-- Insérer les tags
INSERT INTO TagsTable (tagName) VALUES ('Owl 1');
INSERT INTO TagsTable (tagName) VALUES ('Owl 2');
INSERT INTO TagsTable (tagName) VALUES ('Owl 3');

-- Insérer les photos
-- Owl 1
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G-jv7WCbQAEgbvU.jpg', 'Owl picture', 1, 1);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G-juTqxakAAJ4b8.jpg', 'Owl picture', 1, 1);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G-rGDsWbQAQUh3n.jpg', 'Owl picture', 1, 1);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G8hUlTuacAA5EOn.jpg', 'Owl picture', 1, 1);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G9cyErWbcAAkxXU.jpg', 'Owl picture', 1, 1);

-- Owl 2
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G-ow-qjWkAACIXv.jpg', 'Owl picture', 1, 2);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G-jVfmPbQAE7NS3.jpg', 'Owl picture', 1, 2);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G7_z9KCagAg2svG.jpg', 'Owl picture', 1, 2);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G8ToRBubkAArdin.jpg', 'Owl picture', 1, 2);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G9ZjT1UaYAMk8I0.jpg', 'Owl picture', 1, 2);

-- Owl 3
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G-qGG6Na0AAAg9z.jpg', 'Owl picture', 1, 3);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G-lZYVabQAISDKD.jpg', 'Owl picture', 1, 3);
INSERT INTO ItemTable (itemImg, itemDescription, userID, tagID) VALUES ('/Images/Home/G7QymbsbcAAQXeF.jpg', 'Owl picture', 1, 3);
