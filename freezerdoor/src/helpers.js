import { Image } from "react-konva";
import useImage from "use-image";

const calculateIdealSize = async (url) => {
  let img;
  const results = {
    width: 0,
    height: 0,
  };

  const loadImage = new Promise((resolve, reject) => {
    img = new window.Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  await loadImage
    .then((img) => {
      const width = img.target.naturalWidth;
      const height = img.target.naturalHeight;
      const rotation = width >= height ? "land" : "port";
      let longSide;
      let shortSide;

      if (rotation === "land") {
        longSide = { px: width, type: "width" };
        shortSide = { px: height, type: "height" };
      } else {
        longSide = { px: height, type: "height" };
        shortSide = { px: width, type: "width" };
      }

      if (longSide.px > 200) {
        const scalingFactor = longSide.px / 200;
        results[longSide.type] = 200;
        const finalShortSide = shortSide.px / scalingFactor
        results[shortSide.type] = parseFloat(finalShortSide.toFixed(4));
      } else {
        results.width = width;
        results.height = height;
      }

  })
  .catch((err) => console.log(err));

  return {
    width: results.width,
    height: results.height,
  };
};

const ImgCard = ({ url, width, height }) => {
  const [image] = useImage(url);

  return <Image width={width} height={height} image={image} />;
};

export { calculateIdealSize, ImgCard };
