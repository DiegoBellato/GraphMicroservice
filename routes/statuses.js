module.exports = app => {
    // This "Statuses" is the name of the table to be checked!!!!
    const Statuses = require('../controllers/controller_status.js');
    var router = require("express").Router();

    // create a new status
    router.post('/',Statuses.create);

    // retrieve all statuses
    router.get('/', Statuses.findAll);

    // retrieve all statuses with notes
    router.get('/with_notes', Statuses.findAllWithNotes);

    // Retrieve a single status with StatusID
    router.get("/:StatusID", Statuses.findOne);

    // Update a status with StatusID
    router.put("/:StatusID", Statuses.update);

    // Delete a status with StatusID
    router.delete("/:StatusID", Statuses.delete);

    // Delete all statuses
    router.delete("/", Statuses.deleteAll);

    // by hitting api/statuses
    app.use('/api/statuses', router);
}
