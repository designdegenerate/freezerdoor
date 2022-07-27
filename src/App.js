import { createRef, useReducer } from "react";
import { useForm } from "react-hook-form";
import { Layer, Stage, Text, Label, Group, Tag } from "react-konva";
import "./App.css";
import { calculateIdealSize, ImgCard } from "./helpers";

function App() {
  const { register, handleSubmit } = useForm();

  const initialState = {
    content: [
      {
        id: 1,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Febo_kalfsvleeskroket.jpg/800px-Febo_kalfsvleeskroket.jpg",
        width: 200,
        height: 100,
        x: 200,
        y: 400,
        text: "Nextbt",
      },
      {
        id: 23333,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Febo_kalfsvleeskroket.jpg/800px-Febo_kalfsvleeskroket.jpg",
        width: 200,
        height: 100,
        x: 500,
        y: 400,
        text: "Nextbit Robin",
      },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "insert":
        return { content: [...state.content, action.payload] };
      case "move":
        const i = state.content.findIndex((card) => {
          return card.id === action.payload.id;
        });
        const newState = [...state.content];
        newState[i] = action.payload;
        return { content: [...newState] };
      case "delete":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (data) => {
    const idealSize = calculateIdealSize(data.url);

    const newCard = {
      id: state.content.length + 1,
      url: data.url,
      width: idealSize.width,
      height: idealSize.height,
      x: 100,
      y: 100,
      text: data.title,
    };

    dispatch({
      type: "insert",
      payload: newCard,
    });
  };

  return (
    <main>
      <nav>
        <h1>The Cool Wall</h1>
      </nav>
      <details>
        <summary>+ Create New Entry</summary>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {state.content.map((card) => {
              const labelRef = createRef(null);
              return (
                <Group
                  key={card.id}
                  x={card.x}
                  y={card.y}
                  draggable={true}
                  listening={true}
                  onDragEnd={(event) => {
                    dispatch({
                      type: "move",
                      payload: "a",
                    });
                  }}
                  onMouseEnter={() => {
                    const label = labelRef.current;
                    label.setAttrs({ visible: true });
                  }}
                  onMouseLeave={() => {
                    const label = labelRef.current;
                    label.setAttrs({ visible: false });
                  }}
                >
                  <ImgCard
                    url={card.url}
                    width={card.width}
                    height={card.height}
                  />
                  <Label ref={labelRef} offsetY={20} visible={false}>
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
