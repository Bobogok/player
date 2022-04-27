export const trottlingEvents = (function () {
  let last: { [key: string]: number } = {};
  let diff: number;
  let time: number;

  return function (cb: () => void, delay: number, id: string) {
    time = new Date().getTime();
    id = id || 'ignored event';
    diff = last[id] ? time - last[id] : time;

    if (diff > delay) {
      last[id] = time;
      cb();
    }
  };
})();

export const convertToSeconds = (time: number) => {
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  let seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
};
