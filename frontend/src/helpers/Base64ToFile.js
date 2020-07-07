export const decodeBase64 = (encodedImage, setDecodedImage) =>
  fetch(encodedImage)
    .then((res) => res.blob())
    .then((res) => {
      const fileName = new Date().getTime();
      setDecodedImage(
        new File([res], `${fileName}.jpg`, {
          type: "image/jpg",
        })
      );
    });
