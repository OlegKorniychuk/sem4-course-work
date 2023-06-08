const express = require('express');
const router = express.Router();

const Manager = require('../models/manager');
const Project = require('../models/project');
const Team = require('../models/team');
const Teamlead = require('../models/teamlead');
const Editor = require('../models/editor');
const checkAuth = require('../middleware/checkAuth');

//Manager's cabinet - displays info about all projects. Can assign a new project to a team
router.get('/:username', checkAuth, async (req, res) => {
  const newProjects = await Project.findMany({ status: 'new' }).exec();
  const currentProjects = await Project.findMany({ status: 'ongoing' }).exec();
  const completedProjects = await Project.findMany({ status: 'completed' }).exec();
  const availableTeams = await Team.findMany({ currentProjectId: '' }).exec();
  res.json({
    projects: { newProjects, currentProjects, completedProjects },
    availableTeams
  })
})


//Assigning a selected project to a selected vacant team
router.post('/:username/:projectId', checkAuth, async (req, res) => { 
  const projectId = req.params.projectId
  const selectedTeamId = req.body.selectedTeamId

  const project = await Project.findOne({ _id: projectId }).exec();
  if (!project) {
    res.status(404).json({ message: "This project was not found" });
  }
  project.status = 'forteamlead';
  project.teamId = selectedTeamId;
  await project.save();

  const team = await Team.findOne({ _id: selectedTeamId }).exec();
  if (!team) {
    res.status(404).json({ message: "This team was not found" });
  }
  if (team.currentProjectId !== '') {
    res.json({ message: 'This team is already busy' });
  }
  team.currentProjectId = projectId;
  await team.save();

  const teamLeadId = team.teamLeadId;
  const teamlead = await Teamlead.findOne({ _id: teamLeadId }).exec();
  teamlead.currentProjectId = projectId;
  await teamlead.save();

  const editors = team.editors;
  if (!editors){
    res.json({ message: 'This team has no editors' });
  }
  for (editorId in editors) {
    const editor = await Editor.findOne({ _id: editorId });
    editor.currentProject.projectId = projectId;
    await editor.save();
  }

  const projectName = project.projectName;
  res.json({ message: `Project ${projectName} now in progress` });
})

module.exports = router;