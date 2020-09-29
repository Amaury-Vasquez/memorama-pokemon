import React from "react";
import { Slider, InputNumber, Row, Col } from "antd";

class IntegerStep extends React.Component {
  state = {
    inputValue: 5,
  };

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
    this.props.callback(value);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Row className="integer-slider">
        <Col span={12}>
          <Slider
            min={5}
            max={24}
            onChange={this.onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            size="large"
            min={6}
            max={24}
            style={{ margin: "0 16px" }}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}

export default IntegerStep;
