const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
const { AUTH_JWT_SECRET } = process.env;

//========local strategy ====
passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password", session: false },
        async(email, password, done) => {
            try {
                const user = await User.findOne({ where: { email: email } });
                if (!user) return done(null, false, { message: "crea una cuenta" });
                if (!user.compare(password))
                    return done(null, false, { message: "password invalid" });
                const { id, fullName, email: userEmail } = user;
                return done(null, {
                    id,
                    fullName,
                    email: userEmail,
                });
            } catch (error) {
                console.log(error);
                return done(err);
            }
        }
    )
);

passport.use(
    new BearerStrategy((token, done) => {
        jwt.verify(token, AUTH_JWT_SECRET, async function(err, user) {
            if (err) return done(err);
            const response = await User.findByPk(user.id);
            return done(null, response ? user : false, { scope: "all" });
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;