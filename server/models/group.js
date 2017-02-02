module.exports = function (sequelize, DataTypes) {
    var Group = sequelize.define('Group', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        group_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Group.belongsTo(models.User, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            allowNull: false
                        }
                    });
                    Group.hasMany(models.Device)
                },
                add: function (name, userId) {
                    return Group.sync({}).then(function () {
                        return Group.create({
                            group_name: name,
                            UserId: userId
                        }).then(function (group) {
                            return group;
                        }).catch(function (error) {
                            console.log(error);
                            console.log("An error occured while adding group");
                            return -1;
                        });
                    }).catch(function (error) {
                        console.log(error);
                        console.log("An error occured while syncing in function add (Group) with table: Group");
                        return -1;
                    });
                },
                find: function (groupId, userId) {
                    if (groupId != null) {
                        return Group.findOne({
                            where: { id: groupId }
                        }).then(function (group) {
                            return group;
                        }).catch(function (error) {
                            console.error("An error occured while finding device by groupId");
                        });
                    } else {
                        return Group.findAll({
                            where: { UserId: userId }
                        }).then(function (groups) {
                            return groups;
                        }).catch(function (error) {
                            console.error("An error occured while finding device by groupId");
                        });
                    }
                },
                remove: function (groupId, userId) {
                    if (groupId != null) {
                        //Delete group with deviceId
                        return Group.destroy({
                            where: { id: groupId }
                        }).then(function (group) {
                            return group;
                        }).catch(function (error) {
                            console.error("An error occured while removing group by groupId");
                        });
                    } else {
                        //Delete all groups belonging to userId
                        return Group.destroy({
                            where: { UserId: userId }
                        }).then(function (device) {
                            return device;
                        }).catch(function (error) {
                            console.error("An error occured while removing group by groupId");
                        });
                    }
                },
                edit: function (groupId, groupName) {
                    return Group.update({
                        grpup_name: groupName
                    },
                        {
                            where: { id: groupId }
                        }).then(function (group) {
                            return group;
                        }).catch(function (error) {
                            console.error("An error occured while updating group name by groupId");
                        });
                }

            },
            freezeTableName: true // Model tableName will be the same as the model name
        });

    return Group;
};

function addGroup(groupId, name, userId, added, uniqueId) {
    Group.sync({}).then(function () {
        return Group.create({
            id: groupId,
            group_identifier: uniqueId,
            group_name: name,
            added: added,
            user_id: userId
        });
    });
};