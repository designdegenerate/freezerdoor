import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Layer, Stage, Text, Label, Group, Image, Tag } from "react-konva";
import useImage from "use-image";
import "./App.css";

function App() {
  const { register, handleSubmit } = useForm();
  const [getCards, setCards] = useState([
    {
      id: 1,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Febo_kalfsvleeskroket.jpg/800px-Febo_kalfsvleeskroket.jpg",
      width: 200,
      height: 100,
      text: "Nextbit Robin",
    },
    {
      id: 2,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Febo_kalfsvleeskroket.jpg/800px-Febo_kalfsvleeskroket.jpg",
      width: 200,
      height: 100,
      text: "Nextbit Robin",
    },
  ]);

  const initialState = {
    content: [
      {
        id: 1,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Febo_kalfsvleeskroket.jpg/800px-Febo_kalfsvleeskroket.jpg",
        width: 200,
        height: 100,
        text: "Nextbit Robin",
      },
      {
        id: 2,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Febo_kalfsvleeskroket.jpg/800px-Febo_kalfsvleeskroket.jpg",
        width: 200,
        height: 100,
        text: "Nextbit Robin",
      },
    ],
  };

  function reducer(state, action) {
    switch (action.type) {
      case "insert":
        return { content: state.count + 1 };
      case "delete":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </>
    );
  }

  const calculateIdealSize = (url) => {
    let image = new window.Image();
    image.src = url;

    let imgWidth = 0;
    let imgHeight = 0;

    if (image.naturalWidth > 200) {
      const scalingFactor = image.naturalWidth / 200;
      imgWidth = 200;
      imgHeight = image.naturalHeight / scalingFactor;
    } else {
      imgWidth = image.naturalWidth;
      imgHeight = image.naturalHeight;
    }

    image = null;

    return {
      width: imgWidth,
      height: imgHeight,
    };
  };

  const ImgCard = ({ url, width, height }) => {
    const [image] = useImage(url);

    return <Image width={width} height={height} image={image} />;
  };

  return (
    <main>
      <nav>
        <h1>The Cool Wall</h1>
      </nav>
      <details>
        <summary>+ Create New Entry</summary>
        <form
          onSubmit={handleSubmit((data) => {
            const idealSize = calculateIdealSize(data.url);

            const newCard = {
              id: getCards.length + 1,
              url: data.url,
              width: idealSize.width,
              height: idealSize.height,
              text: data.title,
            };

            setCards([...getCards, newCard]);
          })}
        >
          <label htmlFor="title">Title</label>
          <input {...register("title")} id="title" type="text"></input>
          <label htmlFor="url">Image URL</label>
          <input {...register("url")} id="url" type="url"></input>
          <button type="submit">Create</button>
        </form>
      </details>
      <div id="canvas-wrapper">
        <Stage width={3000} height={1000}>
          <Layer>
            {getCards.map((card) => {
              return (
                <Group
                  key={card.id}
                  draggable={true}
                  listening={true}
                  onDragEnd={(event) => {}}
                >
                  <ImgCard
                    url={card.url}
                    width={card.width}
                    height={card.height}
                  />
                  <Label offsetY={20}>
                    <Tag fill={"white"} />
                    <Text
                      fontStyle={"bold"}
                      padding={4}
                      fill={"#222"}
                      text={card.text}
                    />
                  </Label>
                </Group>
              );
            })}
          </Layer>
        </Stage>
        <div id="grid">
          <div id="col-one">
            <h2>Seriously Uncool</h2>
          </div>
          <div id="col-two">
            <h2>Uncool</h2>
          </div>
          <div id="col-three">
            <h2>Cool</h2>
          </div>
          <div id="col-four">
            <h2>Subzero</h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
