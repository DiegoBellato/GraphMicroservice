const db = require("../models");
const Status_ = db.Statuses;
const Op = db.Sequelize.Op;

// Create and Save a new status
exports.create = (req, res) => {
  // Validate request
  if (!req.body.StatusName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a status
  const status_ = {
    StatusName: req.body.StatusName,
    Notes: req.body.Notes
  };

  // Save status in the database
  Status_.create(status_)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the status."
      });
    });
};

// Retrieve all statuses from the database.
exports.findAll = (req, res) => {
    const StatusName = req.query.StatusName;
    var condition = StatusName ? { StatusName: { [Op.like]: `%${StatusName}%` } } : null;
  
    Status_.findAll({
      limit: 50,
      currentPage: 1,
      where: condition 
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving statuses."
        });
      });
};

// Find a single status with an id
exports.findOne = (req, res) => {
    const StatusID = req.params.StatusID;

    Status_.findByPk(StatusID)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find status with id=${StatusID}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving status with id=" + StatusID
        });
      });
};

// Update a status by the id in the request
exports.update = (req, res) => {
    const StatusID = req.params.StatusID;

    Status_.update(req.body, {
      where: { StatusID: StatusID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Status was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update status with id=${StatusID}. Maybe status was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating status with id=" + StatusID
        });
      });
};

// Delete a status with the specified id in the request
exports.delete = (req, res) => {
    const StatusID = req.params.StatusID;

    Status_.destroy({
      where: { StatusID: StatusID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Status was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Status with id=${StatusID}. Maybe Status was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Status with id=" + StatusID
        });
      });
};

// Delete all statuses from the database.
exports.deleteAll = (req, res) => {
    Status_.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Statuses were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Statuses."
          });
        });
};

// Find all statuses with notes
exports.findAllWithNotes = (req, res) => {
    Status_.findAll({ 
      limit:50,
      currentPage: 1,
      where: { Notes: { [Op.ne]: null } } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving statuses."
      });
    });
};