module.exports = function (sequelize, DataTypes) {
    var Device = sequelize.define('Device', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        device_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    Device.belongsTo(models.User, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            allowNull: false
                        }
                    });
                    Device.hasMany(models.Data)
                },
                add: function (name, description, userId) {
                    return Device.sync({}).then(function () {
                        return Device.create({
                            device_name: name,
                            description: description,
                            UserId: userId
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.log(error);
                            console.log("An error occured while adding device");
                            return -1;
                        });
                    }).catch(function (error) {
                        console.log(error);
                        console.log("An error occured while syncing in function add (Device) with table: Device");
                        return -1;
                    });
                },
                find: function (deviceId, userId) {
                    if (deviceId != null) {
                        return Device.findOne({
                            where: { device_id: deviceId }
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.err("An error occured while finding device by deviceId");
                        });
                    } else {
                        return Device.findAll({
                            where: { UserId: userId }
                        }).then(function (devices) {
                            return devices;
                        }).catch(function (error) {
                            console.err("An error occured while finding device by deviceId");
                        });
                    }
                },
                remove: function (deviceId, userId) {
                    if (deviceId != null) {
                        //Delete device with deviceId
                        return Device.destroy({
                            where: { device_id: deviceId }
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.err("An error occured while removing device by deviceId");
                        });
                    } else {
                        //Delete all devices belonging to userId
                        return Device.destroy({
                            where: { UserId: userId }
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.err("An error occured while removing device by deviceId");
                        });
                    }
                },
                edit: function (deviceId, deviceName) {
                    return Device.update({
                        device_name: deviceName
                    },
                        {
                            where: { id: deviceId }
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.err("An error occured while updating device name by deviceId");
                        });
                }

            },

            freezeTableName: true // Model tableName will be the same as the model name
        });

    return Device;
};

/*
var Device = sequelize.define('device', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    device_name: {
        type: Sequelize.TEXT,
        field: 'deviceName',
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    added: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'added'
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }

    },

    freezeTableName: true // Model tableName will be the same as the model name
}); */

function addDevice(deviceId, name, type, userId, added, uniqueId) {
    Device.sync({}).then(function () {
        return Device.create({
            id: deviceId,
            device_identifier: uniqueId,
            device_name: name,
            type: type,
            added: added,
            user_id: userId
        });
    });
};