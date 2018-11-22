// option config
export const pieOption = {
    title: {
      text: '教师性格特征',
      subtext: '数据来自学生问卷'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data:['热情','公平','严格','幽默']
    },
    series: [
      {
        name:'教师特质',
        type:'pie',
        radius: ['100%', '60%'],
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
        data:[
          {value:0, name:'热情'},
          {value:0, name:'公平'},
          {value:0, name:'严格'},
          {value:0, name:'幽默'}
        ]
      }
    ]
  };
  
  
  var pathSymbols = {
    famale: 'path://M173.2,314.4c21.3,3.199,47.3-1.701,75.7-3.4c5.3,1.199,10.6,2,16.1,2c5.6,0,11.1-0.801,16.6-2.1c73.9,3.6,131.5,24.5,131.5-125.9C413.1,82.9,346.8,0,265,0c-81.8,0-148.1,82.9-148.1,185c0,82.1,15.7,114,41.2,125.1C162.8,312.3,167.9,313.6,173.2,314.4z M149.6,127.3c15.5,21.5,55.7,16.9,90.4-10.3c8.8-6.9,16.5-14.8,22.7-22.8c0.8,0.1,1.6,0.2,2.4,0.4c3.4,0.6,6.5,1.8,10,2.9c3.101,1.5,6.5,2.7,9.5,4.6c3.101,1.6,5.9,3.8,8.7,5.7c2.5,2.2,5.3,4.3,7.4,6.7c2.199,2.2,4.3,4.6,5.899,6.9c1.8,2.2,3.101,4.5,4.4,6.5s2.399,3.8,3,5.4c1.5,3.1,2.399,4.9,2.399,4.9s-0.3-1.9-0.899-5.4c-0.2-1.8-0.7-3.8-1.3-6.2c-0.601-2.4-1.301-5.2-2.5-8c-1-2.9-2.4-5.9-4-9.1c-1.5-3.2-3.7-6.3-5.801-9.7c-2.5-3.1-4.8-6.5-7.8-9.5c-2.8-3.2-6.2-5.9-9.5-8.8c-3.1-2.2-6.399-4.6-9.899-6.5c1.5-3.1,2.699-6.3,3.699-9.3c12.4,5.6,25.101,12.7,35.2,22.8c37.101,37.1,22.5,80.2,51.101,51.7c4.5-4.5,8.199-9.2,11.1-13.9c1,0,2-0.1,2.8,0.1c3.9,1,6.4,4,7.8,6.4c3.9,6.5,4.801,15.9,2.4,25.3c-3.6,14-12.8,22.3-20.2,23.2l-6,0.8L361,188c-14.2,51.5-52.5,106.3-95.8,106.3c-43.3,0-81.5-54.8-95.8-106.3l-1.6-5.9l-6-0.8c-7.3-1-16.6-9.3-20.2-23.2c-2.4-9.4-1.5-18.8,2.4-25.3C144.9,131,146.9,128.7,149.6,127.3z,M376.3,327.9c-11.6,19.799-25.1,36.5-42.9,45.699c-36.8,18.8-64.199,34.2-64.199,34.2l-0.101-0.1v-0.301l-0.3,0.2l-0.3-0.2v0.301l-0.1,0.1c0,0-27.3-15.2-64.2-34.2c-17.8-9.199-31.2-25.9-42.9-45.699c-54.5,22.199-92.5,72.999-92.5,117.499c0,46.801,0,92.2,0,92.2h199.6h0.8h199.6c0,0,0-45.399,0-92.2C468.8,401,430.7,350.1,376.3,327.9z',
    male: 'path://M7.938,8.13c0.09,0.414,0.228,0.682,0.389,0.849c0.383,2.666,2.776,4.938,4.698,4.843c2.445-0.12,4.178-2.755,4.567-4.843c0.161-0.166,0.316-0.521,0.409-0.938c0.104-0.479,0.216-1.201-0.072-1.583c-0.017-0.02-0.127-0.121-0.146-0.138c0.275-0.992,0.879-2.762-0.625-4.353c-0.815-0.862-1.947-1.295-2.97-1.637c-3.02-1.009-5.152,0.406-6.136,2.759C7.981,3.256,7.522,4.313,8.078,6.32C8.024,6.356,7.975,6.402,7.934,6.458C7.645,6.839,7.833,7.651,7.938,8.13z,M23.557,22.792c-0.084-1.835-0.188-4.743-1.791-7.122c0,0-0.457-0.623-1.541-1.037c0,0-2.354-0.717-3.438-1.492l-0.495,0.339l0.055,3.218l-2.972,7.934c-0.065,0.174-0.231,0.289-0.416,0.289s-0.351-0.115-0.416-0.289l-2.971-7.934c0,0,0.055-3.208,0.054-3.218c0.007,0.027-0.496-0.339-0.496-0.339c-1.082,0.775-3.437,1.492-3.437,1.492c-1.084,0.414-1.541,1.037-1.541,1.037c-1.602,2.379-1.708,5.287-1.792,7.122c-0.058,1.268,0.208,1.741,0.542,1.876c4.146,1.664,15.965,1.664,20.112,0C23.35,24.534,23.614,24.06,23.557,22.792z,M13.065,14.847l-0.134,0.003c-0.432,0-0.868-0.084-1.296-0.232l1.178,1.803l-1.057,1.02l1.088,6.607c0.009,0.057,0.058,0.098,0.116,0.098c0.057,0,0.106-0.041,0.116-0.098l1.088-6.607l-1.058-1.02l1.161-1.776C13.888,14.756,13.487,14.83,13.065,14.847z'
  };
  var labelSetting = {
    normal: {
        show: true,
        position: 'right',
        offset: [10, 0],
        textStyle: {
            fontSize: 16
        }
    }
  };

  export const picbarOption = {
    title: {
        text: '性别组成',
        subtext: '数据来自学生问卷'
    },
    legend: {
        data: ['男生', '女生']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        containLabel: true,
        left: 20
    },
    yAxis: {
        data: ['组成'],
        inverse: true,
        axisLine: {show: false},
        axisTick: {show: false},
        axisLabel: {
            margin: 30,
            textStyle: {
                fontSize: 14
            }
        },
        axisPointer: {
            label: {
                show: true,
                margin: 30
            }
        }
    },
    xAxis: {
        splitLine: {show: false},
        axisLabel: {show: false},
        axisTick: {show: false},
        axisLine: {show: false}
    },
    series: [{
        name: '男生',
        type: 'pictorialBar',
        label: labelSetting,
        symbolRepeat: true,
        symbolSize: ['65%', '72%'],
        barCategoryGap: '40%',
        data: [{
            value: 0,
            symbol: pathSymbols.male
        }]
    }, {
        name: '女生',
        type: 'pictorialBar',
        barGap: '10%',
        label: labelSetting,
        symbolRepeat: true,
        symbolSize: ['65%', '85%'],
        data: [{
            value: 0,
            symbol: pathSymbols.famale
        }]
    }]
  };
  
  export const barOption = {
    title: {
      text: '课程基本特征',
      subtext: '数据来自学生问卷'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['本课程', '院系课程','全库课程']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['阅读量','作业量','难度系数']
    },
    series: [
        {
            name: '本课程',
            type: 'bar',
            data: [0, 0, 0]
        },
        {
            name: '院系课程',
            type: 'bar',
            data: [3.51, 3.33, 3.51]
        },
        {
          name: '全库课程',
          type: 'bar',
          data: [3.51, 3.60, 3.22]
        }
    ]
  };
  
  export const scatterOption = {
    title: {
      text: '学习方式',
      subtext: '数据来自学生问卷'
    },
    tooltip : {
      trigger: 'axis',
        showDelay : 0,
        axisPointer:{
        show: true,
          type : 'cross',
          lineStyle: {
          type : 'dashed',
            width : 1
        }
      },
      zlevel: 1
    },
    legend: {
      data:['学习方式']
    },
    toolbox: {
      show : true,
        feature : {
        mark : {show: true},
        dataZoom : {show: true},
        dataView : {show: true, readOnly: false},
        restore : {show: true},
        saveAsImage : {show: true}
      }
    },
    grid: {
      top: 80,
      bottom:50,
    },
    xAxis : [
      {
        type : 'value',
        name: '深度学习法',
        nameLocation: 'middle',
        max: 50,
        min: 0,
        scale:true
      }
    ],
    yAxis : [
    {
      type : 'value',
      name: '表层学习法',
      max: 50,
      min: 0,
      scale:true
    }
    ],
    series : [{
      symbolSize: 10,
      data: [
      ],
        type: 'scatter'
      }]
  };
  
  export const pieOption_grd = {
    title: {
      text: '年级组成',
      subtext: '数据来自学生问卷'
   },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data:['大一', '大二', '大三', '大四']
    },
    series: [
      {
        name:'年级组成',
        type:'pie',
        radius: ['100%', '60%'],
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
        data:[
          {value:0, name:'大一'},
          {value:0, name:'大二'},
          {value:0, name:'大三'},
          {value:0, name:'大四'}
        ]
      }
    ]
  };
  
  export const pieOption_org = {
    title: {
      text: '院系组成',
      subtext: '数据来自学生问卷'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data:[]
    },
    series: [
      {
        name:'院系组成',
        type:'pie',
        radius: ['100%', '60%'],
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
        data:[
        ]
      }
    ]
  };
  
  export const radarOption = {
    title: {
      text: '不同评价主体',
      subtext: '数据来自学生/自评/同行问卷'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['自评', '学生', '同行']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '1', max: 4},
        { name: '2', max: 4},
        { name: '3', max: 4},
        { name: '4.1', max: 4},
        { name: '4.2', max: 4},
        { name: '4.3', max: 4},
        { name: '5', max: 4}
      ]
    },
    series: [{
      name: '不同评价主体',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : [
        {
          value : [0, 0, 0, 0, 0, 0, 0],
          name : '自评'
        },
        {
          value : [0, 0, 0, 0, 0, 0, 0],
          name : '学生'
        },
        {
          value : [0, 0, 0, 0, 0, 0, 0],
          name : '同行'
        }
      ]
    }]
  };
  
  export const radarOption_std = {
    title: {
      text: '仅学生评价',
      subtext: '数据来自学生问卷'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['本课程', '院系', '全库']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '1', max: 4},
        { name: '2', max: 4},
        { name: '3', max: 4},
        { name: '4.1', max: 4},
        { name: '4.2', max: 4},
        { name: '4.3', max: 4},
        { name: '5', max: 4}
      ]
    },
    series: [{
      name: '仅学生评价',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : [
        {
          value : [0, 0, 0, 0, 0, 0, 0],
          name : '本课程'
        },
        {
          value : [3.5, 3.8, 3.3, 3.8, 3.5, 3.5, 3.3],
          name : '院系'
        },
        {
          value : [3.6, 3.2, 3.6, 3.3, 3.6, 3.2, 3.6],
          name : '全库'
        }
      ]
    }]
  };
  
  export const barOption_std = {
    title: {
      text: '学生满意度',
      subtext: '数据来自学生问卷'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['教师满意度', '课程满意度']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['本课程','院系','全库']
    },
    series: [
        {
            name: '教师满意度',
            type: 'bar',
            data: [0, 4.5, 4.6]
        },
        {
            name: '课程满意度',
            type: 'bar',
            data: [0, 4.43, 4.54]
        }
    ]
  };

  export const boxplotOption = {
    title: {
      text: '本课程满意度',
      subtext: '数据来自学生问卷'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
          type: 'shadow'
      }
    },
    xAxis: {
        data: ['教师满意度', '课程满意度']
    },
    yAxis: {},
    series: [
      {
        name: '本课程满意度',
        type: 'boxplot',
        data: [],
        tooltip: {
          formatter: function (param) {
              return [
                  param.name + ': ',
                  '上须: ' + param.data[5],
                  '上枢纽: ' + param.data[4],
                  '中位数: ' + param.data[3],
                  '下枢纽: ' + param.data[2],
                  '下须: ' + param.data[1]
              ].join('<br/>');
          }
        }
      },
      {
        name: '全库',
        type: 'scatter',
        data: []
      },
    ]
  };  