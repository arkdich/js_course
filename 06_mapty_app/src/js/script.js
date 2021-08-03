import './map';
import { renderWorkouts } from './entryHandlers';
import { touchEnd, touchStart } from './touchHandlers';
import { centerOnMarker } from './mapHandlers';

const sidebar = document.querySelector('.sidebar');
const wrapper = document.querySelector('.entry-wrapper');

window.addEventListener('DOMContentLoaded', renderWorkouts);

sidebar.addEventListener('touchstart', touchStart);
sidebar.addEventListener('touchend', touchEnd);

wrapper.addEventListener('click', centerOnMarker);
