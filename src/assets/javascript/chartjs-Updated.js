$(function () {

    var doughnutData = [
        {
            value: 300,
            color: "#ffc300",
            highlight: "#ffc300",
            label: "App"
        },
        {
            value: 50,
            color: "#ac1a1a",
            highlight: "#ac1a1a",
            label: "Software"
        },
        {
            value: 100,
            color: "#3498db",
            highlight: "#3498db",
            label: "Laptop"
        }
    ];

    var doughnutOptions = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        responsive: true
    };


    var ctx = document.getElementById("doughnutChart").getContext("2d");
    new Chart(ctx).Doughnut(doughnutData, doughnutOptions);

    var ctx1 = document.getElementById("doughnutChart1").getContext("2d");
    new Chart(ctx1).Doughnut(doughnutData, doughnutOptions);

    var ctx2 = document.getElementById("doughnutChart2").getContext("2d");
    new Chart(ctx2).Doughnut(doughnutData, doughnutOptions);

    var ctx3= document.getElementById("doughnutChart3").getContext("2d");
    new Chart(ctx3).Doughnut(doughnutData, doughnutOptions);

    var ctx4 = document.getElementById("doughnutChart4").getContext("2d");
    new Chart(ctx4).Doughnut(doughnutData, doughnutOptions);

    var ctx5 = document.getElementById("doughnutChart5").getContext("2d");
     new Chart(ctx5).Doughnut(doughnutData, doughnutOptions);

    var lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Example dataset",
                fillColor: "rgba(172,26,26,1)",
                strokeColor: "rgba(172,26,26,1)",
                pointColor: "rgba(172,26,26,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(172,26,26,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "Example dataset",
                fillColor: "rgba(255,195,0,1)",
                strokeColor: "rgba(255,195,0,1)",
                pointColor: "rgba(255,195,0,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,195,0,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var lineOptions = {
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        responsive: true
    };


    var ctx8 = document.getElementById("lineChart").getContext("2d");
    new Chart(ctx8).Line(lineData, lineOptions);


});