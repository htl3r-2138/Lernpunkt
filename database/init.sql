DROP DATABASE IF EXISTS LP_db;
CREATE DATABASE if NOT EXISTS LP_db CHARACTER SET utf8mb4;

USE LP_db;

CREATE TABLE Tutor
(
    PK_Tutor_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name        VARCHAR(100)        NOT NULL,
    Surname     VARCHAR(100)        NOT NULL,
    Password    VARCHAR(255)        NOT NULL,
    Email       VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Student
(
    PK_Student_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name          VARCHAR(100)        NOT NULL,
    Surname       VARCHAR(100)        NOT NULL,
    Password      VARCHAR(255)        NOT NULL,
    Email         VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Subject
(
    PK_Subject_ID INT AUTO_INCREMENT PRIMARY KEY,
    Description   VARCHAR(255) NOT NULL,
    Grade         INT          NOT NULL
);

CREATE TABLE Booking
(
    PK_Booking_ID    INT AUTO_INCREMENT PRIMARY KEY,
    Date             DATETIME     NOT NULL,
    MeetUp           VARCHAR(255) NOT NULL,
    Description      VARCHAR(255) NOT NULL,
    Notes            VARCHAR(255),
    Hours            INT          NOT NULL,
    FK_PK_Student_ID INT,
    FOREIGN KEY (FK_PK_Student_ID) REFERENCES Student (PK_Student_ID
                                                      )
);

CREATE TABLE contain
(
    FK_PK_Booking_ID INT NOT NULL,
    FK_PK_Subject_ID INT NOT NULL,
    Price            DECIMAL(5, 2),
    PRIMARY KEY (FK_PK_Booking_ID, FK_PK_Subject_ID),
    FOREIGN KEY (FK_PK_Booking_ID) REFERENCES Booking (PK_Booking_ID),
    FOREIGN KEY (FK_PK_Subject_ID) REFERENCES Subject (PK_Subject_ID)
);


CREATE TABLE offer
(
    FK_PK_Tutor_ID   INT NOT NULL,
    FK_PK_Subject_ID INT NOT NULL,
    PRIMARY KEY (FK_PK_Tutor_ID, FK_PK_Subject_ID),
    FOREIGN KEY (FK_PK_Tutor_ID) REFERENCES Tutor (PK_Tutor_ID),
    FOREIGN KEY (FK_PK_Subject_ID) REFERENCES Subject (PK_Subject_ID)
);


CREATE TABLE Admin
(
    PK_Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username    VARCHAR(255) NOT NULL,
    Password    VARCHAR(255) NOT NULL
);