const express = require("express");
const router = express.Router();
const projects =require('../controllers/project-controller')

router.route("/projects").get(projects);

module.exports = router;
