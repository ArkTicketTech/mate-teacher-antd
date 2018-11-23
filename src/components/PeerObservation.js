import React from 'react';
import { Row, Col, List } from 'antd';

class PeerObservation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var Posdata = [];
    var Negdata = [];
    if(this.props.Posdata.length == 0) {
      Posdata = ['无']
    } else {
      Posdata = this.props.Posdata
    }
    if(this.props.Negdata.length == 0) {
      Negdata = ['无']
    } else {
      Negdata = this.props.Negdata
    }
    return (
      <div>
        <Row  type="flex" justify="start">
          <Col span={10}>
          <List
              // size='small'
              header={<div>建议增加行为</div>}
              bordered
              dataSource={Posdata}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </Col>
          <Col span={10} offset={1}>
            <List
              // size='small'
              header={<div>建议减少行为</div>}
              bordered
              dataSource={Negdata}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PeerObservation;