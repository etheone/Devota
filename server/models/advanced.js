module.exports = function (sequelize, DataTypes) {
    var Advanced = sequelize.define('Advanced', {
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
                    return Advanced.sync({}).then(function () {
                        return Advanced.create({
                            title: title,
                            description: description,
                        }).then(function (advanced) {
                            return advanced;
                        }).catch(function (error) {
                            console.log(error);
                            console.log("An error occured while adding advanced");
                            return -1;
                        });
                    }).catch(function (error) {
                        console.log(error);
                        console.log("An error occured while syncing in function add (Advanced) with table: Advanced");
                        return -1;
                    });
                },
                find: function () {
                    return Advanced.findAll().then(function (advanced) {
                        return advanced;
                    }).catch(function (error) {
                        console.log(error);
                        console.error("An error occured while finding advanced");
                        return -1;
                    });
                }
            },

            freezeTableName: true // Model tableName will be the same as the model name
        });

    return Advanced;
};