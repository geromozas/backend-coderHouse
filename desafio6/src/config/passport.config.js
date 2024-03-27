import passport from "passport";
import github from "passport-github2";
import { UserModel } from "../dao/models/user.model.js";
import { usuariosModelo } from "../dao/models/userGitHub.model.js";

export const initPassport = () => {
  passport.use(
    "github",
    new github.Strategy(
      {
        clientID: "Iv1.9725fbcb86fac358",
        clientSecret: "86709731ce00bfbc7a98b0e179cb324d6870099d",
        callbackURL: "http://localhost:8080/api/sessions/callbackGithub",
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          // console.log(profile);
          let { name, email } = profile._json;
          let usuario = await usuariosModelo.findOne({ email });
          if (!usuario) {
            usuario = await usuariosModelo.create({
              nombre: name,
              email,
              github: profile,
            });
          }
          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}; //fin initpassport

//si usamos sessions
passport.serializeUser((usuario, done) => {
  done(null, usuario);
});

passport.deserializeUser((usuario, done) => {
  done(null, usuario);
});
