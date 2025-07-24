import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import User from "../repositories/dao/models/User.js";

dotenv.config();

const { JWT_SECRET } = process.env;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      return user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export const auth = passport.authenticate("jwt", { session: false });
export default passport;
