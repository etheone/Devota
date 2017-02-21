module.exports = function (sequelize, DataTypes) {
    var Quickstart = sequelize.define('Quickstart', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        }
    },
        {
            classMethods: {
                add: function (title, description) {
                    return Quickstart.sync({}).then(function () {
                        return Quickstart.create({
                            title: title,
                            description: description,
                        }).then(function (quickstart) {
                            return quickstart;
                        }).catch(function (error) {
                            console.log(error);
                            console.log("An error occured while adding quickstart");
                            return -1;
                        });
                    }).catch(function (error) {
                        console.log(error);
                        console.log("An error occured while syncing in function add (Quickstart) with table: Quickstart");
                        return -1;
                    });
                },
                find: function () {
                    return Quickstart.findAll().then(function (quickstart) {
                        return quickstart;
                    }).catch(function (error) {
                        console.log(error);
                        console.error("An error occured while finding quickstart");
                        return -1;
                    });
                }
            },

            freezeTableName: true // Model tableName will be the same as the model name
        });

    return Quickstart;
};