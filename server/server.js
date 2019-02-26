require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const compression = require("compression");
const app = express();
const cors = require("cors");
const cloudinary = require("cloudinary");
const formData = require("express-form-data");

// CONFIG //

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || config.DATABASE);

const { User } = require("./models/User");
const { UserGearItem } = require("./models/UserGearItem");
const { MasterGearItem } = require("./models/MasterGearItem");
const { Genre } = require("./models/Genre");

const { auth } = require("./middleware/auth");

const CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "http://aud-io.herokuapp.com"
    : "http://localhost:3000";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(formData.parse());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(express.static("client/build"));

// GET //

app.get("/api/auth", auth, (req, res) => {
  res.json({
    isAuth: true,
    userData: req.user
  });
});

app.get("/api/logout", auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

app.get("/api/usergearitem", (req, res) => {
  let id = req.query.id;

  UserGearItem.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

app.get("/api/gearlist", (req, res) => {
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;
  const order = req.query.order ? req.query.order : "asc";

  // ORDER = asc || desc
  UserGearItem.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

app.get("/api/users", (req, res) => {
  let id = req.query.id ? req.query.id : null;

  if (id) {
    User.findById(id, (err, user) => {
      if (err) return res.status(400).send(err);
      res.send(user);
    });
  } else {
    const role = req.query.role || "";
    const query = req.query.query || "";
    const genres = req.query.genres || "";
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const order = req.query.order ? req.query.order : "asc";

    const findObj = {};
    if (role) {
      findObj["role"] = role;
    }
    if (query) {
      findObj["profilename"] = new RegExp(query, "gi");
    }

    const dbQuery = User.find(findObj)
      .skip(skip)
      .sort({ _id: order });

    if (query) {
      dbQuery.limit(10).exec((err, users) => {
        if (err) return res.status(400).send(err);
        let filteredData = users.map(val => {
          return {
            _id: val._id,
            profilename: val.profilename
          };
        });
        res.status(200).send(filteredData);
      });
    } else {
      dbQuery.limit(limit).exec((err, users) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(users);
      });
    }
  }
});

// // POST //

app.post("/api/usergearitem", (req, res) => {
  MasterGearItem.findOrCreate(
    {
      category: req.body.category,
      specificType: req.body.specificType,
      make: req.body.make,
      model: req.body.model
    },
    err => {
      if (err) throw err;
    }
  );
  const gearItem = new UserGearItem(req.body);

  gearItem.save((err, item) => {
    if (err) return res.status(400).send(err);
    User.findByIdAndUpdate(
      req.body.ownerId,
      { $push: { gearList: item._id } },
      { new: true },
      (err, user) => {
        if (err) return res.status(400).send(err);
      }
    );
    res.status(200).json({
      post: true,
      gearItem: item
    });
  });
});

app.post("/api/mastergearitem", (req, res) => {
  const gearItem = new MasterGearItem(req.body);

  gearItem.save((err, item) => {
    if (err) {
      return res.json({ success: false });
    }
    res.status(200).json(doc);
  });
});

app.post("/api/genre", (req, res) => {
  const genre = new Genre(req.body);
  genre.save((err, doc) => {
    if (err) {
      return res.json({ success: false });
    }
    res.status(200).json(doc);
  });
});

app.post("/api/signup", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, msg: err.errmsg });
    }
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("auth", user.token).json({
        isAuth: true,
        userData: user
      });
    });
  });
});

app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (!user) return res.json({ isAuth: false, message: "Email not found" });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        console.log(err);
      }
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "Wrong password"
        });

      user.populate("gearList");

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).json({
          isAuth: true,
          userData: user
        });
      });
    });
  });
});

// UPDATE //

app.post("/api/usergearitem", (req, res) => {
  UserGearItem.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      if (!doc) return res.status(400).send({ success: false });
      res.json(doc);
    }
  );
});

// UPDATE USER ACCOUNT SETTINGS

app.post("/api/update_user", auth, (req, res) => {
  let updateObj = {
    profilename: req.body.profilename,
    email: req.body.email,
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode
    }
  };

  User.findByIdAndUpdate(req.user._id, updateObj, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc) return res.status(400).send({ success: false });
    res.json(doc);
  });
});

// UPDATE USER PROFILE

app.post("/api/update_profile", auth, (req, res) => {
  let imageFiles = Object.values(req.files);

  const promises = imageFiles.map(image => {
    return cloudinary.v2.uploader.upload(image.path, {
      folder: `aud-io/users/${req.user._id}/`,
      public_id: image.fieldName
    });
  });

  Promise.all(promises)
    .then(results => {
      const headerObj = results.find(obj => {
        return /headerphoto/.test(obj.public_id);
      });
      const profileObj = results.find(obj => {
        return /profilephoto/.test(obj.public_id);
      });

      User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) return res.status(400).send(err);
        if (!user) return res.status(400).send({ success: false });

        if (headerObj) {
          user.photos.header = headerObj;
        }
        if (profileObj) {
          user.photos.primary = profileObj;
        }
        user.photos.headerOverlay = req.body.headerOverlay;
        user.profilename = req.body.profilename;
        user.profilenameColor = req.body.profilenameColor;

        user.save((err, newUser) => {
          if (err) {
            console.log(err);
            return res.json({ success: false, msg: err.errmsg });
          }
          res.json(newUser);
        });
      });
    })
    .catch(err => res.status(400).json(err));
});

// DELETE //

app.delete("/api/update_usergearitem", (req, res) => {
  let id = req.query.id;
  UserGearItem.findOne({ _id: id }, (err, item) => {
    if (err) return res.status(400).send(err);
    User.findByIdAndUpdate(
      item.ownerId,
      { $pull: { gearList: id } },
      { new: true },
      (err, user) => {
        if (err) return res.status(400).send(err);
        item.remove();
        res.json(true);
      }
    );
  });
});

// PRODUCTION BUILD SET UP
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
