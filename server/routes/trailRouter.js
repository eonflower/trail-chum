const express = require("express");
const trailRouter = express.Router();
const Trail = require("../models/Trail");
const Note = require("../models/Note")
const User = require("../models/User")

// Get All Trails
trailRouter.get('/user', (req, res, next) => {
  Trail.find({ user: req.auth._id }, (err, trails) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(trails);
  });
});

// Get Trails by id
trailRouter.get('/:id', (req, res, next) => {
  Trail.findOne({ _id: req.params.id, user: req.auth._id }, (err, trail) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!trail) {
      res.status(404);
      return next(new Error('Trail not found'));
    }
    return res.status(200).send(trail);
  });
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

trailRouter.post("/", (req, res, next) => {
  const userId = req.auth._id; // Get the user ID from the authenticated user

  req.body.user = userId;
  const newTrail = new Trail(req.body);

  newTrail.save((err, savedTrail) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    User.findByIdAndUpdate(
      userId, // Update the user with the new trail
      { $push: { trails: savedTrail._id } }, // Push the new trail to the user's trails array
      { new: true },
      (err, updatedUser) => {
        if (err) {
          res.status(500);
          return next(err);
        }

        return res.status(201).send(savedTrail);
      }
    );
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
