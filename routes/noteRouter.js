const express = require("express");
const noteRouter = express.Router();
const Note = require("../models/Note");
const Trail = require("../models/Trail")
const User = require("../models/User")

// Get All notes
noteRouter.get("/", (req, res, next) => {
  Note.find({ user: req.auth._id }, (err, notes) => { // Filter notes by user
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(notes);
  });
});

// Get notes by trail id
noteRouter.get("/trail/:id", (req, res, next) => {
  Note.find({ trail: req.params.id, user: req.auth._id }, (err, notes) => { // Filter notes by trail and user
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(notes);
  });
});

// Get notes by id
noteRouter.get('/:id', (req, res, next) => {
  Note.findOne({ _id: req.params.id, user: req.auth._id }, (err, note) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!note) {
      res.status(404);
      return next(new Error('Note not found'));
    }
    return res.status(200).send(note);
  });
});

// Add new note
noteRouter.post('/', (req, res, next) => {
  const userId = req.auth._id; // Get the user ID from the authenticated user

  req.body.user = userId;
  const newNote = new Note(req.body);

  newNote.save((err, savedNote) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    User.findByIdAndUpdate(
      userId, // Update the user with the new note
      { $push: { notes: savedNote._id } }, // Push the new note to the user's notes array
      { new: true },
      (err, updatedUser) => {
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
      }
    );
  });
});


// Update Note
noteRouter.put('/:id', (req, res, next) => {
  Note.findOneAndUpdate(
    { _id: req.params.id, user: req.auth._id },
    req.body,
    { new: true },
    (err, note) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!note) {
        res.status(404);
        return next(new Error('Note not found'));
      }
      return res.status(200).send(note);
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
