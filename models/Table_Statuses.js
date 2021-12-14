module.exports = (sequelize, Sequelize) => {
    const Status_ = sequelize .define( 'status', {
        StatusID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        StatusName: {
            type: Sequelize.STRING
        },
        Notes: {
            type: Sequelize.STRING
        }
    });

    return Status_;

};