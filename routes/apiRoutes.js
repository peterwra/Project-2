var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/report", function(req, res) {
    db.Report.findAll({}).then(function(dbData) {
      res.json(dbData);
    });
  });

  app.get("/api/report/:company", function(req, res) {
    db.Report.findAll({
      where:{
        symbol: req.params.company
      }
    }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new example
  app.post("/api/report/:company", function(req, res) {
    var dateOfYearEnd = ["2014-12-31","2015-12-31", "2016-12-31", "2017-12-31", "2018-12-31"]
    const api = require('eodhistoricaldata-api')
    api.getFundamentals(req.params.company).then(function(apiData) {
      console.log(apiData.outstandingShares.annual[4].sharesMln)
      for (var i = 0; i < dateOfYearEnd.length; i++) {
      db.Report.create(
        {
        symbol: req.params.company,
        reportDate: apiData.Financials.Balance_Sheet.yearly[dateOfYearEnd[i]].date,
        name: apiData.General.Name,
        outstandingShares: apiData.outstandingShares.annual[(4-i)].sharesMln,
        longTermDebt:apiData.Financials.Balance_Sheet.yearly[dateOfYearEnd[i]].longTermDebt,
        ebit: apiData.Financials.Income_Statement.yearly[dateOfYearEnd[i]].ebit,
        netIncome: apiData.Financials.Income_Statement.yearly[dateOfYearEnd[i]].netIncome,
        cash: apiData.Financials.Balance_Sheet.yearly[dateOfYearEnd[i]].cash,
        revenue: apiData.Financials.Income_Statement.yearly[dateOfYearEnd[i]].totalRevenue
        }
      )
      }
    })
    })
 
//random
  // Delete an example by id
  app.delete("/api/Report/:id", function(req, res) {
    db.Report.destroy({ where: { id: req.params.id } }).then(function(dbData) {
      res.json(dbData);
    });
  });
};
