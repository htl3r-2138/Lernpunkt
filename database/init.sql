USE LP_db;

CREATE TABLE
    Tutor (
        PK_Tutor_ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Surname VARCHAR(100) NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(255) UNIQUE NOT NULL,
        Grade INT NOT NULL,
        CHECK (Grade BETWEEN 1 AND 5),
        PricePerHour DECIMAL(4, 2)
    );

CREATE TABLE
    Student (
        PK_Student_ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Surname VARCHAR(100) NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(255) UNIQUE NOT NULL,
        Grade INT NOT NULL,
        CHECK (Grade BETWEEN 1 AND 5)
    );

CREATE TABLE
    Subject (
        PK_Subject_ID INT AUTO_INCREMENT PRIMARY KEY,
        Description VARCHAR(255) NOT NULL
    );

CREATE TABLE
    Booking (
        PK_Booking_ID INT AUTO_INCREMENT PRIMARY KEY,
        Date DATE NOT NULL,
        Start TIME NOT NULL,
        End TIME NOT NULL,
        MeetUp VARCHAR(255) NOT NULL,
        Description VARCHAR(255) NOT NULL,
        Notes VARCHAR(255),
        isAccepted BOOLEAN,
        isDone BOOLEAN,
        Stars INT,
        CHECK (Stars BETWEEN 1 AND 5),
        FK_PK_Student_ID INT,
        FOREIGN KEY (FK_PK_Student_ID) REFERENCES Student (PK_Student_ID)
    );

CREATE TABLE
    contain (
        FK_PK_Booking_ID INT NOT NULL,
        FK_PK_Subject_ID INT NOT NULL,
        PRIMARY KEY (FK_PK_Booking_ID, FK_PK_Subject_ID),
        FOREIGN KEY (FK_PK_Booking_ID) REFERENCES Booking (PK_Booking_ID),
        FOREIGN KEY (FK_PK_Subject_ID) REFERENCES Subject (PK_Subject_ID)
    );

CREATE TABLE
    need (
        FK_PK_Student_ID INT NOT NULL,
        FK_PK_Subject_ID INT NOT NULL,
        PRIMARY KEY (FK_PK_Student_ID, FK_PK_Subject_ID),
        FOREIGN KEY (FK_PK_Student_ID) REFERENCES Student (PK_Student_ID),
        FOREIGN KEY (FK_PK_Subject_ID) REFERENCES Subject (PK_Subject_ID)
    );

CREATE TABLE
    offer (
        FK_PK_Tutor_ID INT NOT NULL,
        FK_PK_Subject_ID INT NOT NULL,
        PRIMARY KEY (FK_PK_Tutor_ID, FK_PK_Subject_ID),
        FOREIGN KEY (FK_PK_Tutor_ID) REFERENCES Tutor (PK_Tutor_ID),
        FOREIGN KEY (FK_PK_Subject_ID) REFERENCES Subject (PK_Subject_ID)
    );

CREATE TABLE
    is_in (
        FK_PK_Tutor_ID INT NOT NULL,
        FK_PK_Booking_ID INT NOT NULL,
        PRIMARY KEY (FK_PK_Tutor_ID, FK_PK_Booking_ID),
        FOREIGN KEY (FK_PK_Tutor_ID) REFERENCES Tutor (PK_Tutor_ID),
        FOREIGN KEY (FK_PK_Booking_ID) REFERENCES Booking (PK_Booking_ID)
    );

CREATE TABLE
    Admin (
        PK_Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
        Username VARCHAR(255) NOT NULL,
        Password VARCHAR(255) NOT NULL
    );

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (1, 'SEW');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (2, 'NWT');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (3, 'ITP');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (4, 'GINF');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (5, 'AM');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (6, 'DE');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (7, 'E');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (8, 'WEBT');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (9, 'INSI');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (10, 'GETE');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (11, 'BS');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (12, 'PH');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (13, 'CH');

INSERT INTO
    Subject (PK_Subject_ID, Description)
VALUES
    (14, 'GP');