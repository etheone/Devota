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
        code: {
            type: DataTypes.TEXT,
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
                            where: { id: deviceId },
                            attributes: ['id', 'userId', 'createdAt', 'updatedAt', 'device_name', 'description']
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.error("An error occured while finding device by deviceId");
                            console.error(error);
                            return -1;
                        });
                    } else {
                        return Device.findAll({
                            where: { UserId: userId },
                            attributes: ['id', 'userId', 'createdAt', 'updatedAt', 'device_name', 'description']
                        }).then(function (devices) {
                            return devices;
                        }).catch(function (error) {
                            console.log(error);
                            console.error("An error occured while finding device by userId");
                            return -1;
                        });
                    }
                },
                remove: function (deviceId, userId) {
                    if (deviceId != null) {
                        //Delete device with deviceId
                        return Device.destroy({
                            where: { id: deviceId }
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.error("An error occured while removing device by deviceId");
                            return -1;
                        });
                    } else {
                        //Delete all devices belonging to userId
                        return Device.destroy({
                            where: { UserId: userId }
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.error("An error occured while removing device by deviceId");
                            return -1;
                        });
                    }
                },
                edit: function (deviceId, deviceName, description) {
                    return Device.update({
                        device_name: deviceName,
                        description: description
                    },
                        {
                            where: { id: deviceId }
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.error("An error occured while updating device name by deviceId");
                            return -1;
                        });
                }

            },

            freezeTableName: true // Model tableName will be the same as the model name
        });

    return Device;
};
