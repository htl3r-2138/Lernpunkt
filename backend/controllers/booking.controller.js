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
      b.Description AS topic,
      b.isAccepted,

      t.PK_Tutor_ID AS tutorId,
      t.Name,
      t.Surname,
      t.PricePerHour,
      t.Grade AS tutorGrade,

      sub.Description AS subject
    FROM Booking b
    JOIN is_in ii ON ii.FK_PK_Booking_ID = b.PK_Booking_ID
    JOIN Tutor t ON t.PK_Tutor_ID = ii.FK_PK_Tutor_ID
    JOIN contain c ON c.FK_PK_Booking_ID = b.PK_Booking_ID
    JOIN Subject sub ON sub.PK_Subject_ID = c.FK_PK_Subject_ID
    WHERE b.FK_PK_Student_ID = ?
  `, [studentId]);

  res.json(rows);
};

exports.getTutorBookings = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "tutor") {
    return res.status(403).json({ message: "Only tutors allowed" });
  }

  const [rows] = await db.query(`
    SELECT
      b.PK_Booking_ID AS id,
      b.Date,
      b.Start,
      b.End,
      b.MeetUp,
      b.Description AS topic,
      b.isAccepted,

      s.Name AS studentName,
      s.Email AS studentEmail,

      sub.Description AS subject
    FROM Booking b
    JOIN is_in ii ON ii.FK_PK_Booking_ID = b.PK_Booking_ID
    JOIN Student s ON s.PK_Student_ID = b.FK_PK_Student_ID
    JOIN contain c ON c.FK_PK_Booking_ID = b.PK_Booking_ID
    JOIN Subject sub ON sub.PK_Subject_ID = c.FK_PK_Subject_ID
    WHERE ii.FK_PK_Tutor_ID = ?
    ORDER BY b.Date
  `, [user.id]);

  res.json(rows);
};

exports.acceptBooking = async (req, res) => {
  const user = req.session.user;
  const bookingId = req.params.id;

  if (!user || user.role !== "tutor") {
    return res.status(403).json({ message: "Only tutors allowed" });
  }

  await db.query(`
    UPDATE Booking
    SET isAccepted = 1
    WHERE PK_Booking_ID = ?
  `, [bookingId]);

  res.json({ message: "Booking accepted" });
};

/**
 * DELETE /api/bookings/:id
 * Student cancelt seine eigene Buchung
 */
exports.cancelBooking = async (req, res) => {
  const user = req.session.user;
  const bookingId = req.params.id;

  if (!user || user.role !== "student") {
    return res.status(403).json({ message: "Only students can cancel bookings" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 🔐 Sicherheitscheck: gehört die Buchung dem Student?
    const [rows] = await conn.query(
      `
      SELECT PK_Booking_ID
      FROM Booking
      WHERE PK_Booking_ID = ?
        AND FK_PK_Student_ID = ?
      `,
      [bookingId, user.id]
    );

    if (rows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🔥 Reihenfolge wichtig wegen Foreign Keys
    await conn.query(
      `DELETE FROM contain WHERE FK_PK_Booking_ID = ?`,
      [bookingId]
    );

    await conn.query(
      `DELETE FROM is_in WHERE FK_PK_Booking_ID = ?`,
      [bookingId]
    );

    await conn.query(
      `DELETE FROM Booking WHERE PK_Booking_ID = ?`,
      [bookingId]
    );

    await conn.commit();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: "Cancel booking failed" });
  } finally {
    conn.release();
  }
};

exports.cancelBookingAsTutor = async (req, res) => {
  const user = req.session.user;
  const bookingId = req.params.id;

  if (!user || user.role !== "tutor") {
    return res.status(403).json({ message: "Only tutors can cancel bookings" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 🔐 Check: gehört die Buchung diesem Tutor?
    const [rows] = await conn.query(
      `
      SELECT FK_PK_Booking_ID
      FROM is_in
      WHERE FK_PK_Booking_ID = ?
        AND FK_PK_Tutor_ID = ?
      `,
      [bookingId, user.id]
    );

    if (rows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🔥 löschen (Reihenfolge wegen FKs!)
    await conn.query(
      `DELETE FROM contain WHERE FK_PK_Booking_ID = ?`,
      [bookingId]
    );

    await conn.query(
      `DELETE FROM is_in WHERE FK_PK_Booking_ID = ?`,
      [bookingId]
    );

    await conn.query(
      `DELETE FROM Booking WHERE PK_Booking_ID = ?`,
      [bookingId]
    );

    await conn.commit();

    res.json({ message: "Booking cancelled by tutor" });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: "Cancel booking failed" });
  } finally {
    conn.release();
  }
};