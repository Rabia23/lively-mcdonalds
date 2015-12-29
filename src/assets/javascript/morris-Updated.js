$(function() {

	Morris.Area({
        element: 'morris-area-chart',
        data: [{ period: '2010 Q1', iphone: 2666, ipad: null, itouch: 2647 },
            { period: '2010 Q2', iphone: 2778, ipad: 2294, itouch: 2441 },
            { period: '2010 Q3', iphone: 4912, ipad: 1969, itouch: 2501 },
            { period: '2010 Q4', iphone: 3767, ipad: 3597, itouch: 5689 },
            { period: '2011 Q1', iphone: 6810, ipad: 1914, itouch: 2293 },
            { period: '2011 Q2', iphone: 5670, ipad: 4293, itouch: 1881 },
            { period: '2011 Q3', iphone: 4820, ipad: 3795, itouch: 1588 },
            { period: '2011 Q4', iphone: 15073, ipad: 5967, itouch: 5175 },
            { period: '2012 Q1', iphone: 10687, ipad: 4460, itouch: 2028 },
            { period: '2012 Q2', iphone: 8432, ipad: 5713, itouch: 1791 } ],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        hideHover: 'auto',
        resize: true,
        lineColors: ['#ffc300', '#ac1a1a','#3498db'],
        lineWidth:2,
        pointSize:1
    });

    Morris.Donut({
        element: 'morris-donut-chart1',
        data: [{ label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 } ],
        resize: true,
        colors: ['#ffc300', '#ac1a1a','#3498db']
    });
    Morris.Donut({
        element: 'morris-donut-chart2',
        data: [{ label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 } ],
        resize: true,
        colors: ['#ffc300', '#ac1a1a','#3498db']
    });
    Morris.Donut({
        element: 'morris-donut-chart3',
        data: [{ label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 } ],
        resize: true,
        colors: ['#ffc300', '#ac1a1a','#3498db']
    });
    Morris.Donut({
        element: 'morris-donut-chart4',
        data: [{ label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 } ],
        resize: true,
        colors: ['#ffc300', '#ac1a1a','#3498db']
    });
    Morris.Donut({
        element: 'morris-donut-chart5',
        data: [{ label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 } ],
        resize: true,
        colors: ['#ffc300', '#ac1a1a','#3498db']
    });
    Morris.Donut({
        element: 'morris-donut-chart6',
        data: [{ label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 } ],
        resize: true,
        colors: ['#ffc300', '#ac1a1a','#3498db']
    });

});
