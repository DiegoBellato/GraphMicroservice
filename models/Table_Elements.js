module.exports = (sequelize, Sequelize) => {
    const Elements_ = sequelize .define( 'element', {
        ElementID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ElementName: {
            type: Sequelize.STRING
        },
        Section: {
            type: Sequelize.STRING
        },
        ProjectID: {
            type: Sequelize.INTEGER
        },
        MethodID: {
            type: Sequelize.INTEGER
        }
    });

    return Elements_;

};