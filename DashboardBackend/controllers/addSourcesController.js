const AddSources = require("../models/AddSourcesModel");

//  Add Sources
const addSourcesCont = async (req, res, next) => {
  const { task } = req.body;

  try {
    const addSources = new AddSources({ task });
    await addSources.save();
    res.json({ message: "Task saved successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = addSourcesCont;
