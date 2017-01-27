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
                    User.sync({}).then(function () {
                        //Table created or synched
                        User.findOne({
                            where: { id: userId }
                        }).then(function (user) {
                            if (user == null) {
                                return User.create({
                                    id: userId
                                }).catch(function (error) {
                                    console.log("Error creating user, userId: " + userId);
                                });
                            } else {
                                return "User with ID " + userId + " already exists!"
                            }
                        }).catch(function (error) {
                            console.err("An error occured while creating User");
                        });

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