const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./../config/config").get(process.env.NODE_ENV);
const SALT_I = 10;
const { states, countries } = require("./geography");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 100
    },
    token: {
      type: String
    },
    firstName: {
      type: String,
      maxlength: 50
    },
    lastName: {
      type: String,
      maxlength: 50
    },
    role: {
      type: String,
      enum: ["musician", "studio"]
    },
    profilename: {
      type: String,
      maxlength: 50,
      unique: true
    },
    profilenameColor: {
      type: String
    },
    phoneNumber: {
      type: String,
      maxlength: 20
    },
    address: {
      country: {
        type: String,
        enum: countries.map(country => country.code)
      },
      postalCode: {
        type: String,
        maxlength: 20
      },
      state: {
        type: String,
        enum: states
      },
      city: {
        type: String,
        maxlength: 50
      },
      street: {
        type: String,
        maxlength: 50
      }
    },
    expertise: {
      maincategory: {
        type: [String],
        enum: [
          "Vocalist",
          "Producer",
          "Writer",
          "Instrumentalist",
          "Engineer",
          "Arranger",
          "Composer"
        ]
      },
      subcategory: [
        {
          type: String,
          maxlength: 30
        }
      ]
    },
    genres: [
      {
        type: String,
        maxlength: 30,
        lowercase: true
      }
    ],
    renter: {
      type: Boolean
    },
    gearList: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserGearItem" }]
    },
    photos: {
      primary: {
        type: Object
      },
      secondary: [
        {
          type: Object
        }
      ],
      header: {
        type: Object
      },
      headerOverlay: {
        type: String
      }
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), config.SECRET);

  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  jwt.verify(token, config.SECRET, function(err, decode) {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.methods.deleteToken = function(token, cb) {
  var user = this;
  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
