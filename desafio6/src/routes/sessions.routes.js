import { Router } from "express";
import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";
import passport from "passport";

const sessionRouter = Router();
export const mongoUserManager = new MongoUserManager();

sessionRouter.post("/register", async (req, res) => {
  try {
    const newUser = await mongoUserManager.register(req.body);
    res.redirect("http://localhost:8080/views/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sessionRouter.post("/login", async (req, res) => {
  try {
    const user = await mongoUserManager.login(req.body);
    req.session.user = user;
    res.redirect("http://localhost:8080/views/products");
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sessionRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error en logout:", err);
      res.status(500).send("Error en logout");
    }
  });
  res.redirect("http://localhost:8080/views/login");
});

sessionRouter.get("/user", (req, res) => {
  res.send(users);
});

//llamado interno para que empiece a actuar el passport y a comunicarse con github
sessionRouter.get(
  "/github",
  passport.authenticate("github", {}),
  (req, res) => {}
);

sessionRouter.get(
  "/callbackGithub",
  passport.authenticate("github", {}),
  (req, res) => {
    req.session.usuario = req.user;

    res.setHeader("Content-type", "application/json");
    return res.status(200).json({ payload: req.user });
  }
);

export default sessionRouter;
