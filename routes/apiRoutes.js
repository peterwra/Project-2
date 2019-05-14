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
      },
      order:[
        ["reportDate", "asc"] 
      ]
    }).then(function(dbData) {
      res.json(dbData);
    });
  });


  // Create a new example
  app.post("/api/report/:company", function(req, res) {
    var dateOfYearEnd = ["2014-12-31", "2015-12-31", "2016-12-31", "2017-12-31", "2018-12-31"]
    var lastDayofMarket = ["2014-12-31", "2015-12-31", "2016-12-30", "2017-12-29", "2018-12-31"]  
    const api = require('eodhistoricaldata-api')
    function getStockAndCreateRecord(apiData, yearEndOf, marketEndOf, oustandingSharesIndex){
      var options = {
        symbol: req.params.company,
        from: marketEndOf,
        to: yearEndOf
      }
      
      api.getHistoricalEodData(options).then(function(stockData){
        console.log(yearEndOf)
      console.log("-------")
        console.log(stockData)
        db.Report.create(
          {
          symbol: req.params.company,
          reportDate: apiData.Financials.Balance_Sheet.yearly[yearEndOf].date,
          name: apiData.General.Name,
          outstandingShares: apiData.outstandingShares.annual[oustandingSharesIndex].sharesMln,
          longTermDebt:apiData.Financials.Balance_Sheet.yearly[yearEndOf].longTermDebt,
          ebit: apiData.Financials.Income_Statement.yearly[yearEndOf].ebit,
          netIncome: apiData.Financials.Income_Statement.yearly[yearEndOf].netIncome,
          cash: apiData.Financials.Balance_Sheet.yearly[yearEndOf].cash,
          revenue: apiData.Financials.Income_Statement.yearly[yearEndOf].totalRevenue,
          stockPrice: stockData[0].close
          }   
        )
      })
    }
    api.getFundamentals(req.params.company).then(function(apiData) {
      for (var i = 0; i < dateOfYearEnd.length; i++) {
        getStockAndCreateRecord(apiData, dateOfYearEnd[i],lastDayofMarket[i], 4 - i)    
      
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
