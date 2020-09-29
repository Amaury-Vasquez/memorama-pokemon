import React from "react";
import { Spin, Descriptions } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

import "../styles/index.css";
import PokeCard from "./PokeCard";

class Game extends React.Component {
  constructor(props) {
    super(props);
    const max = props.region.limit - props.region.offset;
    const min = 1;
    this.state = {
      loading: false,
      error: null,
      max,
      min,
      pokeCards: { references: [], cards: [] },
      pokeData: undefined,
      activeCard: { ref: undefined, id: -1 },
      active: false,
      score: 0,
    };
  }

  async getData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  generateUrl(offset, limit) {
    // `https://pokeapi.co/api/v2/pokemon?offset=151&limit=151`;
    return `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  }

  randomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomArray(len, max, min) {
    const a = new Set();
    while (a.size < len) a.add(this.randomInt(max, min));
    return Array.from(a);
  }

  async fetchData() {
    this.setState({ loading: true, error: null });
    try {
      const data = await this.getData(this.generateUrl(this.props.region.offset, this.props.region.limit)).then();
      const pokeData = await this.fetchPokes(data.results).then((res) =>
        Promise.all(res)
      );
      const pokeCards = this.createCards(pokeData);
      this.setState({ pokeCards, pokeData, loading: false, error: null });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  }

  async fetchPokes(data) {
    return data.map(
      async (element) => await this.getData(element.url).catch(() => ({}))
    );
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createCards(list) {
    const arr1 = this.randomArray(
      this.props.pokeNumber,
      this.state.max,
      this.state.min
    );
    const arr2 = arr1.slice();
    this.shuffle(arr1);
    const numbers = arr1.concat(arr2);
    const references = [];
    const cards = numbers.map((element, key) => {
      const ref = React.createRef();
      references.push(ref);
      return (
        <PokeCard
          data={list[element]}
          key={key}
          callback={this.callback.bind(this)}
          ref={ref}
          index={key}
        />
      );
    });
    return { references, cards };
  }

  setClassList(ref) {
    return ref.current.state.classList === "active" ? "" : "active";
  }

  setUrl(ref) {
    return ref.current.state.imageUrl[0] === ref.current.state.activeUrl
      ? ref.current.state.imageUrl[1]
      : ref.current.state.imageUrl[0];
  }

  callback(index) {
    const ref = this.state.pokeCards.references[index];
    const id = ref.current.props.data.id;
    let matched = ref.current.state.matched;
    if (!matched) {
      if (!this.state.active) {
        ref.current.setState({
          classList: this.setClassList(ref),
          activeUrl: this.setUrl(ref),
          title: ref.current.props.data.name,
          description: ref.current.props.data.id,
        });
        this.setState({ activeCard: { ref, id }, active: true });
      } else if (this.state.activeCard.ref !== ref) {
        const prevRef = this.state.activeCard.ref;
        const prevId = this.state.activeCard.id;
        let score = this.state.score;
        if (prevId === id) {
          matched = true;
          score++;
          prevRef.current.setState({ matched });
          ref.current.setState({
            classList: this.setClassList(ref),
            activeUrl: this.setUrl(ref),
            matched,
            title: ref.current.props.data.name,
            description: ref.current.props.data.id,
          });
        } else {
          ref.current.setState({
            classList: this.setClassList(ref),
            activeUrl: this.setUrl(ref),
            title: ref.current.props.data.name,
            description: ref.current.props.data.id,
          });
          setTimeout(() => {
            prevRef.current.setState({
              classList: this.setClassList(prevRef),
              activeUrl: this.setUrl(prevRef),
              title: "",
              description: "",
            });
            ref.current.setState({
              classList: this.setClassList(ref),
              activeUrl: this.setUrl(ref),
              title: "",
              description: "",
            });
          }, 1000);
        }
        this.setState({ activeCard: { ref, id }, active: false, score });
      }
    }
  }

  render() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return this.state.pokeData === undefined ? (
      <div className="content">
        <Spin size="large" indicator={antIcon} />
      </div>
    ) : (
      <React.Fragment>
        <Descriptions className="player-description" title="Memorama">
          <Descriptions.Item label="Jugador">
            {this.props.name}{" "}
          </Descriptions.Item>
          <Descriptions.Item label="Puntuación">
            {this.state.score}{" "}
          </Descriptions.Item>
          <Descriptions.Item label="Tiempo"></Descriptions.Item>
        </Descriptions>
        <div className="content">
          <div className="game-container">{this.state.pokeCards.cards} </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (this.state.score === this.props.pokeNumber) {
      Swal.fire({
        icon: "success",
        title: "Felicidades!",
        text: "Has ganado",
        footer: "Ingresa tus datos para jugar de nuevo",
      });
      this.props.callback();
    }
  }
}

export default Game;
