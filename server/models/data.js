'use strict';

module.exports = function (sequelize, DataTypes) {
    var Data = sequelize.define('Data', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false

        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            field: 'time'
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    Data.belongsTo(models.Device, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }

            }
        });

    return Data;
};

/*
var Data = sequelize.define('data', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    data: {
        type: Sequelize.STRING,
        allowNull: false

    },
    time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'time'
    },
    device_id: {
        type: Sequelize.UUID,
        references: {
            model: Device,
            key: 'id'
        }
    },


    freezeTableName: true // Model tableName will be the same as the model name
});*/

/*function addData(dataId, deviceId, data, time) {
    Device.sync({}).then(function () {
        return Device.create({
            id: dataId,
            data: data,
            time: time,
            device_id: deviceId
        });
    });
};*/

/*function findData(args) {*/
    /*                   combinations
    *   args = { deviceId = x, timeStart = a, timeEnd = b}
    *   args = { deviceId }
    *   args = { timeStart, timeEnd}
    *   
    */
/*
    switch (args.length()) {
        case 1:
            //deviceId
            Data.findAll({
                where: { device_id: args[0] }
            }).then(function (data) {
                return data
            }).catch(function (error) {
                console.err("An error occured while finding data by deviceId");
            });

            break;
        case 2:
            //timeStart and timeEnd
            Data.findAll({
                where: { time: { $between: [args[0], args[1]] } }
            }).then(function (data) {
                return data
            }).catch(function (error) {
                console.err("An error occured while finding data by timeStart and timeEnd");
            });
            break;
        case 3:
            //deviceId, timeStart and timeEnd
            Data.findAll({
                where: { time: { $between: [timeStart, timeEnd], $and: [{ device_id: args[0] }] } }
            }).then(function (data) {
                return data
            }).catch(function (error) {
                console.err("An error occured while finding data by deviceId, timeStart and timeEnd");
            });
            break;
    }
}; */
/*
function removeData(args) {
    /*                   combinations
    *   args = { deviceId = x, timeStart = a, timeEnd = b}
    *   args = { deviceId }
    *   args = { dataId }
    *   args = { timeStart, timeEnd}
    *   
    */

   /* switch (args.length()) {
        case 1:
            //deviceId
            if (args[0] == 'dataId') {
                //Remove a single data entry
                Data.destroy({
                    where: { data_id: args[0] }
                }).then(function (deleted) {
                    return (deleted != null);
                }).catch(function (error) {
                    console.err("An error occured while deleting Data by data_id");
                });
            } else if (args[0] == 'deviceId') {
                //Remove all data for a device
                Data.destroy({
                    where: { device_id: args[0] }
                }).then(function (deleted) {
                    return (deleted != null);
                }).catch(function (error) {
                    console.err("An error occured while deleting Data by data_id");
                });
            }
            break;

        case 2:
            //timeStart and timeEnd
            Data.destroy({
                where: { $between: [timeStart, timeEnd] }
            }).then(function (deleted) {
                return (deleted != null);
            }).catch(function (error) {
                console.err("An error occured while deleting Data by data_id");
            });
            break;

        case 3:
            //deviceId, timeStart and timeEnd
            Data.destroy({
                where: { time: { $between: [timeStart, timeEnd], $and: [{ device_id: args[0] }] } }
            }).then(function (deleted) {
                return (deleted != null);
            }).catch(function (error) {
                console.err("An error occured while deleting Data by deviceId, timeStart and timeEnd");
            });
            break;
    }
};*/