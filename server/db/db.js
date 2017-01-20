
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://Emil:kAi98v9l@localhost:3306/joemini');

var User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    username: {
        type: Sequelize.TEXT,
        field: 'username'
    },
    joined_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'postDate'
    },
    password_hash: Sequelize.STRING,
    password: {
        type: Sequelize.VIRTUAL,
        set: function (val) {
            this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
            this.setDataValue('password_hash', this.salt + val);
        },
        validate: {
            isLongEnough: function (val) {
                if (val.length < 7) {
                    throw new Error("Please choose a longer password")
                }
            }
        }
    },
    freezeTableName: true // Model tableName will be the same as the model name
});

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
    identifier: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    added_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'addedDate'
    },
    user_id: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: 'id'
        }

    },

    freezeTableName: true // Model tableName will be the same as the model name
});

var Data = sequelize.define('data', {
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
    value: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'date'
    },
    device_id: {
        type: Sequelize.UUID,
        references: {
            model: Device,
            key: 'id'
        }
    },
    

    freezeTableName: true // Model tableName will be the same as the model name
});


/*
function createPost(postText, imgName) {
    Post.sync({}).then(function () {
        // Table created
        return Post.create({
            postText: postText,
            img: ('img/' + imgName)
        }).catch(function(error) {
            console.log("Error saving post... postText: " + postText);
        });
    });

};

exports.Post = Post;
exports.sequelize = sequelize;
exports.createPost = createPost;*/