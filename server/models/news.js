module.exports = function (sequelize, DataTypes) {
    var News = sequelize.define('News', {
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
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            classMethods: {
                add: function (title, description, date) {
                    return News.sync({}).then(function () {
                        return News.create({
                            title: title,
                            description: description,
                            date: date
                        }).then(function (news) {
                            return news;
                        }).catch(function (error) {
                            console.log(error);
                            console.log("An error occured while adding news");
                            return -1;
                        });
                    }).catch(function (error) {
                        console.log(error);
                        console.log("An error occured while syncing in function add (News) with table: News");
                        return -1;
                    });
                },
                find: function () {
                    return News.findAll({order: 'date DESC'}).then(function (news) {
                        return news;
                    }).catch(function (error) {
                        console.log(error);
                        console.error("An error occured while finding news");
                        return -1;
                    });
                }
            },
            freezeTableName: true // Model tableName will be the same as the model name
        });

    return News;
};