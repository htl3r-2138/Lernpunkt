const db = require("../db");
const bcrypt = require("bcrypt");

/**
 * PUT /api/user/hourly-rate
 * Tutor only
 */
exports.updateHourlyRate = async (req, res) => {
  const user = req.session.user;
  const { pricePerHour } = req.body;

  if (!user || user.role !== "tutor") {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (pricePerHour == null || isNaN(pricePerHour)) {
    return res.status(400).json({ message: "Invalid hourly rate" });
  }

  await db.query("UPDATE Tutor SET PricePerHour = ? WHERE PK_Tutor_ID = ?", [
    pricePerHour,
    user.id,
  ]);

  res.json({ message: "Hourly rate updated" });
};

/**
 * PUT /api/user/email
 * Student & Tutor
 */
exports.updateEmail = async (req, res) => {
  const user = req.session.user;
  const { newEmail } = req.body;

  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (!newEmail) {
    return res.status(400).json({ message: "Missing newEmail" });
  }

  const table = user.role === "tutor" ? "Tutor" : "Student";
  const idField = user.role === "tutor" ? "PK_Tutor_ID" : "PK_Student_ID";

  try {
    await db.query(`UPDATE ${table} SET Email = ? WHERE ${idField} = ?`, [
      newEmail,
      user.id,
    ]);

    res.json({ message: "Email updated" });
  } catch (err) {
    res.status(409).json({ message: "Email already in use" });
  }
};

/**
 * PUT /api/user/password
 * Student & Tutor
 */
exports.updatePassword = async (req, res) => {
  const user = req.session.user;
  const { currentPassword, newPassword } = req.body;

  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const table = user.role === "tutor" ? "Tutor" : "Student";
  const idField = user.role === "tutor" ? "PK_Tutor_ID" : "PK_Student_ID";

  const [rows] = await db.query(
    `SELECT Password FROM ${table} WHERE ${idField} = ?`,
    [user.id]
  );

  if (!rows.length) {
    return res.status(404).json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(currentPassword, rows[0].Password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid current password" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.query(`UPDATE ${table} SET Password = ? WHERE ${idField} = ?`, [
    hashed,
    user.id,
  ]);

  res.json({ message: "Password updated" });
};

/**
 * DELETE /api/user
 * Student & Tutor
 */
exports.deleteAccount = async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const table = user.role === "tutor" ? "Tutor" : "Student";
  const idField = user.role === "tutor" ? "PK_Tutor_ID" : "PK_Student_ID";

  await db.query(`DELETE FROM ${table} WHERE ${idField} = ?`, [user.id]);

  req.session.destroy(() => {
    res.json({ message: "Account deleted" });
  });
};
