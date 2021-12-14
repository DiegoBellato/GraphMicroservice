module.exports = app => {
    // This "Statuses" is the name of the table to be checked!!!!
    const Elements = require('../controllers/controller_elements.js');
    var router = require("express").Router();

    // create a new element
    router.post('/',Elements.create);

    // retrieve all elements
    router.get('/', Elements.findAll);

    // Retrieve elements with ProjectID
    router.get("/byprojectid", Elements.findAllWithProjectID);  

    // Retrieve a single element with ElementID
    router.get("/:ElementID", Elements.findOne);

    // Update a element with ElementID
    router.put("/:ElementID", Elements.update);

    // Delete a element with ElementID
    router.delete("/:ElementID", Elements.delete);

    // Retrieve a single element with ElementID
    router.get('/getLayers/:ElementID', Elements.findLayersFromElementID);

    // by hitting api/elements
    app.use('/api/elements', router);
}