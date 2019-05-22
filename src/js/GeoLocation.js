class GeoLocation {
  constructor() {
    this.inputError = '';
    this.content = {};
    this.error = null;
    this.latitude = 0;
    this.longitude = 0;
    this.accuracy = 0;

    this.init();
  }

  init() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude, accuracy } = position.coords;

        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
      }, (error) => {
        this.error = error;
      });
    }
  }

  static validateGeoLocation(val) {
    val.trim();

    const searchRegExp = '^[\\[|][-|\\d]+.[\\d]+[,|\\s]+[-|\\d]+.[\\d]+[\\]|]';
    const regExp = new RegExp(searchRegExp, 'i');

    return regExp.test(val);
  }

  onClickOkButton(post, manualInput) {
    const input = this.content.querySelector('[data-modal=input]');
    const error = this.content.querySelector('[data-modal=error]');
    const validate = GeoLocation.validateGeoLocation(input.value);

    if (error !== null) error.remove();

    if (validate) {
      window.TimeLine.modal.close();

      post.manualInput = true;
      post.createItem(post.content, manualInput);
    } else {
      const messageError = document.createElement('p');

      messageError.className = 'modal__content-error';
      messageError.innerHTML = this.inputError;
      messageError.dataset.modal = 'error';

      input.parentNode.prepend(messageError);
    }

    this.inputError = '';

    if (input.value === '') {
      this.inputError = 'Поле с геолакацией пустое!';
    } else {
      this.inputError = 'Не верный формат геолокации!';
    }
  }

  messageError(post) {
    this.content = document.createElement('div');

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
    ok.addEventListener('click', () => this.onClickOkButton(post, field.value));

    close.className = 'modal__content-button modal__content-close';
    close.innerText = 'ОТМЕНА';
    close.addEventListener('click', () => TimeLine.modal.close());

    this.content.className = 'modal__content';
    this.content.appendChild(title);
    this.content.appendChild(info);
    this.content.appendChild(titleField);
    this.content.appendChild(label);
    this.content.appendChild(ok);
    this.content.appendChild(close);

    return this.content;
  }
}

export default new GeoLocation();
