

const express = require("express");
const noteRouter = express.Router();
const Note = require("../models/Note");
const Trail = require("../models/Trail")

// Get All notes
noteRouter.get("/", (req, res, next) => {
  Note.find((err, notes) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(notes);
  });
});

// Get notes by trail id
noteRouter.get("/trail/:id", (req, res, next) => {
  Note.find({ trail: req.params.id }, (err, notes) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(notes);
  });
});

// Get notes by id
noteRouter.get("/:id", async (req, res, next) => {
  try {
    const notes = await Note.findById(req.params.id);
    if (!notes) {
    return res.status(404).send("Note not found"); 
    } 
    return res.status(200).send(notes);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// Add new note
noteRouter.post('/', (req, res, next) => {
  req.body.user = req.auth._id;
  const newNote = new Note(req.body);
  newNote.save((err, savedNote) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    Trail.findByIdAndUpdate(
      req.body.trail, // Update the trail with the new note
      { $push: { notes: savedNote._id } }, // Push the new note to the trail's notes array
      { new: true },
      (err, updatedTrail) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(201).send(savedNote);
      }
    );
  });
});

// Update Note
noteRouter.put("/:id", (req, res, next) => {
  Note.findOneAndUpdate(
    { _id: req.params.id, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedNote) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedNote);
    }
  );
});

// Delete Note
noteRouter.delete("/:id", (req, res, next) => {
  Note.findOneAndRemove(
    { _id: req.params.id, user: req.auth._id },
    (err, deletedNote) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!deletedNote) {
        res.status(404);
        return next(new Error("Note not found"));
      }
      Trail.findByIdAndUpdate(
        deletedNote.trail,
        { $pull: { notes: deletedNote._id } },
        { new: true },
        (err, updatedTrail) => {
          if (err) {
            res.status(500);
            return next(err);
          }
          return res.sendStatus(204);
        }
      );
    }
  );
});

module.exports = noteRouter;
