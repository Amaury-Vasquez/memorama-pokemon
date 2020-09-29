import React from "react";
import { Card, Image } from "antd";

import "../styles/index.css";

const { Meta } = Card;
// import { Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";

class PokeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: "",
      pokeData: props.data,
      callback: props.callback,
      index: props.index,
      matched: false,
      title: "",
      description: "",
      imageUrl: [
        "https://www.kindpng.com/picc/m/366-3667647_thumb-image-pokemon-go-gym-logo-png-transparent.png",
        `https://pokeres.bastionbot.org/images/pokemon/${props.data.id}.png`,
      ],
      activeUrl:
        "https://www.kindpng.com/picc/m/366-3667647_thumb-image-pokemon-go-gym-logo-png-transparent.png",
    };
  }

  render() {
    return (
      <Card
        hoverable
        onClick={() => {
          this.state.callback(this.state.index);
        }}
        cover={
          <Image
            className={this.state.classList}
            src={this.state.activeUrl}
            alt={this.state.pokeData.name}
            preview={false}
          />
        }
      >
        <Meta
          title={this.state.title}
          description={
            this.state.description !== "" ? `#${this.state.description}` : "???"
          }
        />
      </Card>
    );
  }
}

export default PokeCard;
