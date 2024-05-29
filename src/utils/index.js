export const captureFrame = (src, time = 0) => {
  return new Promise((resolve) => {
    const player = document.createElement("video");
    player.currentTime = time;
    player.muted = true;
    player.src = src;
    player.autoplay = true;
    // player.src = URL.createObjectURL(src);
    player.addEventListener("canplay", () => {
      const canvas = document.createElement("canvas");
      canvas.width = player.videoWidth;
      canvas.height = player.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(player, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        resolve({
          blob,
          url: URL.createObjectURL(blob),
        });
      });
    });
  });
};

const helperCapure = (currentVideo, start = 0, finish = Infinity) => {
  const src = currentVideo.currentSrc;
  const target = [];
  const duration = ~~currentVideo.duration;

  if (start <= 0) start = 0;
  if (finish >= duration) finish = duration;

  return new Promise(async (resolve) => {
    for (let i = 0; i < duration; i++) {
      const r = await captureFrame(src, i);
      target[i] = r;
    }
    resolve(
      target.filter((_, i) => {
        return i >= start && i <= finish;
      })
    );
  });
};

export default helperCapure;
