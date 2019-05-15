import TimeLine from './TimeLine';

const timeLine = document.querySelector('[data-widget=time-line]');
const message = timeLine.querySelector('.js-message');
const listPosts = timeLine.querySelector('.js-list-posts');

new TimeLine(timeLine, message, listPosts);
