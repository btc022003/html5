
/***
 * 可以对功能进行扩展 根据坐标或者ip获取当前用户的城市信息 然后去取天气数据
 *
 * 取ip需要使用服务器端代码 然后根据ip获取城市信息
 *
 */
// getLocation()
// function getLocation() {
//     //////判断设备是否支持获取坐标信息
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     }
//     else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
// function showPosition(position) {
//     var str = "Latitude: " + position.coords.latitude +
//         "<br />Longitude: " + position.coords.longitude;
//     console.log(str)
// }
// function showError(err){
//     console.log(err)
// }


/****
 *
 * 接口地址 http://apistore.baidu.com/apiworks/servicedetail/112.html
 *
 * 展示最近的温度变化曲线 高温和低温
 * 获取过去7天和今天以及未来四天的天气信息
 * 两根线
 *  高温和低温
 *
 *
 */

console.log(returnCitySN) ////通过js文件引入(http://pv.sohu.com/cityjson?ie=utf-8)获取ip的json变量
var ip = returnCitySN.cip

//////根据ip获取城市数据
var getAddressByIp = $.ajax({
  url:"http://apis.baidu.com/showapi_open_bus/ip/ip?ip="+ip,
  headers: {
      'apikey': '6df030858631cb00d3a2ab0da6f013e1'
  },
  dataType: 'json',
}).done(function(res){
  return res
})

/////根据城市名称获取城市编码数据
getAddressByIp.then(function(res){
  console.log(res)
  var getAddressInfoByCityName = $.ajax({
    url: "http://apis.baidu.com/apistore/weatherservice/cityinfo?cityname="+res.showapi_res_body.city,
    headers: {
        'apikey': '6df030858631cb00d3a2ab0da6f013e1'
    },
    dataType: 'json'
  }).done(function(data){
    return data
  })
  getAddressInfoByCityName.then(function(res){
    console.log(res)
    var city = res.retData
    initChartData(city.cityName,city.cityCode)
  })

})

// $.ajax({
//   url:"http://apis.baidu.com/showapi_open_bus/ip/ip?ip="+ip,
//   headers: {
//       'apikey': '6df030858631cb00d3a2ab0da6f013e1'
//   },
//   dataType: 'json',
//   success:function(resAddress){
//     console.log(resAddress)
//     var cityName = resAddress.showapi_res_body.city
//   },
//   error:function(err){
//     console.log(err)
//   }
// })

function initChartData(cityName,cityId){
  $.ajax({
      url: "http://apis.baidu.com/apistore/weatherservice/recentweathers?cityname="+cityName+"&cityid="+cityId,
      headers: {
          'apikey': '6df030858631cb00d3a2ab0da6f013e1'
      },
      dataType: 'json',
      success: function (res) {
          console.log(res.retData)
          // console.log(res.retData.forecast)
          var resData = [] /////总共的12天天气数据
          resData = res.retData.forecast ////未来四天
          resData.unshift(res.retData.today) ////把今天加在数组的最前面
          resData = res.retData.history.concat(resData) ////把历史数据和上一步的数据拼接

          ////// 用于在图表上显示的数据
          var chartData = {}
          chartData.date = [] ////日期 横坐标
          chartData.lowtemp = [] ////低温线数据
          chartData.hightemp = [] /////高温线数据
          chartData.aqi = [] /////空气质量指数
          resData = resData.forEach(function (item) {
              item.lowtemp = Number(item.lowtemp.replace("℃", ""))
              item.hightemp = Number(item.hightemp.replace("℃", ""))
              chartData.date.push(item.date)
              chartData.lowtemp.push(item.lowtemp)
              chartData.hightemp.push(item.hightemp)
              chartData.aqi.push(!!item.aqi ? Number(item.aqi) : 0)
              // return item
          })

          $('#container').highcharts({
              chart: {
                  type: 'spline'
              },
              title: {
                  text: '最近七天温度'
              },
              subtitle: {
                  text: cityName+'最近七点的高温和低温'
              },
              //////横轴数据
              xAxis: {
                  categories: chartData.date ////显示日期部分数据
              },
              yAxis: {
                  title: {
                      text: '温度'
                  },
                  labels: {
                      formatter: function () {
                          return this.value + '°';
                      }
                  }
              },
              tooltip: {
                  crosshairs: true,
                  shared: true
              },
              plotOptions: {
                  spline: {
                      marker: {
                          radius: 4,
                          lineColor: '#666666',
                          lineWidth: 1
                      }
                  }
              },
              ////两根线
              series: [{
                  name: '高温',
                  marker: {
                      symbol: 'square'
                  },
                  data: chartData.hightemp
              }, {
                      name: '低温',
                      marker: {
                          symbol: 'diamond'
                      },
                      data: chartData.lowtemp
                  }, {
                      name: '空气质量指数',
                      marker: {
                          symbol: 'diamond'
                      },
                      data: chartData.aqi
                  }]
          });

          $("#container text").last().html("") ////去除结尾部分的链接
      },
      error: function (err) {
          console.log(err)
      }
  })
}
