import { useState } from "react";
import { Layer, Stage, Text, Label, Group, Image, Tag } from "react-konva";
import useImage from "use-image";
import "./App.css";

function App() {
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

  const ImgCard = ({ url }) => {
    const [image] = useImage(url);

    // Put them 0 so they don't render,
    // and also not crash
    let imgWidth = 0;
    let imgHeight = 0;

    if (image) {
      if (image.width > 200) {
        const scalingFactor = image.width / 200;
        imgWidth = 200;
        imgHeight = image.height / scalingFactor;
      } else {
        imgWidth = image.width;
        imgHeight = image.height;
      }
    }

    return <Image width={imgWidth} height={imgHeight} image={image} />;
  };

  return (
    <main>
      <nav>
        <h1>The Cool Wall</h1>
      </nav>
      <div id="canvas-wrapper">
        <Stage width={2000} height={2000}>
          <Layer>
            {getCards.map((card) => {
              return (
                <Group draggable={true}>
                  <ImgCard
                    key={card.id}
                    url={card.url}
                  />
                  <Label offsetY={20}>
                    <Tag fill={"white"} lineJoin={"round"} />
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
