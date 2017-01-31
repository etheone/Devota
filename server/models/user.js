'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Device)
                },
                add: function (userId) {
                    return User.sync({}).then(function () {
                        //Table created or synched
                       return User.findOne({
                            where: { id: userId }
                        }).then(function (user) {
                            var userToReturn = {};
                            if (user == null) {
                                return User.create({
                                    id: userId
                                }).then(function (user) {
                                    userToReturn["user"] = user;
                                    userToReturn["created"] = true;
                                    userToReturn["message"] = "Success";
                                    return userToReturn;
                                }).catch(function (error) {
                                    console.err("Error creating user, userId: " + userId);
                                });
                            } else {
                                userToReturn["user"] = -1;
                                userToReturn["created"] = false;
                                userToReturn["message"] = "User with ID " + userId + " already exists!"
                                return userToReturn;
                            }
                        }).catch(function (error) {
                            console.err("An error occured while creating User");
                        });

                    });
                },
                findOrAdd: function(userId) {
                    return User.findOrCreate({
                        where: { id: userId },
                        defaults: { id: userId }
                    }).spread(function(user, created) {
                        console.log("In user findorAdd");
                   
                        return [user, created];
                    }).catch(function(error) {
                        console.err("An error occured while findOrAdding user by userId");
                        return -1;
                    })
                },
                find: function (userId) {
                    return User.findOne({
                        where: { id: userId }
                    }).then(function (user) {
                        return user;
                    }).catch(function (error) {
                        console.err("An error occured while finding user");
                    });
                },
                delete: function (userId) {
                    return User.destroy({
                        where: { id: userId }
                    }).then(function(user) {
                        return user;
                    }).catch(function(error) {
                        console.err("An error occured while deleting user");
                    });
                }

            }

        });
    return User;
};



/*var User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    freezeTableName: true // Model tableName will be the same as the model name
});*/

function addUser(userId) {
    User.sync({}).then(function () {
        //Table created or synched
        return User.create({
            id: userId
        }).catch(function (error) {
            console.log("Error creating user, userId: " + userId);
        });
    });

};