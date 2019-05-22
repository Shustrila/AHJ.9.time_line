import Posts from '../Posts';

class Text extends Posts {
  constructor() {
    super();
    this.type = 'text';
  }

  returnContent() {
    const text = document.createElement('p');

    text.innerHTML = this.content;
    text.className = 'time-line__post-content-text';

    return text;
  }
}

export default Text;
