var selectedChartId = "canvas";

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    lightBlue: 'rgb(183, 220, 244)',
    darkBlue: 'rgb(86, 108, 122)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
};
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var config = {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: window.chartColors.lightBlue,
            borderColor: window.chartColors.lightBlue,
            data: [
                1,
                -2,
                3,
                -4,
                5,
                -6,
                7
            ],
            fill: false,
        }, {
            label: 'My Second dataset',
            fill: false,
            backgroundColor: window.chartColors.darkBlue,
            borderColor: window.chartColors.darkBlue,
            data: [
                8,
                -9,
                10,
                -11,
                12,
                -13,
                14
            ],
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
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
        $("#"+selectedChartId).attr("style", "display: none; height: 811px; width: 1622px;");
        var selectedVal = $(this).find(':selected').val();
        var selectedText = $(this).find(':selected').text();
        $("#"+selectedVal).attr("style", "display: block; height: 811px; width: 1622px;");
        selectedChartId = selectedVal;

        console.log(selectedVal);
        console.log(selectedText);
    });
    $('.chart-div').hide();
    $('.chart-toggle').hide();
    $('.table-div').hide();
    $('.submit').on('click', function(){
        $('.form-div').hide();
        $('.chart-div').show();
        $('.chart-toggle').show();
        $('.table-div').show();
    })
});