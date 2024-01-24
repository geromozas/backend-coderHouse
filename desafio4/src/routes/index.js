import express from "express";

const { Router } = express;

const router = new Router();

router.get("/home", (req, res) => {
  res.render("home", {});
});

export { router as routerHome };
