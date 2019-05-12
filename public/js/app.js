/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var selectedChartId = "canvas";

// Array to hold current colors
var usedColors = [];

// Return random color for line graph
function randomColor () {
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
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    lightBlue: 'rgb(183, 220, 244)',
    darkBlue: 'rgb(86, 108, 122)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
};

var config = {
    type: 'line',
    data: {
        labels: ["1", "2", "3", "4", "5"],
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
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
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
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
};

$(document).ready(function () {
    $("#getchart").on("change", function () {
        // jQuery
        $("#" + selectedChartId).attr("style", "display: none; height: 811px; width: 1622px;");
        var selectedVal = $(this).find(':selected').val();
        var selectedText = $(this).find(':selected').text();
        $("#" + selectedVal).attr("style", "display: block; height: 811px; width: 1622px;");
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
                $("#user-input").val("");
                console.log(res);
                var labelId = "";
                var dataPoints = [];
                for (var resLength = 0; resLength < res.length; resLength++) {
                    if (resLength === 0) {
                        labelId = res[resLength].symbol;
                    }
                    var resNetIncome = res[resLength].netIncome;
                    var resRevenue = res[resLength].revenue;
                    console.log(resNetIncome, resRevenue, parseFloat(resNetIncome / resRevenue).toFixed(2));
                    dataPoints.push(parseFloat(resNetIncome / resRevenue).toFixed(2));
                }
                var chartDataSet = {
                    label: labelId,
                    backgroundColor: window.chartColors.lightBlue,
                    borderColor: window.chartColors.lightBlue,
                    backgroundColor: randomColor(),
                    borderColor: randomColor(),
                    data: dataPoints,
                    fill: false
                };
                config.data.datasets.push(chartDataSet);
                window.myLine.update();
                // location.reload();
            }
        );
        // $('.form-div').hide();
        $('.chart-div').show();
        // $('.chart-toggle').show();
        // $('.table-div').show();
    });
});