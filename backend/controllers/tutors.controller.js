const db = require("../db");

/**
 * GET /api/tutors
 * Tutoren + ihre Fächer
 */
exports.getAllTutors = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT
        t.PK_Tutor_ID AS tutorId,
        t.Name AS name,
        t.Surname AS surname,
        t.Grade AS grade,
        t.PricePerHour AS pricePerHour,
        s.PK_Subject_ID AS subjectId,
        s.Description AS subject
      FROM Tutor t
      LEFT JOIN offer o ON o.FK_PK_Tutor_ID = t.PK_Tutor_ID
      LEFT JOIN Subject s ON s.PK_Subject_ID = o.FK_PK_Subject_ID
      ORDER BY t.PK_Tutor_ID
      `
    );

    const tutorsMap = new Map();

    for (const row of rows) {
      if (!tutorsMap.has(row.tutorId)) {
        tutorsMap.set(row.tutorId, {
          id: row.tutorId,
          name: row.name,
          surname: row.surname,
          grade: row.grade,
          pricePerHour: row.pricePerHour,
          subjects: [],
        });
      }

      if (row.subjectId) {
        tutorsMap.get(row.tutorId).subjects.push({
          id: row.subjectId,
          description: row.subject,
        });
      }
    }

    res.json(Array.from(tutorsMap.values()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load tutors" });
  }
};

exports.getRecommendedTutors = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const [rows] = await db.query(
      `
      SELECT
        t.PK_Tutor_ID AS tutorId,
        t.Name AS name,
        t.Surname AS surname,
        t.Grade AS grade,
        t.PricePerHour AS pricePerHour,
        s.PK_Subject_ID AS subjectId,
        s.Description AS subject
      FROM Tutor t
      JOIN offer o ON o.FK_PK_Tutor_ID = t.PK_Tutor_ID
      JOIN need n ON n.FK_PK_Subject_ID = o.FK_PK_Subject_ID
      JOIN Student st ON st.PK_Student_ID = n.FK_PK_Student_ID
      JOIN Subject s ON s.PK_Subject_ID = o.FK_PK_Subject_ID
      WHERE st.PK_Student_ID = ?
        AND t.Grade >= st.Grade
      ORDER BY t.PK_Tutor_ID
      `,
      [studentId]
    );

    // Tutoren zusammenfassen (mehrere Fächer pro Tutor)
    const tutorsMap = new Map();

    for (const row of rows) {
      if (!tutorsMap.has(row.tutorId)) {
        tutorsMap.set(row.tutorId, {
          id: row.tutorId,
          name: row.name,
          surname: row.surname,
          grade: row.grade,
          pricePerHour: row.pricePerHour,
          subjects: [],
        });
      }

      tutorsMap.get(row.tutorId).subjects.push({
        id: row.subjectId,
        description: row.subject,
      });
    }

    res.json(Array.from(tutorsMap.values()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load recommended tutors" });
  }
};
