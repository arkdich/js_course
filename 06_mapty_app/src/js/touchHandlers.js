import { stretchMap } from './mapHandlers';

let startingY;
let endingY;

export function touchStart(ev) {
  startingY = ev.changedTouches[0].clientY;
}

export function touchEnd(ev) {
  if (!ev.target.matches('.sidebar')) return;

  endingY = ev.changedTouches[0].clientY;

  if (endingY > startingY) stretchMap();
}
