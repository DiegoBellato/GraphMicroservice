const db = require("../models");
const Element_ = db.Elements;
const Layer_ = db.Stratigraphies;
const Op = db.Sequelize.Op;
const chart = require("../CreateChart")
// Import filesystem and Highcharts Export Server module
const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const chartPattern =  require("highcharts-pattern-fill");

// Create and Save a new status
exports.create = (req, res) => {
  // Validate request
  if (!req.body.ElementName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a element
  const element_ = {
    ElementName: req.body.ElementName,
    Section: req.body.Section,
    ProjectID: req.body.ProjectID,
    AreaID: req.body.AreaID,
    MethodID: req.body.MethodID
  };

  // Save element in the database
  Element_.create(element_)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the element."
      });
    });
};

// Update a element by the id in the request
exports.update = (req, res) => {
    const ElementID = req.params.ElementID;

    Element_.update(req.body, {
      where: { ElementID: ElementID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Element was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update element with id=${ElementID}. Maybe element was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating element with id=" + ElementID
        });
      });
};

// Delete a element with the specified id in the request
exports.delete = (req, res) => {
    const ElementID = req.params.ElementID;

    Element_.destroy({
      where: { ElementID: ElementID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Element was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete element with id=${ElementID}. Maybe element was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete element with id=" + ElementID
        });
      });
};

// Retrieve all elements from the database with optional ProjectID, Section, MethodID
exports.findAll = (req, res) => {
    const ProjectID = req.query.ProjectID;
    const Section = req.query.Section;
    const MethodID = req.query.MethodID;

    const condition = {}
    if (ProjectID || Section || MethodID) {
        condition[Op.and] = []
        if (ProjectID) {
            condition[Op.and].push({
            ProjectID: {
              [Op.eq]: ProjectID
            }
          })
        }
        if (Section) {
            condition[Op.and].push({
            Section: {
              [Op.like]: `%${Section}%`
            }
          })
        }
        if (MethodID) {
            condition[Op.and].push({
            MethodID: {
              [Op.eq]: MethodID
            }
          })
        }
    }
  
    Element_.findAll({
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
            err.message || "Some error occurred while retrieving elements."
        });
      });
};

// Find a single element with an id
exports.findOne = (req, res) => {
    const ElementID = req.params.ElementID;

    Element_.findByPk(ElementID)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find element with id=${ElementID}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving element with id=" + ElementID
        });
      });
};

// Find all elements with specific ProjectID
exports.findAllWithProjectID = (req, res) => {
    const ProjectID = req.query.ProjectID;
    var condition = ProjectID ? { ProjectID: ProjectID} : null;

    Element_.findAll({ 
      limit:50,
      currentPage: 1,
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving elements."
      });
    });
};

// Find a single element with an id
exports.findLayersFromElementID = (req, res) => {
    const ElementID = req.params.ElementID;

    Element_.findByPk(ElementID, { include: ["stratigraphies"] })
      .then(data => {
        if (data) {
          
          const ProcessChart = callback => {
            // Initialize the exporter
            chartExporter.initPool();

            // Example
            const chartOptions = {
              width: 1200,
              type: 'png',
              options: chart.create_series(data['stratigraphies'])
            };
          
            // Export chart using these options
            chartExporter.export(chartOptions, (err, res) => {
                // Get the image data (base64)
                if(res) {
                  chartExporter.killPool();
                  callback(res.data);
                };
            });
          };

          // send base64 image 
          ProcessChart(base64 => {
            res.send(base64);
          });

        } else {
          res.status(404).send({
            message: `Cannot find element with id=${ElementID}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving element with id=" + ElementID
        });
      });
}; 

// Funtion: Find a single element with an id
exports.LayersFromElementID = (ElementID) => {
    return Element_.findByPk(ElementID, { include: ["stratigraphies"] })
      .then((data) => {
        var chartoptions = chart.create_series(data['stratigraphies']);

        const ProcessChart = callback => {
          // Initialize the exporter
          chartExporter.initPool();
            
          // Example
          const chartOptions = {
            width: 1200,
            type: 'png',
            options: chartoptions
          };
        
          // Export chart using these options
          chartExporter.export(chartOptions, (err, res) => {
              // Get the image data (base64)
              if(res) {
                let imageb64 = res.data;
                let outputFile = "./Layers.png";
                // Save the image data to a file
                fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("The chart has been succesfully generated!");
                    }
                });
                chartExporter.killPool();
                callback(imageb64);
              };
          });
        };
         
        // send base64 image 
        ProcessChart(base64 => {
          console.log("Base64 image:");
          //console.log(base64)
        });
        
      })
      .catch((err) => {
        console.log(">> Error while finding element: ", err);
      });
  };
