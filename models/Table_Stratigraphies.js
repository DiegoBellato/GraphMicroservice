// the define tells the entity!!! 
//Sequelize checks always the entity defiition and the corresponding table (which is the plural of the entity)
module.exports = (sequelize, Sequelize) => {
    const Layers_ = sequelize .define( 'stratigraphy', {
        StratigraphyID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LayerName: {
            type: Sequelize.STRING
        },
        LayerSoil1ID: {
            type: Sequelize.INTEGER
        },
        LayerSoil2ID: {
            type: Sequelize.INTEGER
        },
        PercentSoil2: {
            type: Sequelize.INTEGER
        },
        LayerSoil3ID: {
            type: Sequelize.INTEGER
        },
        PercentSoil3: {
            type: Sequelize.INTEGER
        },
        ObjectID: {
            type: Sequelize.INTEGER
        },
        FromElevation: {
            type: Sequelize.FLOAT
        },
        ToElevation: {
            type: Sequelize.FLOAT
        },
        UnitID: {
            type: Sequelize.INTEGER
        }
    });

    return Layers_;

};