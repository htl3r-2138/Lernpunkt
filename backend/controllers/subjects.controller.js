const db = require("../db");

exports.getAllSubjects = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM Subject");
  res.json(rows);
};

exports.getMySubjects = async (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  let query;
  if (user.role === "student") {
    query = `
      SELECT s.PK_Subject_ID, s.Description
      FROM need n
      JOIN Subject s ON s.PK_Subject_ID = n.FK_PK_Subject_ID
      WHERE n.FK_PK_Student_ID = ?
    `;
  } else {
    query = `
      SELECT s.PK_Subject_ID, s.Description
      FROM offer o
      JOIN Subject s ON s.PK_Subject_ID = o.FK_PK_Subject_ID
      WHERE o.FK_PK_Tutor_ID = ?
    `;
  }

  const [rows] = await db.query(query, [user.id]);
  res.json(rows);
};

exports.saveMySubjects = async (req, res) => {
  const user = req.session.user;
  const { subjectIds } = req.body;

  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const table = user.role === "student" ? "need" : "offer";
  const userField =
    user.role === "student" ? "FK_PK_Student_ID" : "FK_PK_Tutor_ID";

  await db.query(`DELETE FROM ${table} WHERE ${userField} = ?`, [user.id]);

  for (const id of subjectIds) {
    await db.query(
      `INSERT INTO ${table} (${userField}, FK_PK_Subject_ID) VALUES (?, ?)`,
      [user.id, id]
    );
  }

  res.json({ message: "Subjects saved" });
};
