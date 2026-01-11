const db = require("../db");
const bcrypt = require("bcrypt");

exports.registerStudent = async (req, res) => {
  const { name, surname, email, password, grade } = req.body;

  if (!name || !surname || !email || !password || !grade) {
    return res.status(400).json({ message: "Fehlende Felder" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO Student (Name, Surname, Email, Password, Grade)
       VALUES (?, ?, ?, ?, ?)`,
      [name, surname, email, hashedPassword, grade]
    );

    res.status(201).json({ message: "Student registriert" });
  } catch (err) {
    res.status(500).json({ message: "E-Mail existiert bereits?" });
  }
};

exports.registerTutor = async (req, res) => {
  const { name, surname, email, password, grade, pricePerHour } = req.body;

  if (!name || !surname || !email || !password || !grade) {
    return res.status(400).json({ message: "Fehlende Felder" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO Tutor (Name, Surname, Email, Password, Grade, PricePerHour)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, surname, email, hashedPassword, grade, pricePerHour || null]
    );

    res.status(201).json({ message: "Tutor registriert" });
  } catch (err) {
    res.status(500).json({ message: "E-Mail existiert bereits?" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [students] = await db.query(
    "SELECT * FROM Student WHERE Email = ?",
    [email]
  );

  const [tutors] = await db.query(
    "SELECT * FROM Tutor WHERE Email = ?",
    [email]
  );

  const user = students[0] || tutors[0];
  const role = students[0] ? "student" : tutors[0] ? "tutor" : null;

  if (!user) {
    return res.status(401).json({ message: "Ungültige Login-Daten" });
  }

  const valid = await bcrypt.compare(password, user.Password);
  if (!valid) {
    return res.status(401).json({ message: "Ungültige Login-Daten" });
  }

  req.session.user = {
    id: user.PK_Student_ID || user.PK_Tutor_ID,
    role,
  };

  res.json({ message: "Login erfolgreich", role });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout erfolgreich" });
  });
};

exports.me = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Nicht eingeloggt" });
  }
  res.json(req.session.user);
};