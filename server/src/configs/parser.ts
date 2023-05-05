import express, { Application } from "express";

const parseConfig = (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
export default parseConfig;