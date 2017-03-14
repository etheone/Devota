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
                            return -1;
                        });
                    } else {
                        return -1;
                    }
                },
                findByUser: function (models, userId) {
                    return sequelize.query("SELECT da.*, de.device_name FROM `Data` da JOIN `Device` de ON da.DeviceId = de.id WHERE de.UserId = 'auth0|57a1a50ce6b8fa2817471868';", {
                        type: sequelize.QueryTypes.SELECT
                    }).then(function (data, meta) {
                        return data
                    }).catch(function (error) {
                        console.log(error);
                        console.error("An error occured while finding data by userid");
                        return -1;
                    });
                }

            }
        });

    return Data;
};