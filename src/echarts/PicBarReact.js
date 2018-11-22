import React from 'react'
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/component/title'

export default class PictorialBarReact extends React.Component {
  
  constructor(props) {
    super(props)
    this.initPie = this.initPie.bind(this)
  }
  
  initPie() {
    const { option={} } = this.props 
    let myChart = echarts.init(this.ID, 'light') //init echarts
    
    //set options
    myChart.setOption(option)
    window.onresize = function() {
      myChart.resize()
    }
  }
  
  componentDidMount() {
    this.initPie()
  }
  
  componentDidUpdate() {
    this.initPie()
  }
  
  render() {
    const { width="100%", height="245px"} = this.props
    return <div ref={ID => this.ID = ID} style={{width, height}}></div>
  }
}