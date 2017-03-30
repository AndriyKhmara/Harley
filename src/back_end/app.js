var http = require("http"),
    express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    passport = require("passport"),
    session = require("express-session"),
    logger = require("./services/logger"),
    configService = require("./services/ConfigService"),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash"),
    weatherController = require("./controllers/weather"),
    db = require("./models/dbModel");
var api = express.Router();

require("./config/passport")(passport);

const authCheckMiddleware = require("./models/authCheckModel");
app.use("/user/v01", authCheckMiddleware);

const apiRoutes = require("./routes/api");
app.use("/user/v01", apiRoutes);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(session({
    secret: "this is the secret"
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.post("/login", passport.authenticate("local-login", { failWithError: true }), function(req, res) {
    res.json(req.user);
});

app.post("/signup", function(req, res, next) {
    db.User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (user) {
            res.json(null, false, req.flash("alert","That user name is already taken."));
            return;
        } else {
            var newUser = new db.User();
            newUser.username = req.body.username.toLowerCase();
            newUser.password = newUser.generateHash(req.body.password);
            newUser.userSetting = {
                colors: ["#FFC300", "#C70039", "#581845"]
            };
            newUser.save(function(err, user) {
                req.login(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.json(user);
                });
            });
        }
    });
});

// route to mock data with services statistics per day
app.get("/weather/v01/stat/service/day", function (req, res) {
    "use strict";
    weatherController.getServiceDayStat(req.query.from, req.query.to, req.query.service).then(function (data) {
        res.send(data);
    });
});
// route to mock data with services statistics per month
app.get("/weather/v01/stat/service/month", function (req, res) {
    "use strict";
    weatherController.getServiceMonthStat(req.query.from, req.query.service).then(function (data) {
        res.send(data);
    });
});
// route to mock data with cities statistics per day
app.get("/weather/v01/stat/city/day", function (req, res) {
    "use strict";
    weatherController.getCityDayStat(req.query.from, req.query.to, req.query.city).then(function (data) {
        res.send(data);
    });
});
// route to mock data with cities statistics per month
app.get("/weather/v01/stat/city/month", function (req, res) {
    "use strict";
    weatherController.getCityMonthStat(req.query.from, req.query.city).then(function (data) {
        res.send(data);
    });
});
app.get("/weather/v01/current", function (req, res) {
    "use strict";
    weatherController.getCurrentWeather().then(function (data) {
        res.send(data);
    });
});
//Example of url: http://localhost:3000/weather/v01/stat/service-by-city/day?from=2017-01-01&to=2017-01-20&city=Rivne
app.get("/weather/v01/stat/service-by-city/day", function (req, res) {
    "use strict";
    weatherController.getServiceStatByCities(req.query.from, req.query.to, req.query.city).then(function (data) {
        res.send(data);
    });
});

app.get("/weather/v01/statistic/day", function (req, res) {
    "use strict";
    weatherController.getServiceDayStat(req.query.from, req.query.to).then(function (data) {
        res.send(data);
    });
});

app.get("/weather/v01/settings", function (req, res) {
    "use strict";
    res.send(configService.getSettings());
});

app.get("/weather/v01/configs", function (req, res) {
    "use strict";
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(configService.getTotalConfig());
});

http.createServer(app).listen(3000, function () {
    "use strict";
    console.log("App listening on port 3000!");
});