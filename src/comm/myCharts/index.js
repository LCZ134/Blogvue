/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import echarts from 'echarts'

const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          Customized: function(id) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();

            const option = {
              backgroundColor: '#2c343c',

              title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                  color: '#ccc'
                }
              },

              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },

              visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                  colorLightness: [0, 1]
                }
              },
              series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                  { value: 335, name: '直接访问' },
                  { value: 310, name: '邮件营销' },
                  { value: 274, name: '联盟广告' },
                  { value: 235, name: '视频广告' },
                  { value: 400, name: '搜索引擎' }
                ].sort(function(a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                  normal: {
                    textStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                  return Math.random() * 200;
                }
              }]
            };

            this.chart.setOption(option);
          },

          Doughnut: function(id) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();

            const option = {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  { value: 335, name: '直接访问' },
                  { value: 310, name: '邮件营销' },
                  { value: 234, name: '联盟广告' },
                  { value: 135, name: '视频广告' },
                  { value: 1548, name: '搜索引擎' }
                ]
              }]
            };


            this.chart.setOption(option);
          },
        }
      }
    }
  })
}

export default {
  install
}