/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var selectedChartId = "chart-div-1";

// Array to hold current colors
var usedColors = [];

// Return random color for line graph
function randomColor() {
    // Key to return
    var key;

    // Get our array of object keys
    var colorArray = Object.keys(window.chartColors);

    // Set max loops to 10 to avoid infinite loops
    for (var cLoop = 0; cLoop < 10; cLoop++) {
        intIndex = Math.floor(Math.random() * colorArray.length);
        key = colorArray[intIndex];
        if (!usedColors.includes(key)) {
            usedColors.push(key);
            break;
        }
    }
    return window.chartColors[key];
}

window.chartColors = {
    // red: 'rgb(255, 99, 132)',
    // orange: 'rgb(255, 159, 64)',
    // yellow: 'rgb(255, 205, 86)',
    // green: 'rgb(75, 192, 192)',
    lightBlue: 'rgb(183, 220, 244)',
    mediumBlue: 'rgb(97, 159, 198)',
    darkBlue: 'rgb(86, 108, 122)',
    blue: 'rgb(54, 162, 235)',
    // purple: 'rgb(153, 102, 255)',
    // black: 'rgb(0, 0, 0)'
};

var config = {
    type: 'line',
    data: {
        labels: ["2014-12-31", "2015-12-31", "2016-12-31", "2017-12-31", "2018-12-31"],
        backgroundColor: window.chartColors.lightBlue,
        borderColor: window.chartColors.lightBlue,
        color: window.chartColors.lightBlue,
        datasets: []
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Stocks'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        labels: {
            fontSize: 20
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Year'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};

var config2 = {
    type: 'line',
    data: {
        labels: ["2014-12-31", "2015-12-31", "2016-12-31", "2017-12-31", "2018-12-31"],
        backgroundColor: window.chartColors.darktBlue,
        borderColor: window.chartColors.darkBlue,
        color: window.chartColors.darkBlue,
        datasets: []
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Stocks'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        labels: {
            fontSize: 20
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Year'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};

var config3 = {
    type: 'line',
    data: {
        labels: ["2014-12-31", "2015-12-31", "2016-12-31", "2017-12-31", "2018-12-31"],
        backgroundColor: window.chartColors.mediumBlue,
        borderColor: window.chartColors.mediumBlue,
        color: window.chartColors.mediumBlue,
        datasets: []
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Stocks'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        labels: {
            fontSize: 20
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Year'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};

window.onload = function () {
    // Canvas 1
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);

    // Canvas 2
    var ctx2 = document.getElementById('canvas2').getContext('2d');
    window.myLine2 = new Chart(ctx2, config2);

    // Canvas 3
    var ctx3 = document.getElementById('canvas3').getContext('2d');
    window.myLine3 = new Chart(ctx3, config3);
};

$(document).ready(function () {
    $("#getchart").on("change", function () {
        // jQuery
        /*
        $("#" + selectedChartId).attr("style", "display: none; height: 811px; width: 1622px;");
        var selectedVal = $(this).find(':selected').val();
        var selectedText = $(this).find(':selected').text();
        $("#" + selectedVal).attr("style", "display: block; height: 811px; width: 1622px;");
        selectedChartId = selectedVal;
        */
        var selectedVal = $(this).find(':selected').val();
        var selectedText = $(this).find(':selected').text();
        $("#" + selectedChartId).hide();
        $("#" + selectedVal).show();
        selectedChartId = selectedVal;

        console.log(selectedVal);
        console.log(selectedText);
    });
    $('.chart-div').hide();
    $('.chart-toggle').hide();
    $('.table-div').hide();
    $('.submit').on('click', function () {
        stockQuote = $("#user-input").val().trim();
        $.ajax("/api/report/" + stockQuote, {
            type: "GET",
            data: stockQuote
        }).then(
            function (res) {
                // Clear text input
                $("#user-input").val("");
                console.log(res);

                // Label id for the stock and line color
                var labelId = "";
                var lineColor = randomColor();

                //////////
                // Chart 1
                //////////
                var dataPoints = [];
                for (var resLength = 0; resLength < res.length; resLength++) {
                    if (resLength === 0) {
                        labelId = res[resLength].symbol;
                    }
                    var resNetIncome = res[resLength].netIncome;
                    var resRevenue = res[resLength].revenue;
                    dataPoints.push(parseFloat(resNetIncome / resRevenue).toFixed(2));
                }
                console.log("CHART 1 DATA POINTS", resNetIncome, resRevenue);
                var chartDataSet = {
                    label: labelId,
                    backgroundColor: window.chartColors.lightBlue,
                    borderColor: window.chartColors.lightBlue,
                    backgroundColor: lineColor,
                    borderColor: lineColor,
                    data: dataPoints,
                    fill: false
                };
                config.data.datasets.push(chartDataSet);
                window.myLine.update();

                //////////
                // Chart 2
                //////////
                dataPoints = [];
                for (var resLength = 0; resLength < res.length; resLength++) {
                    var resOutstandingShares = parseFloat(res[resLength].outstandingShares) * 1000000;
                    var resStockPrice = res[resLength].stockPrice;
                    var resLongTermDebt = res[resLength].longTermDebt;
                    var resEbit = res[resLength].ebit;
                    console.log(resOutstandingShares, resStockPrice, resLongTermDebt, resEbit);
                    dataPoints.push(parseFloat(((resOutstandingShares * parseFloat(resStockPrice)) + parseFloat(resLongTermDebt)) / parseFloat(resEbit)).toFixed(2));
                }
                console.log("CHART 2 DATA POINTS", resOutstandingShares, resStockPrice, resLongTermDebt, resEbit);
                var chartDataSet = {
                    label: labelId,
                    backgroundColor: window.chartColors.lightBlue,
                    borderColor: window.chartColors.lightBlue,
                    backgroundColor: lineColor,
                    borderColor: lineColor,
                    data: dataPoints,
                    fill: false
                };
                config2.data.datasets.push(chartDataSet);
                window.myLine2.update();

                //////////
                // Chart 3
                //////////
                dataPoints = [];
                for (var resLength = 0; resLength < res.length; resLength++) {
                    var resLongTermDebt = res[resLength].longTermDebt;
                    var resEbit = res[resLength].ebit;
                    dataPoints.push(parseFloat(resLongTermDebt / resEbit).toFixed(2));
                }
                console.log("CHART 3 DATA POINTS", resLongTermDebt, resEbit);
                var chartDataSet = {
                    label: labelId,
                    backgroundColor: window.chartColors.lightBlue,
                    borderColor: window.chartColors.lightBlue,
                    backgroundColor: lineColor,
                    borderColor: lineColor,
                    data: dataPoints,
                    fill: false
                };
                config3.data.datasets.push(chartDataSet);
                window.myLine3.update();
            }
        );
        /*
        $('#chart-div-2').hide();
        $('#chart-div-3').hide();
        $('#chart-div-1').show();
        */
        if (selectedChartId === "chart-div-1") {
            $('#chart-div-1').show();
        } else if (selectedChartId === "chart-div-2") {
            $('#chart-div-2').show();
        } else {
            $('#chart-div-3').show();
        }

        // Show our dropdown
        $('.chart-toggle').show();
    });
});