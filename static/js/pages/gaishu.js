jQuery(function($){
    var myChart = new Chart2D('chart'),
        el = $('#chart');
    myChart.setSize(980, 500);
    myChart.setConfigFile(el.data('url'));

    jQuery('#last-7day').on('click',function(){
        myChart.setConfigFile($(this).data('url'));
    });
    jQuery('#select-week').change(function(){
        myChart.setConfigFile($(this).val());

    });
});