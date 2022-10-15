const express = require("express");
const app = express();
const path = require("path");
const CryptoJS = require("crypto-js");

app.use("/", express.static(path.join(__dirname, "../public")));
app.use(express.json());

const encryptionNumber = 23;

app.post("/api/encrypt", (req, res) => {
  let { text, secretKey } = req.body;

  const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
  res.send({ encryptedText });
});

app.post("/api/decrypt", (req, res) => {
  let { text, secretKey } = req.body;
  const decryptedText = CryptoJS.AES.decrypt(text, secretKey).toString(
    CryptoJS.enc.Utf8
  );

  res.send({ decryptedText });
});

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) console.log(err);

  console.log(`Server is up`);
});
