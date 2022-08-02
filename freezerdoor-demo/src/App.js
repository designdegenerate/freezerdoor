import axios from "axios";
import { createRef, useReducer } from "react";
import { useForm } from "react-hook-form";
import { Layer, Stage, Text, Label, Group, Tag, Rect } from "react-konva";
import "./App.css";
import { calculateIdealSize, ImgCard } from "./helpers";
import { reducer } from "./reducer";
import seriouslyUncool from "./images/seriously-uncool.svg";
import uncool from "./images/uncool.svg";
import cool from "./images/cool.png";
import subzero from "./images/subzero.png";

function App() {
  const { register, handleSubmit, reset } = useForm();
  const initialState = { content: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (data) => {
    let idealSize;
    const randomTilt = () => Math.random() * (2.5 - -2.5) + -2.5;

    calculateIdealSize(data.url)
      .then((results) => (idealSize = results))
      .then(async () => {
        const newCard = {
          id: state.content.length + Math.random() * 100,
          url: data.url,
          width: idealSize.width,
          height: idealSize.height,
          x: 100,
          y: 100,
          rotation: parseFloat(randomTilt().toFixed(4)),
          draggable: true,
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
      <details>
        <summary>+ New Entry</summary>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Ford Mondeo"
          ></input>
          <label htmlFor="url">Image URL</label>
          <input
            {...register("url")}
            id="url"
            type="url"
            placeholder="https://example.com/image.jpg"
          ></input>
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
                    draggable={card.draggable}
                    listening={true}
                    rotation={card.rotation}
                    onDragEnd={async (e) => {
                      const data = {
                        x: e.target.x(),
                        y: e.target.y(),
                      };
                      dispatch({
                        type: "move",
                        payload: {
                          ...card,
                          ...data,
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
                      stroke={card.draggable ? "white" : "red"}
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
                        onClick={async () => {
                          dispatch({
                            type: "delete",
                            payload: {id: card.id}
                          })
                        }}
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
          <div id="header">
            <img
              src={seriouslyUncool}
              alt="Seriously Uncool"
              decoding="async"
            ></img>
            <img src={uncool} alt="Uncool" decoding="async"></img>
            <img src={cool} alt="Cool" decoding="async"></img>
            <img src={subzero} alt="Subzero" decoding="async"></img>
          </div>
          <div id="col-one"></div>
          <div id="col-two"></div>
          <div id="col-three"></div>
          <div id="col-four"></div>
        </div>
      </div>
    </main>
  );
}

export default App;
