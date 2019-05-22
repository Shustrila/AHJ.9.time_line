import TimeLine from './TimeLine';

const timeLine = document.querySelector('[data-widget=time-line]');
const message = timeLine.querySelector('[data-widget=time-line-form]');
const listPosts = timeLine.querySelector('[data-widget=time-line-posts]');

window.TimeLine = new TimeLine(timeLine, message, listPosts);
