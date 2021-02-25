const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  aboutMe: {
    type: String,
  },
  city: {
    type: String,
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
  },
  spokenLanguages: {
    type: [String],
  },
  hourlyRate: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  portfolio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  certifications: {
    type: [String],
  },
  contacts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  businessInformation: {
    businessLicense: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  ratings: [Number],
  experiences: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        reuired: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: String,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    facebook: {
      type: String,
    },
    youtube: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);
