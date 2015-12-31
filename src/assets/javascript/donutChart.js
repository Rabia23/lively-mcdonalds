$(function () {
  
    $('#container').highcharts({
        chart: {
            type: 'pie',
      animation: true,
      backgroundColor: null,
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
    title:{
          text:''
    },
    subTitle:{
      text:''
    },
    credits:{enabled:false},
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        }
            }
        },
    tooltip: {
      formatter: function() {
        return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
      }
    },
    series: [{
      name: 'Concern',
      colors: ['#d83627', '#2699ed', '#f1d400', '#434347', '#90ec7c'],
      data: [["Ketchup",27],["Bun",27],["wings",17],["fries",5],["Chicken",24]],
      size: '100%',
      innerSize: '20%',
      showInLegend:true,
      dataLabels: {
        enabled: false
      }
    }]
    });
});


$(function () {
    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'barChart',
            type: 'column',
      animation: true,
      backgroundColor: null,
            margin: 100,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 50
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
    tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
    credits:{enabled:false},
        plotOptions: {
            column: {
                depth: 25
            }
        },
    colors: ['#30600b', '#26a80f','#d10c02','#fc382c'],
        series: [{
      name: 'Brands',
            colorByPoint: true,
      data: [
        {
          name: 'I\'m lovin',
          y: 20,
          drilldown: 'I\'m lovin'
        },
        {
          name: 'Everything on track',
          y: 15,
          drilldown: 'Everything on track'
        },
        {
          name: 'Few Concerns',
          y: 10,
          drilldown: 'Few Concerns'
        },
        {
          name: 'Not Happy Enough',
          y: 5,
          drilldown: 'Not Happy Enough'
        }
      ]
        }],
    drilldown: {
            series: [{
                name: 'I\'m lovin',
                id: 'I\'m lovin'
            }, {
                name: 'Everything on track',
                id: 'Everything on track'
            }, {
                name: 'Few Concerns',
                id: 'Few Concerns'
            }, {
                name: 'Not Happy Enough',
                id: 'Not Happy Enough'
            }]
        }
    });
});


$(function () {
    $('#stackChart').highcharts({

        chart: {
            type: 'column',
      animation: true,
      backgroundColor: null,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 0
            },
            marginTop: 0,
            marginRight: 100
        },

        title: {
            text: ''
        },
    subtitle: {
            text: ''
        },
    credits:{enabled:false},
        xAxis: {
            categories: ['BREAKFAST', 'LUNCH', 'SNACK', 'DINNER', 'LATE NIGHT']
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: ''
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40,
        dataLabels: {
                    enabled: true,
                    color: 'white',
                    style: {
                        textShadow: '0 0 1px black'
                    }
                }
            }
        },
    colors: ['#598fb2', '#fcd603', '#ec2405'],

        series: [{
            data: [15, 80, 10]
        }, {
            data: [28, 40, 12]
        }, {
            data: [70, 30, 20]
        }]
    });
});

$(function () {
    $('#area-chart').highcharts({
        chart: {
            type: 'area',
      animation: true,
      backgroundColor: null
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
    credits:{enabled:false},
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 3,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Quality',
      color: '#3498db',
            data: [10, 15, 50, 70, 80, 60, 40, 20]
        }, {
            name: 'SERVICE',
          color: '#e90000',
      data: [5, 10, 40, 80, 60, 30, 60, 10]
        },{
            name: 'CLEANLINESS',
      color: '#ffea00',
            data: [15, 20, 30, 50, 10, 20, 10, 0]
        }]
    });
});