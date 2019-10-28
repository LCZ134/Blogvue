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
          tableChart: function(id, blogRole) {
            this.chart = echarts.init(document.getElementById(id), 'purple-passion');
            this.chart.clear();

            blogRole = blogRole || [];

            var result = blogRole.map(i => {
              return {
                value: i.userCount,
                name: i.roleName
              }
            });

            const option = {
              backgroundColor: '#fff',
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: result.sort(function(a, b) { return a.value - b.value; }),
                roseType: 'radius',
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                  return Math.random() * 200;
                }
              }]
            };
            this.chart.setOption(option);
          },
          postChart: function(id, blogTag) {
            this.chart = echarts.init(document.getElementById(id), 'purple-passion');
            this.chart.clear();
            blogTag = blogTag || [];
            const option = {
              backgroundColor: '#fff',
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data: blogTag.map(i => i.title)
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
                data: blogTag.map(i => {
                  return { value: i.citationCount, name: i.title };
                })
              }]
            };
            this.chart.setOption(option);
          },
          monthChart: function(id, data) {
            this.chart = echarts.init(document.getElementById(id), 'purple-passion');
            this.chart.clear();
            data = data.reverse() || [];
            var title = ['product', '浏览', '发布文章', '评论', '点赞'];
            var contedata = data.map(i => {
              return Object.keys(i).map(s => {
                return s != "month" ? i[s] : `${i.month}月`;
              });
            })

            var option = {
              legend: {},
              tooltip: {},
              dataset: {
                source: [
                  title,
                  ...contedata
                ]
              },
              xAxis: { type: 'category' },
              yAxis: {},
              series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' }
              ]
            };
            this.chart.setOption(option);
          }
        }
      }
    }
  })
}

export default {
  install
}