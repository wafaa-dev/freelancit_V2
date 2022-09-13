const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const config = require("config");
const request = require("request");
//user model
const User =require ("../../models/User");

//* @route    Get api/profile/me
//* desc      Get current user profile
//* access    Private
router.get("/me", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
      .populate("user", ["firstName", "lastName", "avatar"])
      .populate("contacts", ["email", "phoneNumber"])
      .exec();

    if (!profile) {
      return res.status(400).json({ msg: "This user does not have a profile" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    Post api/profile
//* desc      Create or Update profile
//* access    Private
router.post(
  "/",
  [
    auth,
    [
      check("hourlyRate", "Hourly Rate is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      //if the validation ok
    const {
      aboutMe,
      city,
      nationality,
      gender,
      spokenLanguages,
      hourlyRate,
      skills,
      githubusername,
      certifications,
      portfolio,
      businessLicense,
      address,
      youtube,
      linkedin,
      twitter,
      facebook,
      instagram,
    } = req.body;
      // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (aboutMe) profileFields.aboutMe = aboutMe;
    if (city) profileFields.city = city;
    if (nationality) profileFields.nationality = nationality;
    if (gender) profileFields.gender = gender;
    if (spokenLanguages)
      profileFields.spokenLanguages = spokenLanguages
        .split(",")
        .map((spokenLanguage) => spokenLanguage.trim());
    if (hourlyRate) profileFields.hourlyRate = hourlyRate;
    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    if (certifications)
      profileFields.certifications = certifications
        .split(",")
        .map((certification) => certification.trim());
    if (portfolio) profileFields.portfolio = portfolio;
    if (githubusername) profileFields.githubusername = githubusername;

    profileFields.contacts = {};
    profileFields.contacts = req.user.id;

    profileFields.businessInformation = {};
    if (businessLicense)
      profileFields.businessInformation.businessLicense = businessLicense;
    if (address) profileFields.businessInformation.address = address;
    //social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
        // create 
      if (!profile) {
        const profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
      }
        //update the profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//* @route    Get api/profile
//* desc      Get all users profiles
//* access    Public
router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find()
      .populate("user", ["firstName", "lastName", "avatar"])
      .populate("contacts", ["email", "phoneNumber"])
      .exec();

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    Get api/profile/user/:userId
//* desc      Get user's profile by id
//* access    Public
router.get("/user/:userId", async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.userId })
      .populate("user", ["firstName", "lastName", "avatar"])
      .populate("contacts", ["email", "phoneNumber"])
      .exec();

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//* @route    Delete api/profile/
//* desc      Delete user + profile + project
//* access    Private
router.delete("/", auth, async (req, res) => {
  try {
    await Project.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    PUT api/profile/experience
//* @desc     Add profile experience
//* @access   Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "Date of start is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experiences.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

//* @route    Delete api/profile/experience/:experienceId
//* @desc     Delete an experience
//* @access   Private
router.delete("/experience/:experienceId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.experiences
      .map((experience) => {
        experience._id;
      })
      .indexOf(req.params.experienceId);
    profile.experiences.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//* @route    PUT api/profile/education
//* @desc     Add profile education
//* @access   Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field Of Study is required").not().isEmpty(),
      check("from", "Date of start is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

//* @route    Delete api/profile/education/:educationId
//* @desc     Delete an education
//* @access   Private
router.delete("/education/:educationId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
   
    const removeIndex = profile.education
      .map(educ =>  educ.id)
      .indexOf(req.params.educationId);
      
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//* @route    GET api/profile/github/:username
//* @desc     Get user repos from github
//* @access   Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    PUT api/profile/rate/:profileId
//* @desc     Rate a freelancer
//* @access   Private
router.put("/rate/:profileId/:rate", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    profile.ratings.unshift(Number(req.params.rate));
    await profile.save();
    res.json({ msg: "Profile Rated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
