const bcrypt = require("bcryptjs");
const UserSchema = require("../schema/user.schema");
const CustomErrorHandler = require("../error/error");
const sendEmail = require("../utils/sendEmail");

const randomcode = Array.from({ length: 6 }, () =>
  Math.floor(Math.random() * 9),
).join("");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserSchema.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return next(
          CustomErrorHandler.BadRequest(
            "Bu email allaqachon ro'yxatdan o'tgan",
          ),
        );
      }
      return next(CustomErrorHandler.BadRequest("Bu username band"));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const verifyCode = randomcode;
    const verifyCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    await UserSchema.create({
      username,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpires,
    });

    await sendEmail(email, verifyCode);

    res.status(201).json({
      message: `${email} manziliga tasdiqlash kodi yuborildi`,
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return next(CustomErrorHandler.NotFound("Foydalanuvchi topilmadi"));
    }

    if (user.isVerified) {
      return next(
        CustomErrorHandler.BadRequest("Hisob allaqachon tasdiqlangan"),
      );
    }

    if (user.verifyCode !== code) {
      return next(CustomErrorHandler.BadRequest("Tasdiqlash kodi noto'g'ri"));
    }

    if (user.verifyCodeExpires < new Date()) {
      return next(
        CustomErrorHandler.BadRequest("Tasdiqlash kodining muddati tugagan"),
      );
    }

    await UserSchema.updateOne(
      { email },
      {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpires: null,
      },
    );

    res.status(200).json({ message: "Hisob muvaffaqiyatli tasdiqlandi" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return next(CustomErrorHandler.BadRequest("Email yoki parol noto'g'ri"));
    }

    if (!user.isVerified) {
      return next(
        CustomErrorHandler.Forbidden("Avval emailingizni tasdiqlang"),
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(CustomErrorHandler.BadRequest("Email yoki parol noto'g'ri"));
    }

    const accsess = accsess_token(payload);
    const refresh = refresh_token(payload);

    res.cookie("accessToken", accsess, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refresh, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({
      message: "Muvaffaqiyatli kirildi",
      token: accsess,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};




const logout = async (req, res, next) => {
  try {

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "Muvaffaqiyatli chiqildi"
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};





module.exports = { register, verify, login, logout };