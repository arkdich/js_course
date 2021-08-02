import './map';
import { renderWorkouts } from './entryHandlers';
import { throttle } from './throttle';
import { touchEnd, touchMove, touchStart } from './touchHandlers';

const sidebar = document.querySelector('.sidebar');

window.addEventListener('DOMContentLoaded', renderWorkouts);

sidebar.addEventListener('touchstart', touchStart);
sidebar.addEventListener('touchend', touchEnd);
