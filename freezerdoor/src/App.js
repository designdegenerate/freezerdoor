import axios from "axios";
import { createRef, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { Layer, Stage, Text, Label, Group, Tag, Rect } from "react-konva";
import "./App.css";
import { calculateIdealSize, ImgCard } from "./helpers";

function App() {
  const { register, handleSubmit, reset } = useForm();

  const initialState = {
    content: [],
  };

  const reducer = (state, action) => {
    const moveCard = () => {
      const i = state.content.findIndex((card) => {
        return card.id === action.payload.id;
      });
      const newState = [...state.content];
      newState[i] = action.payload;
      console.log(action.payload);
      return newState;
    };

    const deleteCard = () => {
      let i = state.content.findIndex((card) => {
        return card.id === action.payload;
      });
      const newState = [...state.content];
      newState.splice(i);
      return newState;
    };

    switch (action.type) {
      case "insertAll":
        return { content: action.payload };
      case "insert":
        return { content: [...state.content, action.payload] };
      case "move":
        return { content: moveCard() };
      case "delete":
        return { content: deleteCard() };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const content = await axios.get("http://localhost:4000/cards");

      dispatch({
        type: "insertAll",
        payload: content.data,
      });
    })();
  }, []);

  const onSubmit = (data) => {
    let idealSize;
    const randomTilt = () => Math.random() * (2.5 - -2.5) + -2.5;

    calculateIdealSize(data.url)
      .then((results) => (idealSize = results))
      .then(() => {
        const newCard = {
          id: state.content.length + 1,
          url: data.url,
          width: idealSize.width,
          height: idealSize.height,
          x: 100,
          y: 100,
          rotation: parseFloat(randomTilt().toFixed(4)),
          title: data.title,
        };

        dispatch({
          type: "insert",
          payload: newCard,
        });

        reset();
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
            {state.content.length > 0 ? (
              state.content.map((card) => {
                const labelRef = createRef(null);
                const overlayRef = createRef(null);

                return (
                  <Group
                    key={card.id}
                    x={card.x}
                    y={card.y}
                    draggable={true}
                    listening={true}
                    rotation={card.rotation}
                    onDragEnd={(e) => {
                      dispatch({
                        type: "move",
                        payload: {
                          ...card,
                          x: e.target.x(),
                          y: e.target.y(),
                        },
                      });
                    }}
                    onMouseEnter={() => {
                      const label = labelRef.current;
                      const overlay = overlayRef.current;
                      label.setAttrs({ visible: true });
                      overlay.setAttrs({ visible: true });
                    }}
                    onMouseLeave={() => {
                      const label = labelRef.current;
                      const overlay = overlayRef.current;
                      label.setAttrs({ visible: false });
                      overlay.setAttrs({ visible: false });
                    }}
                  >
                    <Rect
                      width={card.width}
                      height={card.height}
                      fill={"white"}
                      stroke={"white"}
                      strokeWidth={8}
                    />
                    <ImgCard
                      url={card.url}
                      width={card.width}
                      height={card.height}
                    />
                    <Group visible={false} ref={overlayRef}>
                      <Rect
                        width={card.width}
                        height={card.height}
                        opacity={0.5}
                        fill={"#000"}
                      />
                      <Text
                        fontStyle={"bold"}
                        fontSize={24}
                        fill={"white"}
                        text={"×"}
                        padding={2}
                        offsetX={-4}
                        offsetY={-2}
                        onClick={() =>
                          dispatch({
                            type: "delete",
                            payload: card.id,
                          })
                        }
                      />
                    </Group>
                    <Label
                      ref={labelRef}
                      offsetY={24}
                      visible={false}
                      padding={8}
                    >
                      <Tag fill={"white"} />
                      <Text
                        fontStyle={"bold"}
                        fontSize={16}
                        fill={"#222"}
                        text={card.title}
                        padding={4}
                      />
                    </Label>
                  </Group>
                );
              })
            ) : (
              <></>
            )}
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
