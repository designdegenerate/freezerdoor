import { Image } from "react-konva";
import useImage from "use-image";

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

export {calculateIdealSize, ImgCard};