const mongoose = require("mongoose");

const sourcesSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: false,
    },
  },

  // timestramp for create and updated
  { timestamps: true }
);

sourcesSchema.pre("save", async function (next) {
  const task = this;
});

const AddSources = mongoose.model("AddSources", sourcesSchema);

module.exports = AddSources;
