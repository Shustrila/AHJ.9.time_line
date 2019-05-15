import Posts from '../Posts';

class Text extends Posts {
  constructor() {
    super();
    this.type = 'text';
  }

  returnContent(val) {
    const text = document.createElement('div');

    text.innerHTML = val;

    return text;
  }
}

export default new Text();
