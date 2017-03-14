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
                findOrAdd: function(userId) {
                    return User.findOrCreate({
                        where: { id: userId },
                        defaults: { id: userId }
                    }).spread(function(user, created) {
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
                        return -1;
                    });
                },
                delete: function (userId) {
                    return User.destroy({
                        where: { id: userId }
                    }).then(function(user) {
                        return user;
                    }).catch(function(error) {
                        console.err("An error occured while deleting user");
                        return -1;
                    });
                }

            }

        });
    return User;
};