const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const compression = require("compression");
const app = express();
const path = require("path");
const multer = require("multer");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || config.DATABASE);
//
const { User } = require("./models/User");
const { UserGearItem } = require("./models/UserGearItem");
const { MasterGearItem } = require("./models/MasterGearItem");
const { Genre } = require("./models/Genre");

const { auth } = require("./middleware/auth");

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
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;
  let limit = req.query.limit ? parseInt(req.query.limit) : 0;
  let order = req.query.order ? req.query.order : "asc";

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
    let role = req.query.role || "";
    let query = req.query.query || "";
    let genres = req.query.genres || "";
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let order = req.query.order ? req.query.order : "asc";

    let findObj = {};
    if (role) {
      findObj["role"] = role;
    }
    if (query) {
      findObj["profilename"] = new RegExp(query, "gi");
    }

    let dbQuery = User.find(findObj)
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
    (err, result) => {
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
        // console.log(user.gearList);
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

app.post("/api/genre", (req, res) => {
  const genre = new Genre(req.body);
  genre.save((err, doc) => {
    if (err) {
      return res.json({ success: false });
    }
    res.status(200).json(doc);
  });
});

app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email })
    // .populate('gearList')
    .exec((err, user) => {
      if (!user) return res.json({ isAuth: false, message: "Email not found" });

      user.comparePassword(req.body.password, (err, isMatch) => {
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

// IMAGE UPLOADER

app.post("/api/upload", auth, (req, res) => {
  const storage = multer.diskStorage({
    destination: `./userImages/${req.user.profilename}/`,
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });

  const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      console.log(file.mimetype);
      cb(null, true);
    } else {
      cb({ message: "Must be JPG or PNG" }, false);
    }
  };

  const multerOptions = {
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 6 }
  };

  const upload = multer(multerOptions).single("primary");

  upload(req, res, err => {
    if (err) {
      res.status(400).send(err);
    } else {
      User.findById(req.user._id, (err, user) => {
        user.photos.primary = req.file.path;
        user.save((err, user) => {
          if (err) return res.status(400).send(err);
          res.json(user);
        });
      });
    }
  });
});

// UPDATE USER

app.post("/api/update_user", auth, (req, res) => {
  let updateObj;
  /* req.body will only contain partial data depending on origin 
  so these if statements ensure nothing in the database gets overwritten 
  with undefined values  */

  if (req.body.origin === "ProfileHeaderCard") {
    updateObj = {
      profilename: req.body.profilename,
      profilenameColor: req.body.profilenameColor,
      photos: {
        primary: req.body.primary,
        header: req.body.headerphoto,
        headerOverlay: req.body.headerOverlay
      }
    };
  }

  if (req.body.origin === "AccountSettings") {
    updateObj = {
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
  }

  User.findByIdAndUpdate(req.user._id, updateObj, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc) return res.status(400).send({ success: false });
    res.json(doc);
  });
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

// PRODUCTOIN BUILD SET UP
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
