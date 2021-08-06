import './map';
import { renderWorkouts } from './entryHandlers';
import { touchEnd, touchStart } from './touchHandlers';
import { centerOnMarker, toggleMap } from './mapHandlers';
import { isMobile } from './utilities';

const sidebar = document.querySelector('.sidebar');
const wrapper = document.querySelector('.entry-wrapper');
const mapToggle = document.querySelector('.map-toggle');

window.addEventListener('DOMContentLoaded', renderWorkouts);

sidebar.addEventListener('touchstart', touchStart);
sidebar.addEventListener('touchend', touchEnd);

wrapper.addEventListener('click', centerOnMarker);

if (isMobile()) {
  mapToggle.addEventListener('click', toggleMap);
}
