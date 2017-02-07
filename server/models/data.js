'use strict';

module.exports = function (sequelize, DataTypes) {
    var Data = sequelize.define('Data', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false
        }
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
                },
                add: function (deviceId, data) {
                    return Data.sync({}).then(function () {
                        return Data.create({
                            data: data,
                            DeviceId: deviceId
                        }).then(function (data) {
                            return data;
                        }).catch(function (error) {
                            console.log(error);
                            console.log("An error occured while adding Data");
                            return -1;
                        });
                    }).catch(function (error) {
                        console.log("An error occured in function add (Data) while syncing with table: Data");
                        return -1;
                    })
                },
                remove: function (args) {
                    switch (args.length()) {
                        case 1:
                            //deviceId
                            if (args[0] == 'dataId') {
                                //Remove a single data entry
                                return Data.destroy({
                                    where: { data_id: args[0] }
                                }).then(function (deleted) {
                                    return (deleted != null);
                                }).catch(function (error) {
                                    console.error("An error occured while deleting Data by data_id");
                                });
                            } else if (args[0] == 'deviceId') {
                                //Remove all data for a device
                                return Data.destroy({
                                    where: { device_id: args[0] }
                                }).then(function (deleted) {
                                    return (deleted != null);
                                }).catch(function (error) {
                                    console.error("An error occured while deleting Data by data_id");
                                });
                            }
                            break;

                        case 2:
                            //timeStart and timeEnd
                            return Data.destroy({
                                where: { $between: [timeStart, timeEnd] }
                            }).then(function (deleted) {
                                return (deleted != null);
                            }).catch(function (error) {
                                console.error("An error occured while deleting Data by data_id");
                            });

                        case 3:
                            //deviceId, timeStart and timeEnd
                            return Data.destroy({
                                where: { time: { $between: [timeStart, timeEnd], $and: [{ device_id: args[0] }] } }
                            }).then(function (deleted) {
                                return (deleted != null);
                            }).catch(function (error) {
                                console.error("An error occured while deleting Data by deviceId, timeStart and timeEnd");
                            });
                    }
                },
                findByUser: function (models, userId) {
                    return Data.findAll({
                        where: {
                            DeviceId: models.Device.id,
                            $and: [
                                {
                                    UserId: {
                                        $eq: userId
                                    }
                                }
                            ]
                        },
                        include: [
                            {
                                model: models.Device
                            }
                        ],
                        attributes: ['id']

                    }).then(function (data) {
                        return data
                    }).catch(function (error) {
                        console.log(error);
                        console.error("An error occured while finding data by userid");
                    });
                },
                find: function () {
                    /*                   combinations
                    *   args = { deviceId = x, timeStart = a, timeEnd = b}
                    *   args = { deviceId }
                    *   args = { timeStart, timeEnd}
                    *   
                    */

                    switch (args.length()) {
                        case 1:
                            //deviceId
                            return Data.findAll({
                                where: { device_id: args[0] }
                            }).then(function (data) {
                                return data
                            }).catch(function (error) {
                                console.error("An error occured while finding data by deviceId");
                            });

                        case 2:
                            //timeStart and timeEnd
                            return Data.findAll({
                                where: { time: { $between: [args[0], args[1]] } }
                            }).then(function (data) {
                                return data
                            }).catch(function (error) {
                                console.error("An error occured while finding data by timeStart and timeEnd");
                            });

                        case 3:
                            //deviceId, timeStart and timeEnd
                            return Data.findAll({
                                where: { time: { $between: [timeStart, timeEnd], $and: [{ device_id: args[0] }] } }
                            }).then(function (data) {
                                return data
                            }).catch(function (error) {
                                console.error("An error occured while finding data by deviceId, timeStart and timeEnd");
                            });

                    }
                }

            }
        });

    return Data;
};