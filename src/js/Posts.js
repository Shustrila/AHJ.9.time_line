import moment from 'moment';

class Posts {
  constructor() {
    this.type = '';
    this.modal = {};
    this.manualInput = false;

    this.inputErrorGeo = '';
  }

  returnContent() {}

  validateGeoLocation(val) {
    val.trim();

    const regExp = new RegExp('([-|\\d]+.[\\d]+)[,|\\s]+([-|\\d]+.[\\d]+)', 'ig');
    const textVal = regExp.test(val);
    let validate = false;

    this.inputErrorGeo = '';

    if (textVal) {
      validate = textVal;
    } else if (val === '') {
      this.inputErrorGeo = 'Поле с геолакацией пустое!';
    } else {
      this.inputErrorGeo = 'Не верный формат геолокации!';
    }

    return validate;
  }

  async onClickOkButton(list, content, manualInput) {
    const input = this.modal.querySelector('[data-modal=input]');
    const error = this.modal.querySelector('[data-modal=error]');
    const validate = this.validateGeoLocation(input.value);

    if (error !== null) error.remove();

    if (validate) {
      this.manualInput = true;
      await this.createItem(list, content, manualInput);
      this.modal.remove();
    } else {
      const messageError = document.createElement('p');

      messageError.className = 'modal__content-error';
      messageError.innerHTML = this.inputErrorGeo;
      messageError.dataset.modal = 'error';

      input.parentNode.prepend(messageError);
    }
  }

  showModalGeo(list, content) {
    const modal = document.createElement('div');
    const contentBlock = document.createElement('div');
    const title = document.createElement('h4');
    const info = document.createElement('p');
    const titleField = document.createElement('h4');
    const label = document.createElement('label');
    const field = document.createElement('input');
    const ok = document.createElement('button');
    const close = document.createElement('button');

    title.className = 'modal__content-title';
    title.innerText = 'Что-то пошло не так!';

    info.className = 'modal__content-info';
    info.innerHTML = `
            К сожалению, нам не удалось определить маше место положение, 
            пожалуйста дайте разрешение на использование геолокации, 
            либо введите координаты вручную.
        `;

    titleField.className = 'modal__content-title';
    titleField.innerText = 'Широта и долгота через запятую';

    field.className = 'modal__content-field';
    field.dataset.modal = 'input';
    field.type = 'text';

    label.className = 'modal__content-label';
    label.appendChild(field);

    ok.className = 'modal__content-button modal__content-ok';
    ok.innerText = 'ОК';
    ok.addEventListener('click', () => this.onClickOkButton(list, content, field.value));

    close.className = 'modal__content-button modal__content-close';
    close.innerText = 'ОТМЕНА';
    close.addEventListener('click', () => this.modal.remove());

    contentBlock.className = 'modal__content';
    contentBlock.appendChild(title);
    contentBlock.appendChild(info);
    contentBlock.appendChild(titleField);
    contentBlock.appendChild(label);
    contentBlock.appendChild(ok);
    contentBlock.appendChild(close);

    modal.className = 'modal';
    modal.appendChild(contentBlock);

    this.modal = modal;

    document.body.prepend(this.modal);
  }

  getGeoLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((success) => {
          resolve(success);
        }, (error) => {
          resolve(error);
        });
      } else {
        reject('Error!');
      }
    });
  }

  async createItem(list, content, manualInput) {
    try {
      const geolocation = await this.getGeoLocation();

      if (geolocation.code !== 1 || this.manualInput) {
        const item = document.createElement('li');
        const time = document.createElement('p');
        const contentWrapper = document.createElement('div');
        const geo = document.createElement('p');
        const date = moment(new Date());

        time.className = 'time-line__post-title';
        time.innerHTML = date.format('YYYY.MM.DD hh:mm');

        contentWrapper.className = 'time-line__post-content';
        contentWrapper.appendChild(this.returnContent(content));

        geo.className = 'time-line__post-geo';

        if (!this.manualInput) {
          const { latitude, longitude } = geolocation.coords;
          geo.innerHTML = `[${latitude}, ${longitude}]`;
        } else {
          geo.innerHTML = manualInput;
        }

        item.className = 'time-line__post';
        item.appendChild(time);
        item.appendChild(contentWrapper);
        item.appendChild(geo);

        list.appendChild(item);
      } else {
        this.showModalGeo(list, content);
      }

      this.manualInput = false;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default Posts;
