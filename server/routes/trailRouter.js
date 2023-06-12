const express = require("express");
const trailRouter = express.Router();
const Trail = require("../models/Trail");
const Note = require("../models/Note")

// Get All Trails
trailRouter.get("/", (req, res, next) => {
  Trail.find((err, trails) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(trails);
  });
});

// Get Trails by id
trailRouter.get("/:id", async (req, res, next) => {
  try {
    const trail = await Trail.findById(req.params.id);
    if (!trail) {
      return res.status(404).send("Trail not found");
    }
    return res.status(200).send(trail);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// Get Trail Notes by trail id
trailRouter.get("/:id/notes", async (req, res, next) => {
  try {
    const trailNotes = await Trail.findById(req.params.id).populate("notes");
    if (!trailNotes) {
      return res.status(404).send("Trail not found");
    }
    return res.status(200).send(trailNotes.notes);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// Add new Trail
trailRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id;
  const newTrail = new Trail(req.body);
  newTrail.save((err, savedTrail) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedTrail);
  });
});

// Update Trail
trailRouter.put("/:id", (req, res, next) => {
  Trail.findOneAndUpdate(
    { _id: req.params.id, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedTrail) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedTrail);
    }
  );
});

// Delete Trail
trailRouter.delete("/:id", async (req, res, next) => {
  try {
    const trailId = req.params.id;

    // Delete all notes attached to the trail
    await Note.deleteMany({ trail: trailId });

    // Delete the trail
    const deletedTrail = await Trail.findByIdAndDelete(trailId);
    if (!deletedTrail) {
      res.status(404);
      return next(new Error("Trail not found"));
    }

    return res.status(200).send(`Successfully deleted Trail`);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

module.exports = trailRouter;
