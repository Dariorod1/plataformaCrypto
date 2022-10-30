const multer = require("multer");

// ------------------- image store manager ------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.png`);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 500 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = upload