const db = require("../db");

/**
 * POST /api/bookings
 * Student erstellt ein Booking
 */
exports.createBooking = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "student") {
    return res.status(403).json({ message: "Only students can book tutors" });
  }

  const {
    tutorId,
    subjectId,
    date,
    startTime,
    endTime,
    location,
    topic,
  } = req.body;

  if (!tutorId || !subjectId || !date || !startTime || !endTime || !location) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `
      INSERT INTO Booking
        (Date, Start, End, MeetUp, Description, FK_PK_Student_ID)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [date, startTime, endTime, location, topic || "", user.id]
    );

    const bookingId = result.insertId;

    await conn.query(
      `INSERT INTO contain (FK_PK_Booking_ID, FK_PK_Subject_ID)
       VALUES (?, ?)`,
      [bookingId, subjectId]
    );

    await conn.query(
      `INSERT INTO is_in (FK_PK_Tutor_ID, FK_PK_Booking_ID)
       VALUES (?, ?)`,
      [tutorId, bookingId]
    );

    await conn.commit();

    res.status(201).json({ message: "Booking created", bookingId });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: "Booking failed" });
  } finally {
    conn.release();
  }
};

/**
 * GET /api/bookings/me
 * Student sieht seine Bookings
 */
exports.getMyBookings = async (req, res) => {
  if (!req.session.user || req.session.user.role !== "student") {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const studentId = req.session.user.id;

  const [rows] = await db.query(`
    SELECT
      b.PK_Booking_ID AS id,
      b.Date,
      b.Start,
      b.End,
      b.MeetUp,
      b.Description,
      b.isAccepted,

      t.PK_Tutor_ID AS tutorId,
      t.Name,
      t.Surname,
      t.PricePerHour
    FROM Booking b
    JOIN is_in ii ON ii.FK_PK_Booking_ID = b.PK_Booking_ID
    JOIN Tutor t ON t.PK_Tutor_ID = ii.FK_PK_Tutor_ID
    WHERE b.FK_PK_Student_ID = ?
  `, [studentId]);

  res.json(rows);
};
