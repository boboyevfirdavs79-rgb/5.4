const CustomErrorHandler = require("../error/error");

module.exports = function (err, req, res, next) {
  // 1. Agar xato CustomErrorHandler'dan kelgan bo'lsa
  if (err instanceof CustomErrorHandler) {
    return res.status(err.status).json({
      success: false,
      // err.message ichida endi aniq matn bo'ladi
      message: err.message || "Xatolik yuz berdi"
    });
  }

  // 2. Mongoose validation xatosi
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).json({ success: false, message: "Validation error", errors });
  }

  // 3. Qolgan barcha kutilmagan xatolar (500)
  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
};