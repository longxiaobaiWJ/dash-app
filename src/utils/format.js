export const getFileName = (url) => {
  return url.split("/")?.pop();
};

const padStart = (time) => {
  return  (~~(time % 60)).toString().padStart(2, "0");
}

export const formatValue = (time = 0) => {
  const h = ["00", "00", "00", "00"];
  let currentVal = 0;
  let modVal = time % 1;
  if (modVal > 0) {
    h[currentVal] = modVal.toFixed(2).substring(2);
  }
  h[++currentVal] = padStart(time);
  while (currentVal < h.length) {
    let byVal = time / 60;
    h[currentVal++] = padStart(time);
    time = byVal >= 1 ? byVal : 0;
  }

  return h.reverse().join(":");
};
