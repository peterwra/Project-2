module.exports = function(sequelize, DataTypes) {
    var Report = sequelize.define("Report", {
      symbol: DataTypes.STRING,
      reportDate: DataTypes.DATEONLY,
      name: DataTypes.STRING,
      outstandingShares: DataTypes.DECIMAL(18,2),
      ebit: DataTypes.DECIMAL(18,2),
      longTermDebt: DataTypes.DECIMAL(18,2),
      cash: DataTypes.DECIMAL(18,2),
      netIncome: DataTypes.DECIMAL(18,2), 
      stockPrice: DataTypes.DECIMAL(18,2),
      revenue: DataTypes.DECIMAL(18,2)
    });
    return Report;
  };
  