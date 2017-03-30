var db = require("../models/dbModel"),
    User = require("../models/userModel");

module.exports = (function () {
    var getUserSettings = function(username) {
        db.User.findOne({
            username: username
        }, function(err, user) {
            if (user) {
                console.log("getUserSettings", user);
            }
        });
    };

    var setUserSettings = function(username) {
        db.User.findOne({
            username: username
        }, function(err, user) {
            if (user) {
                console.log("getUserSettings", user);
            }
        });
    };

    return {
        getUserSettings: getUserSettings,
        setUserSettings: setUserSettings
    };
}());