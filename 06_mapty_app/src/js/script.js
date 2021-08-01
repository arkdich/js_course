import { renderWorkouts } from './entryHandlers';
import './map';
import { throttle } from './throttle';
import { touchEnd, touchMove, touchStart } from './touchHandlers';

const sidebar = document.querySelector('.sidebar');

window.addEventListener('DOMContentLoaded', renderWorkouts);

sidebar.addEventListener('touchstart', touchStart);
sidebar.addEventListener('touchmove', throttle(touchMove, 150));
sidebar.addEventListener('touchend', touchEnd);
