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
        if(!$('#chart')[0]) return;
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
    renderMap();
    function renderMap(){
        if(!$('#sku-map')[0])return;

        var map = new BMap.Map("sku-map");
        map.centerAndZoom(new BMap.Point(108.403765, 36.914850), 5);
        var stdMapCtrl = new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_SMALL})
        map.addControl(stdMapCtrl);
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();
        function getBoundary(data){
            var bdary = new BMap.Boundary();
            bdary.get(data.split("-")[0], function(rs){

                var maxNum = -1, maxPly;
                var color = data.split("-")[1];

                var count = rs.boundaries.length;
                for(var i = 0; i < count; i++){
                    var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 1, strokeOpacity:0.5,fillColor:color,strokeColor: "#000000"});
                    map.addOverlay(ply);

                    //开始用"mouseover","mouseout"发现,鼠标移动过快,会多个省份也高亮了.所以改成 click了
                    ply.addEventListener("click", function (e) {
                        var latlng = e.point;
                        var info = new BMap.InfoWindow(name + " " + latlng.lat + "," + latlng.lng, {width:220});
                        map.openInfoWindow(info, latlng);

                        //高亮闪烁显示鼠标点击的省
                        delay = 0;
                        for (flashTimes = 0; flashTimes < 3; flashTimes++) {
                            delay += 200;
                            setTimeout(function () {
                                ply.setFillColor("#FFFF00");
                            }, delay);

                            delay += 200;
                            setTimeout(function () {
                                ply.setFillColor(color);
                            }, delay);
                        }
                    });
                }
                if(maxPly){
                    map.setViewport(maxPly.getPoints());
                }
            });
        }
       // map.panBy(100,-60);
        var datas = [
            "广西-#C8C1E3", "广东-#FBC5DC", "湖南-#DBEDC7", "贵州-#E7CCAF", "云南-#DBEDC7",
            "福建-#FEFCBF", "江西-#E7CCAF", "浙江-#C8C1E3", "安徽-#FBC5DC", "湖北-#C8C1E3",
            "河南-#DBECC8", "江苏-#DBECC8", "四川-#FCFBBB", "海南省-#FCFBBB", "山东-#FCFBBB", "辽宁-#FCFBBB",
            "新疆-#FCFBBB", "西藏-#E7CCAF", "陕西-#E7CCAF", "河北-#E7CCAF", "黑龙江-#E7CCAF", "宁夏-#FBC5DC",
            "内蒙古自治区-#DBEDC7", "青海-#DBEDC7", "甘肃-#C8C1E3", "山西-#FBC5DC", "吉林省-#C8C1E3",
            "北京-#FBC5DC", "天津-#C8C1E3", "上海-#FCFBBB", "重庆市-#FBC5DC", "香港-#C8C1E3"
        ];



        /*for(var i=0;i<datas.length;i++){
            getBoundary(datas[i]);
        }*/

        $.ajax({
            url:$('#sku-map').data('url'),
            type:'GET'
        }).done(function(res){

                for(var i=0;i<datas.length;i++){
                    getBoundary(datas[i]);
                }
                map.clearOverlays();
                map.disableDragging();
                map.disableScrollWheelZoom();
                map.disableDoubleClickZoom();
                map.disableKeyboard();
                map.disableContinuousZoom();
                //map.disablePinchToZoom();
        });


    }
});