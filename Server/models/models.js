const { DataTypes, Model } = require('sequelize');

class User extends Model {}
class Movie extends Model {}
class Review extends Model {}
class ReviewReaction extends Model {}
class Celebrity extends Model {}
class Comment extends Model {}
class Reply extends Model {}
class Watchlist extends Model {}
class LikeList extends Model {}
class UserRelationship extends Model {}
class MovieCast extends Model {}
class Token extends Model {}

let modelsSetUp = (sequelize) => {
    User.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            email: {type: DataTypes.STRING, unique: true},
            password: DataTypes.STRING,
            full_name: DataTypes.STRING,
            nickname: {type: DataTypes.STRING, allowNull: false, unique: true},
            about: {type: DataTypes.STRING, allowNull: true},
            image: {type: DataTypes.STRING, allowNull: true},
            is_activated: {type: DataTypes.BOOLEAN, defaultValue: false},
            activation_link: {type: DataTypes.STRING},
            reset_link: {type: DataTypes.STRING, allowNull: true},
        },
        {
            sequelize,
        }
    );

    Review.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            story_rate : DataTypes.STRING,
            visual_rate : DataTypes.STRING,
            acting_rate: DataTypes.STRING,
            originality_rate: DataTypes.STRING,
            emotional_impact_rate: DataTypes.STRING,
            meaning_depth_rate: DataTypes.STRING,
            overall_rate : DataTypes.STRING,
            title : DataTypes.STRING,
            html_content : DataTypes.STRING,
            is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
        },
        {
            sequelize
        }
    );

    ReviewReaction.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            user_id: {type: DataTypes.INTEGER, allowNull: false},
            review_id: {type: DataTypes.INTEGER, allowNull: false},
            reaction_type: {type: DataTypes.STRING, allowNull: false},
        },
        {
            sequelize
        }
    )

    Movie.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            poster: DataTypes.STRING,
            title: {type: DataTypes.STRING, allowNull: false},
            imdb_link: DataTypes.STRING,
            release_date: DataTypes.STRING,
            runtime: DataTypes.STRING,
            imdb_rate: DataTypes.STRING,
            rotten_rate: DataTypes.STRING,
            kinopoisk_rate: DataTypes.STRING,
            metacritic_rate: DataTypes.STRING,
            plot: DataTypes.STRING,
            director: DataTypes.STRING,
            genres: DataTypes.JSON,
            budget: DataTypes.STRING,
            gross: DataTypes.STRING,
        },
        {
            sequelize
        }
    );

    Celebrity.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            image: DataTypes.STRING,
            name: {type: DataTypes.STRING, allowNull: true},
            biography: {type: DataTypes.STRING, allowNull: true},
            height: {type: DataTypes.STRING, allowNull: true},
            born: {type: DataTypes.STRING, allowNull: true},
            imdb_page: DataTypes.STRING,
        },
        {
            sequelize
        }
    );

    Comment.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            text: DataTypes.STRING,
            is_deleted: {type: DataTypes.BOOLEAN, defaultValue: false}
        },
    {
            sequelize
        }
    );

    Reply.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            text: DataTypes.STRING,
            is_deleted: {type: DataTypes.BOOLEAN, defaultValue: false}
        },
        {
            sequelize
        }
    );

    Watchlist.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            user_id: {type: DataTypes.INTEGER, allowNull: false},
            movie_id: {type: DataTypes.INTEGER, allowNull: false},
        },
        {
            sequelize
        }
    );

    UserRelationship.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            friend_owner_id: {type: DataTypes.INTEGER, allowNull: false},
            friend_id: {type: DataTypes.INTEGER, allowNull: false},
        },
        {
            sequelize
        }
    )

    LikeList.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            user_id: {type: DataTypes.INTEGER, allowNull: false},
            movie_id: {type: DataTypes.INTEGER, allowNull: false},
        },
        {
            sequelize
        }
    );

    MovieCast.init(
        {
            role_name: DataTypes.STRING,
        },
        {
            sequelize
        }
    );

    Token.init(
        {
            user: { type: DataTypes.INTEGER, references: {model: User, key: "id"} },
            refreshToken: { type: DataTypes.STRING(1000), allowNull: false }
        },
        {
            sequelize,
            timestamps: false
        }
    );

    User.hasMany(Review);
    Review.belongsTo(User);

    Movie.hasMany(Review);
    Review.belongsTo(Movie);

    Movie.belongsToMany(Celebrity, {through: MovieCast});
    Celebrity.belongsToMany(Movie, {through: MovieCast});

    Review.hasMany(ReviewReaction);
    ReviewReaction.belongsTo(Review);

    Comment.hasMany(Reply);
    Reply.belongsTo(Comment);

    Review.hasMany(Comment);
    Comment.belongsTo(Review);

    User.hasMany(Comment);
    Comment.belongsTo(User);

    User.hasMany(Reply);
    Reply.belongsTo(User);

    return {User, Movie, Review, Watchlist, LikeList, Celebrity, Comment, UserRelationship, Reply, Token, ReviewReaction};
}

module.exports.Models = (sequelize) => modelsSetUp(sequelize);