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
                remove: function (dataId) {
                    if (dataId != "" && dataId != null) {
                        return Data.destroy({
                            where: { id: dataId }
                        }).then(function (data) {
                            return data;
                        }).catch(function (error) {
                            console.error("An error occured while removing data by dataId");
                        });
                    } else {
                        return -1;
                    }

                    /*switch (args.length()) {
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
                    }*/
                },
                findByUser: function (models, userId) {
                    return sequelize.query("SELECT da.*, de.device_name FROM `Data` da JOIN `Device` de ON da.DeviceId = de.id WHERE de.UserId = 'auth0|57a1a50ce6b8fa2817471868';", {
                        type: sequelize.QueryTypes.SELECT
                    }).then(function (data, meta) {
                        return data
                    }).catch(function (error) {
                        console.log(error);
                        console.error("An error occured while finding data by userid");
                    });
                }

            }
        });

    return Data;
};