/*
Joi : is used to apply authintication 


*/

const express = require("express");
const router = express.Router();
const { siginUpSchem, walletSchem } = require("../moduls/SignUpModuls");
const Joi = require("joi");
const Jwt = require("jsonwebtoken");
function generate() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
const { userRegVadilation } = require("../helper");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//////// Signup API
router.post("/signup", async (request, response) => {
  const { error } = userRegVadilation(request.body);
  if (error) {
    response.json({ seccess: false, messeg: error.details[0].message });
  } else {
    const userIsRegistered = await siginUpSchem.findOne({
      email: request.body.email,
    });
    if (!userIsRegistered) {
      const salt = await bcrypt.genSalt(saltRounds);
      let encryptedPassword = await bcrypt.hash(request.body.password, salt);

      const userID = generate();
      const signedUpUser = await new siginUpSchem({
        email: request.body.email,
        password: encryptedPassword,
        id: userID,
      });
      try {
        await signedUpUser.save().then((data) => {
          response.json({ seccess: true });
        });
      } catch (error) {
        response.json({ seccess: false, messeg: error });
      }
    } else {
      response.json({
        seccess: false,
        messeg: "This user is registered , please try another user",
      });
    }
  }
});
//////// Login API

router.post("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  const user = await siginUpSchem.findOne({ email: email });

  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const theId = user.id;
      const token = Jwt.sign({ theId }, "jwtScret", { expiresIn: 60 });

      response.json({
        userData: user,
        auth: true,
        token: token,
        expiresIn: "600",
      });
    } else {
      response.json({
        messeg: "in valid password",
        auth: false,
      });
    }
  } else {
    response.json({
      messeg: "user is not registered",
      auth: false,
    });
  }
});
//////// add new expense API

router.put("/addNewExpensse", async (request, response) => {
  try {
    await siginUpSchem
      .updateMany(
        { id: request.body.id },
        {
          $push: {
            WalletData: [
              {
                title: request.body.title,
                amount: request.body.amount,
                date: new Date(request.body.date),
              },
            ],
          },
        }
      )
      .then((data) => {
        response.json({
          seccess: true,
          messeg: `your data is updated`,
          data: data,
        });
      });
  } catch (error) {
    response.json({ seccess: false, messeg: error });
  }
});
//////// get the data from data base when it is login with the same user name 

router.post("/GetItems", async (request, response) => {
  try {
    await siginUpSchem.find({ id: request.body.id }).then((data) => {
      const WalletDataArray = data[0].WalletData;
      response.json({
        seccess: true,
        data: WalletDataArray,
      });
    });
  } catch (error) {
    response.json({ seccess: false, messeg: error });
  }
});

/// Get the not when user is login form data base 

router.post("/GetNotes", async (request, response) => {
  try {
    await siginUpSchem.find({ id: request.body.id }).then((data) => {
      const NoteDataArray = data[0].NoteData;
      response.json({
        seccess: true,
        data: NoteDataArray,
      });
    });
  } catch (error) {
    response.json({ seccess: false, messeg: error });
  }
});
/// Add new note to the data base 
router.put("/addNewNote", async (request, response) => {
  try {
    await siginUpSchem
      .updateMany(
        { id: request.body.id },
        {
          $push: {
            NoteData: [
              {
                content: request.body.content,
                title: request.body.title,
              },
            ],
          },
        }
      )
      .then((data) => {
        response.json({
          seccess: true,
          messeg: `your data is updated`,
          data: data,
        });
      });
  } catch (error) {
    response.json({ seccess: false, messeg: error });
  }
});

module.exports = router;
