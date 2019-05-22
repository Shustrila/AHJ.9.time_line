import moment from 'moment';
import GeoLocation from './GeoLocation';

class Posts {
  constructor() {
    this.type = '';
    this.manualInput = false;
    this.content = {};
    this.chunks = [];
    this.strem = null;
    this.recorder = null;
    this.info = null;
    this.nodeTimer = {};
    this.timer = {};
    this.time = 0;
  }

  async record(config = {}) {
    if (this.type === 'text') {
      throw new Error('Post type is not suitable for recording!');
    }

    try {
      if (!window.MediaRecorder) return;

      const { buttons } = window.TimeLine;

      this.content = document.createElement(this.type);
      this.strem = await navigator.mediaDevices.getUserMedia(config);
      this.recorder = new MediaRecorder(this.strem);

      this.recorder.addEventListener('start', () => this.onStartRecord());
      this.recorder.addEventListener('dataavailable', e => this.onDataAvailableRecord(e));
      this.recorder.addEventListener('stop', () => this.onStopRecord());

      buttons.remove();
      this.recorder.start();
    } catch (e) {
      const content = document.createElement('div');
      const title = document.createElement('h3');
      const info = document.createElement('p');

      title.className = 'modal__content-title';
      title.innerHTML = 'Возникла ошибка!!!';

      info.className = 'modal__content-info';
      info.innerHTML = `Ваш браузер блокирует возможность записи ${this.type}`;

      content.className = 'modal__content';
      content.appendChild(title);
      content.appendChild(info);

      window.TimeLine.modal.create(content);
      throw new Error(e);
    }
  }

  onStartRecord() {
    this.createInfoRecord();

    this.nodeTimer = this.info.querySelector('[data-rec=timer]');

    this.timer = setInterval(() => {
      this.time += 1000;
      this.nodeTimer.innerHTML = moment(this.time).format('mm:ss');
    }, 1000);
  }

  onDataAvailableRecord(e) {
    this.chunks.push(e.data);
  }

  onStopRecord() {
    clearInterval(this.timer);
    const blob = new Blob(this.chunks);

    this.content.className = `time-line__message-${this.type}`;
    this.content.controls = true;
    this.content.src = URL.createObjectURL(blob);
  }

  createInfoRecord() {
    const save = document.createElement('button');
    const timer = document.createElement('div');
    const close = document.createElement('button');
    const { wrapper } = window.TimeLine;

    save.className = 'time-line__message-button time-line__message-button--record';
    save.innerHTML = 'V';
    save.addEventListener('click', () => this.onSaveInfoRecord());

    timer.className = 'time-line__message-timer';
    timer.dataset.rec = 'timer';
    timer.innerHTML = '00:00';

    close.className = 'time-line__message-button time-line__message-button--record';
    close.innerHTML = 'X';
    close.addEventListener('click', () => this.onCloseInfoRecord());

    this.info = document.createElement('div');
    this.info.className = 'time-line__message-media time-line__message-media--record';
    this.info.appendChild(save);
    this.info.appendChild(timer);
    this.info.appendChild(close);

    wrapper.appendChild(this.info);
  }

  onCloseInfoRecord() {
    const { wrapper, buttons } = window.TimeLine;

    this.recorder.stop();
    this.strem.getTracks().forEach(track => track.stop());
    this.info.remove();
    wrapper.appendChild(buttons);
  }

  onSaveInfoRecord() {
    this.onCloseInfoRecord();
    this.createItem(this.content);
  }

  createItem(content, manualInput) {
    this.content = content;

    const { postsList, modal } = window.TimeLine;

    if (GeoLocation.error === null || this.manualInput) {
      const item = document.createElement('li');
      const time = document.createElement('p');
      const contentWrapper = document.createElement('div');
      const geo = document.createElement('p');

      time.className = 'time-line__post-title';
      time.innerHTML = moment(new Date()).format('YYYY.MM.DD hh:mm');

      contentWrapper.className = 'time-line__post-content';
      contentWrapper.appendChild(this.returnContent());

      geo.className = 'time-line__post-geo';

      if (!this.manualInput) {
        geo.innerHTML = `[${GeoLocation.latitude}, ${GeoLocation.longitude}]`;
      } else {
        geo.innerHTML = manualInput;
      }

      item.className = 'time-line__post';
      item.appendChild(time);
      item.appendChild(contentWrapper);
      item.appendChild(geo);

      postsList.appendChild(item);
    } else {
      modal.create(GeoLocation.messageError(this, this.content));
    }
  }

  returnContent() {
    return this.content;
  }
}

export default Posts;
