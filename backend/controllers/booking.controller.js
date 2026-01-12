const db = require("../db");

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

    // 1️⃣ Booking anlegen
    const [result] = await conn.query(
      `
      INSERT INTO Booking
        (Date, Start, End, MeetUp, Description, FK_PK_Student_ID)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [date, startTime, endTime, location, topic || "", user.id]
    );

    const bookingId = result.insertId;

    // 2️⃣ Subject verknüpfen
    await conn.query(
      `
      INSERT INTO contain (FK_PK_Booking_ID, FK_PK_Subject_ID)
      VALUES (?, ?)
      `,
      [bookingId, subjectId]
    );

    // 3️⃣ Tutor verknüpfen
    await conn.query(
      `
      INSERT INTO is_in (FK_PK_Tutor_ID, FK_PK_Booking_ID)
      VALUES (?, ?)
      `,
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