jQuery(function($){

    if($("#datepicker")[0]){
		$("#datepicker").datepicker({
			altFormat: "yyyyy-mm-dd",
			appendText:"yyyy-mm-dd",
			dateFormat: "yy-mm-dd"
		});
	}
    //showChart();
    showChartByBeeChart();

    function showChart(){
        var el  =  $('#chart');
        if(!el[0]) return;
        var myChart = new Chart2D('chart');
        myChart.setSize(980, 500);
        myChart.setConfigFile(el.data('url'));
    }

    function showChartByBeeChart(){
        var chart = $('#chart').flash({
            swf        : '../static/plugins/beechart/beechart-line.swf',
            width      : 980,
            height     : 540,
            allowScriptAccess : "always",
            flashvars  : {
                dataUrl : $('#chart').data('url'),
                w:920,
                h:400
            }
        })
    }
});