import listPosts from './posts/list';

class TimeLine {
  constructor(widget, message, posts) {
    this.widget = widget;
    this.message = message;
    this.posts = posts;
    this.listPosts = listPosts;
    this.id = 0;

    this.init();
  }

  onSubmitForm(e) {
    e.preventDefault();

    const { message } = e.currentTarget.elements;

    if (message.value.trim() !== '') {
      for (const posts of this.listPosts) {
        if (posts.type === 'text') {
          posts.createItem(this.posts, message.value);

          message.value = '';
        }
      }
    }
  }

  init() {
    this.message.addEventListener('submit', e => this.onSubmitForm(e));
  }
}

export default TimeLine;
