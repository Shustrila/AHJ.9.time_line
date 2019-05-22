import Video from './posts/Video';
import Audio from './posts/Audio';
import Text from './posts/Text';
import Modal from './Modal';

class TimeLine {
  constructor(widget, message, postsList) {
    this.widget = widget;
    this.message = message;
    this.postsList = postsList;
    this.modal = new Modal();
    this.text = null;
    this.buttons = {};
    this.wrapper = {};

    this.init();
  }

  init() {
    if (!navigator.mediaDevices) {
      const wrapper = document.createElement('div');
      const title = document.createElement('h2');
      const info = document.createElement('p');

      title.className = 'modal__content-title';
      title.innerHTML = 'Внимание возникла проблема';
      info.className = 'modal__content-info';
      info.innerHTML = `
          Ваш браузер не подерживает media.
          По жтому вы не можете записывать аудио и видео
      `;

      wrapper.className = 'modal__content';
      wrapper.appendChild(title);
      wrapper.appendChild(info);

      this.modal.create(wrapper);
    } else {
      const audio = document.createElement('button');
      const video = document.createElement('button');

      this.wrapper = this.widget.querySelector('[data-wrapper=form]');

      audio.className = 'time-line__message-button';
      audio.innerHTML = 'A';
      audio.addEventListener('click', () => TimeLine.onClickAudio());

      video.className = 'time-line__message-button';
      video.innerHTML = 'V';
      video.addEventListener('click', () => TimeLine.onClickVideo());

      this.buttons = document.createElement('div');
      this.buttons.className = 'time-line__message-media';
      this.buttons.appendChild(audio);
      this.buttons.appendChild(video);
      this.wrapper.appendChild(this.buttons);
    }

    this.message.addEventListener('submit', e => this.onSubmitForm(e));
  }


  static async onClickAudio() {
    await new Audio().record({ audio: true, video: false });
  }

  static async onClickVideo() {
    await new Video().record({ audio: false, video: true });
  }

  onSubmitForm(e) {
    e.preventDefault();

    const { message } = e.currentTarget.elements;

    if (message.value.trim() !== '') {
      new Text(this).createItem(message.value);
      message.value = '';
    }
  }
}

export default TimeLine;
