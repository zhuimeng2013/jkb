jQuery(function($){
    $("#datepicker").datepicker({
        altFormat: "yyyyy-mm-dd",
        appendText:"yyyy-mm-dd",
        dateFormat: "yy-mm-dd"
    });

    showChart();

    function showChart(){
        var el  =  $('#chart');
        if(!el[0]) return;
        var myChart = new Chart2D('chart');
        myChart.setSize(980, 500);
        myChart.setConfigFile(el.data('url'));
    }
});