import path from "path";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.resolve(__dirname, "../images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12, function (err, bytes) {
        if (err) {
          return cb(err);
        }
        const fn = bytes.toString("hex") + path.extname(file.originalname);
        cb(null, fn);
        req.file = fn;
      });
    },
  });
  
  const upload = multer({ storage: storage });

  export {upload,imagesDir}