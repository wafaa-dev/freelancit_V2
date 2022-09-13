const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

//* @route    Post api/project
//* desc      add project
//* access    Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title Is Required").not().isEmpty(),
      check("description", "Description Is Required").not().isEmpty(),
      check("requiredSkills", "Required Skills Is Required").not().isEmpty(),
      check("estimatedBudget", "Estimated Budget Is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // const user = await User.findById(req.user.id).select('-password');
      const user = await User.findById(req.user.id);
      const {
        title,
        description,
        requiredSkills,
        estimatedBudget,
        closed,
        attachment,
      } = req.body;
      const newProject = new Project({
        title,
        description,
        requiredSkills: requiredSkills
          .split(",")
          .map((requiredSkill) => requiredSkill.trim()),
        estimatedBudget,
        closed,
        avatar: user.avatar,
        attachment,
        lastName: user.lastName,
        firstName: user.firstName,
        user: user.id,
      });
      await newProject.save();
      res.json(newProject);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//* @route    Get api/project
//* desc      Get all projects
//* access    Public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ publishedAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//* @route    Get api/project/:projectId
//* desc      Get project by id
//* access    Public
router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.projectId
    ).populate("user", ["email", "phoneNumber"]);
    if (!project) {
      return res.status(400).json({ msg: "Project Not Found" });
    }
    res.json(project);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Project Not Found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    Delete api/project/:id
//* desc      Delete project by id
//* access    Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project){
      return res.status(404).json({msg:'Project not found'});
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await project.remove();
    res.json({ msg: "Project Removed" });
  } catch (error) {
  if (err.kind ==="ObjectId"){
      return res.status(404).json({msg:"Project not found"});
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// router.delete('/:id',auth, async (req,res)=>{
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project){
//       return res.status(404).json({msg:'Project not found'});
//     }
    //check user
    // if (project.user.toString() !== req.user.id){
    //   return res.status(401).json({msg :"User not authorized"});
    //  }
    //  await project.remove();
    //  res.json({msg:"Project removed"});
//   } catch (error) {
//     console.error(err.message);
//     if (err.kind ==="ObjectId"){
//       return res.status(404).json({msg:"Project not found"});
//     }
//     res.status(500).send('server error');
//   }
// });

//* @route    POST api/project/comment/:projectId
//* desc      Comment a Project
//* access    Private
router.post(
  "/comment/:projectId",
  [auth, [check("text", "Text Is Required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      const project = await Project.findById(req.params.projectId);
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      };
      project.comments.unshift(newComment);
      await project.save();
      res.json(project.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//* @route    Delete api/project/comment/:projectId/:commentId
//* desc      Delete comment
//* access    Private
router.delete("/comment/:projectId/:commentId", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    // pull out the comment
    const comment = project.comments.find((comment) => {
      return comment.id === req.params.commentId;
    });
    if (!comment) {
      return res.status(404).json({ msg: "Comment Does Not Exist" });
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    //get remove index
    const removeIndex = project.comments.map((comment) => {
      return comment.user.toString().indexOf(req.user.id);
    });
    project.comments.splice(removeIndex, 1);
    await project.save();
    res.json(project.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    PUT api/project/apply/:projectId
//* desc      Apply for a project
//* access    Private
router.put("/apply/:projectId", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    //Check if the project has already been applied for
    if (
      project.candidates.filter(
        (candidate) => candidate.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({
        errors: [{ msg: "You have already applied for this project" }],
      });
    }
    project.candidates.unshift({ user: req.user.id });
    await project.save();
    res.json(project.candidates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//* @route    GET api/project/candidates/:projectId
//* desc      Get Candidates of a project
//* access    Private
router.get("/candidates/:projectId", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (project.candidates.length === 0) {
      return res
        .status(400)
        .json({ msg: "There is no candidates for this project yet" });
    }

    res.json(project.candidates);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    PUT api/project/affect/:projectId/:candidateId
//* desc      Affect a project
//* access    Private
router.put("/affect/:projectId/:candidateId", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId },
      { $set: { "candidates.$[element].affected": true } },
      { arrayFilters: [{ "element._id": req.params.candidateId }], new: true }
    );
    await project.save();
    res.json(project.candidates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//* @route    PUT api/project/close/:projectId
//* desc      Close a project
//* access    Private
router.put("/close/:projectId", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId },
      { $set: { closed: true } },
      { new: true }
    );
    await project.save();
    res.json({ msg: "Project Closed Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
