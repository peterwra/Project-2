var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Report.findAll({}).then(function (dbExamples) {
      res.render("index", {
      });
    });
  });
};
