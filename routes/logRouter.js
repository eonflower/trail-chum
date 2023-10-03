const express = require("express");
const logRouter = express.Router();
const Log = require("../models/Log");
const Trail = require("../models/Trail")
const User = require("../models/User")

// Get All logs
logRouter.get("/", (req, res, next) => {
  Log.find({ user: req.auth._id }, (err, logs) => { // Filter logs by user
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(logs);
  });
});

// Get logs by trail id
logRouter.get("/trail/:id", (req, res, next) => {
  Log.find({ trail: req.params.id, user: req.auth._id }, (err, logs) => { // Filter logs by trail and user
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(logs);
  });
});

// Get logs by id
logRouter.get('/:id', (req, res, next) => {
  Log.findOne({ _id: req.params.id, user: req.auth._id }, (err, log) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!log) {
      res.status(404);
      return next(new Error('log not found'));
    }
    return res.status(200).send(log);
  });
});

// Add new log
logRouter.post('/', (req, res, next) => {
  const userId = req.auth._id; // Get the user ID from the authenticated user

  const { trail: trailId } = req.body;
  if (!trailId) {
    res.status(400);
    return next(new Error('No trail chosen'));
  }

  req.body.user = userId;
  const newLog = new Log(req.body);

  newLog.save((err, savedLog) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    User.findByIdAndUpdate(
      userId, // Update the user with the new log
      { $push: { logs: savedLog._id } }, // Push the new log to the user's logs array
      { new: true },
      (err, updatedUser) => {
        if (err) {
          res.status(500);
          return next(err);
        }

        Trail.findByIdAndUpdate(
          trailId, // Update the trail with the new log
          { $push: { logs: savedLog._id } }, // Push the new log to the trail's logs array
          { new: true },
          (err, updatedTrail) => {
            if (err) {
              res.status(500);
              return next(err);
            }

            return res.status(201).send(savedLog);
          }
        );
      }
    );
  });
});


// Update log
logRouter.put('/:id', (req, res, next) => {
  Log.findOneAndUpdate(
    { _id: req.params.id, user: req.auth._id },
    req.body,
    { new: true },
    (err, log) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!log) {
        res.status(404);
        return next(new Error('log not found'));
      }
      return res.status(200).send(log);
    }
  );
});

// Delete log
logRouter.delete("/:id", (req, res, next) => {
  Log.findOneAndRemove(
    { _id: req.params.id, user: req.auth._id },
    (err, deletedLog) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!deletedLog) {
        res.status(404);
        return next(new Error("log not found"));
      }
      Trail.findByIdAndUpdate(
        deletedLog.trail,
        { $pull: { logs: deletedLog._id } },
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

module.exports = logRouter;
