import React from "react";
import { Card, Input, Radio, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import IntegerStep from "./IntegerStep";

function Selection({ callback }) {
  const regions = [
    { region: "Kanto", offset: 0, limit: 151 },
    { region: "Johto", offset: 151, limit: 251 },
    { region: "Hoenn", offset: 251, limit: 386 },
    { region: "Sinnoh", offset: 386, limit: 493 },
  ];
  const input = React.createRef(),
    radio = React.createRef();
  let radioValue = "",
    name = "",
    cardNumber = 6;

  return (
    <div className="content">
      <Card
        className="selection-card"
        hoverable
        title="Configuración"
        bordered={true}
        style={{ width: 400 }}
      >
        <Input
          ref={input}
          addonBefore="Nombre"
          className="input"
          size="large"
          placeholder="Amaury"
          prefix={<UserOutlined />}
          onChange={(e) => (name = e.target.value)}
        />
        <p className="selection-label">Región</p>
        <Radio.Group
          ref={radio}
          size="large"
          className="radio"
          buttonStyle="solid"
          onChange={(e) =>
            (radioValue = regions.find(
              (element) => element.region === e.target.value
            ))
          }
        >
          {regions.map((element) => {
            return (
              <Radio.Button className="radio-button" value={element.region}>
                {element.region}
              </Radio.Button>
            );
          })}
        </Radio.Group>
        <p className="selection-label">Número de pokes(6-24) </p>
        <IntegerStep callback={(value) => (cardNumber = value)} />
        <Button
          onClick={() => {
            callback(name, radioValue, cardNumber);
          }}
          block
          className="submit-button"
          type="primary"
          size="large"
        >
          Jugar!
        </Button>
      </Card>
    </div>
  );
}

export default Selection;
