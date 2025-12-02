DROP DATABASE IF EXISTS LP_db;
CREATE DATABASE if NOT EXISTS LP_db CHARACTER SET utf8mb4;

USE LP_db;

CREATE TABLE Department
(
    PK_Department_ID INT AUTO_INCREMENT PRIMARY KEY,
    Description      VARCHAR(255) NOT NULL
);

CREATE TABLE User
(
    PK_User_ID       INT AUTO_INCREMENT PRIMARY KEY,
    Name             VARCHAR(100)        NOT NULL,
    Surname          VARCHAR(100)        NOT NULL,
    Password         VARCHAR(255)        NOT NULL,
    Email            VARCHAR(255) UNIQUE NOT NULL,
    isTutor          BOOLEAN DEFAULT 0,
    FK_Department_ID INT,
    FOREIGN KEY (FK_Department_ID) REFERENCES Department (PK_Department_ID)
);

CREATE TABLE Subject
(
    PK_Subject_ID    INT AUTO_INCREMENT PRIMARY KEY,
    Description      VARCHAR(255) NOT NULL
);

CREATE TABLE Grade
(
    PK_Grade_ID      INT AUTO_INCREMENT PRIMARY KEY,
    Description      VARCHAR(255) NOT NULL
);

CREATE TABLE Booking
(
    PK_Booking_ID    INT AUTO_INCREMENT PRIMARY KEY,
    Date             DATETIME     NOT NULL,
    MeetUp           VARCHAR(255) NOT NULL,
    Description      VARCHAR(255) NOT NULL,
    Notes            VARCHAR(255),
    Hours            INT          NOT NULL,
    FK_User_ID       INT          NOT NULL,
    FK_Subject_ID    INT          NOT NULL,
    FOREIGN KEY (FK_User_ID) REFERENCES User (PK_User_ID),
    FOREIGN KEY (FK_Subject_ID) REFERENCES Subject (PK_Subject_ID)
);

CREATE TABLE offers
(
    FK_PK_User_ID    INT NOT NULL,
    FK_PK_Subject_ID INT NOT NULL,
    Price         DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY (FK_PK_User_ID, FK_PK_Subject_ID),
    FOREIGN KEY (FK_PK_User_ID) REFERENCES User (PK_User_ID),
    FOREIGN KEY (FK_PK_Subject_ID) REFERENCES Subject (PK_Subject_ID)
);

CREATE TABLE contain
(
    FK_PK_Subject_ID INT NOT NULL,
    FK_PK_Grade_ID   INT NOT NULL,
    PRIMARY KEY (FK_PK_Subject_ID, FK_PK_Grade_ID),
    FOREIGN KEY (FK_PK_Subject_ID) REFERENCES Subject (PK_Subject_ID),
    FOREIGN KEY (FK_PK_Grade_ID) REFERENCES Grade (PK_Grade_ID)
);

CREATE TABLE are_in
(
    FK_PK_Subject_ID INT NOT NULL,
    FK_PK_Department_ID   INT NOT NULL,
    PRIMARY KEY (FK_PK_Subject_ID, FK_PK_Department_ID),
    FOREIGN KEY (FK_PK_Subject_ID) REFERENCES Subject (PK_Subject_ID),
    FOREIGN KEY (FK_PK_Department_ID) REFERENCES Department (PK_Department_ID)
);

CREATE TABLE Admin(
    PK_Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255),
    Password VARCHAR(255)
);