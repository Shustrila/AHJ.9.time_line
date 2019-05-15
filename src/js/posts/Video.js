import Posts from '../Posts';

class Video extends Posts {
  constructor() {
    super();
    this.type = 'video';
  }
}

export default new Video();
