const express = require('express');
const router = express.Router();

const Manager = require('../models/manager');
const Project = require('../models/project');
const Team = require('../models/team');
const Teamlead = require('../models/teamlead');
const Editor = require('../models/editor');
const checkAuth = require('../middleware/checkAuth');

//Teamlead's cabinet - displays info about current project. Can assign it to a team if it is new.
router.get('/:username', checkAuth, async (req, res) => {
  const username = req.params.username;
  const teamlead = await Teamlead.findOne({ username: username }).exec();
  const currentProject = await Project.findOne({ projectId: teamlead._id });
  if (!currentProject) {
    res.json({ currentProject: '' });
  }
  const team = await Team.findOne({ teamLeadId: teamlead._id }).exec();
  res.json({ 
    currentProject: currentProject, 
    myTeam: team, 
    status: currentProject.status 
  });
  //status forteamlead means that the project had been reviewed by a manager
  //and a teamlead must now assign it to his team;
  //status ongoing means that the project is in progress

})
