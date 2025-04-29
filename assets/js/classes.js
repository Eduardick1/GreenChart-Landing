const noOverflowClassName = "no-overflow";

export class PhoneMask {
  /**
   * Создает экземпляр маски телефона
   * @param {Object} options - Настройки маски
   * @param {HTMLElement} options.container - Контейнер формы
   * @param {Array} options.countries - Массив стран и их масок
   * @param {string} options.defaultCountry - Код страны по умолчанию
   */
  constructor(container) {
    this.container = container;
    this.defaultCountry = PhoneMask.defaultCountries[0].code;

    // Находим элементы внутри контейнера
    this.countrySelect = this.container.querySelector(".countries");
    this.phoneInput = this.container.querySelector("input[name=phone]");

    // Экземпляр маски IMask
    this.maskInstance = null;

    // Инициализация
    this.init();
  }

  /**
   * Инициализация маски
   */
  init() {
    // Заполняем список стран
    this.populateCountries();

    // Устанавливаем обработчик события изменения страны
    this.container.addEventListener("click", (e) => {
      if (e.target.closest(".current-flag"))
        this.container.classList.toggle("open");
      const country = e.target.closest(".country");
      if (country) {
        this.updateMask(country.dataset.code);
        this.container.classList.remove("open");
      }
    });

    // Инициализируем маску с выбранной страной
    this.updateMask(this.defaultCountry);

    // Устанавливаем выбранную страну в селекте
  }

  /**
   * Заполняет выпадающий список стран
   */
  populateCountries() {
    PhoneMask.defaultCountries.forEach((country) => {
      const option = document.createElement("li");
      option.innerHTML = ` <button data-code=${country.code} type="button" class="country">
                              <span class="country-flag">${country.flag}</span>
                              <p class="country-name">${country.name}</p>
                            </button>`;
      this.countrySelect.appendChild(option);
    });
  }

  /**
   * Обновляет маску при изменении страны
   * @param {string} countryCode - Код выбранной страны
   */
  updateMask(countryCode) {
    const country =
      PhoneMask.defaultCountries.find((c) => c.code === countryCode) ||
      PhoneMask.defaultCountries[0];

    // Обновляем отображение текущей маски

    // Если маска уже существует, уничтожаем её
    if (this.maskInstance) {
      this.maskInstance.destroy();
    }

    // Создаем новую маску с выбранным форматом
    const maskOptions = {
      mask: country.mask,
      lazy: false, // Показывать маску сразу
      placeholderChar: "_",
      definitions: {
        0: /[0-9]/,
      },
    };
    this.phoneInput.value = "";
    // Используем глобальную переменную IMask, а не импортированную
    this.maskInstance = new IMask(this.phoneInput, maskOptions);

    // Устанавливаем начальное значение с кодом страны
    const codePrefix = country.mask.substring(0, country.mask.indexOf("0") - 1);
    if (!this.phoneInput.value || this.phoneInput.value === "") {
      this.maskInstance.value = codePrefix;
    }
  }

  /**
   * Получает текущее значение телефона
   * @returns {string} Текущее значение телефона
   */
  getValue() {
    return this.maskInstance ? this.maskInstance.value : "";
  }

  /**
   * Устанавливает значение телефона
   * @param {string} value - Значение для установки
   */
  setValue(value) {
    if (this.maskInstance) {
      this.maskInstance.value = value;
    }
  }

  /**
   * Сбрасывает значение телефона до кода страны
   */
  reset() {
    const country =
      PhoneMask.defaultCountries.find(
        (c) => c.code === this.countrySelect.value
      ) || PhoneMask.defaultCountries[0];
    const codePrefix = country.mask.substring(0, country.mask.indexOf("0") - 1);

    if (this.maskInstance) {
      this.maskInstance.value = codePrefix;
    }
  }

  /**
   * Стандартный набор стран и их масок
   */
  static get defaultCountries() {
    return [
      {
        code: "gb",
        name: "Великобритания",
        flag: "🇬🇧",
        mask: "+44 (0000) 000-000",
      },
      {
        code: "ru",
        name: "Россия",
        flag: "🇬🇧",
        placeholder: "+7",
        mask: "+7 (000) 000-00-00",
      },
      {
        code: "us",
        name: "США",
        flag: "🇬🇧",
        placeholder: "+1",
        mask: "+1 (000) 000-0000",
      },
      {
        code: "de",
        name: "Германия",
        flag: "🇬🇧",
        placeholder: "+49",
        mask: "+49 (000) 0000-0000",
      },
      {
        code: "fr",
        name: "Франция",
        flag: "🇬🇧",
        placeholder: "+33",
        mask: "+33 (0) 00-00-00-00",
      },
      {
        code: "cn",
        name: "Китай",
        flag: "🇬🇧",
        placeholder: "+86",
        mask: "+86 (000) 0000-0000",
      },
      {
        code: "jp",
        name: "Япония",
        flag: "🇬🇧",
        placeholder: "+81",
        mask: "+81 (00) 0000-0000",
      },
      {
        code: "br",
        name: "Бразилия",
        flag: "🇬🇧",
        placeholder: "+55",
        mask: "+55 (00) 00000-0000",
      },
    ];
  }
}
export class Menu {
  static openClassName = "open";
  static el = document.querySelector("[data-menu=menu]");
  static btn = document.querySelector("[data-menu=btn]");
  static open = () => {
    document.documentElement.classList.add(noOverflowClassName);
    this.el.classList.add(this.openClassName);
    this.btn.ariaExpanded = true;
  };
  static close = () => {
    this.el.classList.remove(this.openClassName);
    document.documentElement.classList.remove(noOverflowClassName);
    this.btn.ariaExpanded = false;
  };
  static toggle = () => {
    if (this.el.classList.contains(this.openClassName)) this.close();
    else this.open();
  };
}

export class Modal {
  static closingClassName = "closing";
  static el = document.querySelector("[data-modal=modalForm]");
  static open = () => this.el.showModal();
  static close = () => {
    Promise.race([
      new Promise((resolve) =>
        this.el.addEventListener("animationend", () => resolve(), {
          once: true,
        })
      ),
      new Promise((resolve) => setTimeout(() => resolve(), 1000)),
    ]).then(() => {
      this.el.classList.remove(this.closingClassName);
      this.el.close();
    });
    this.el.classList.add(this.closingClassName);
  };
  static bindEvents = (() => {
    this.el.addEventListener("cancel", (e) => {
      e.preventDefault();
      this.close();
    });
  })();
}

export class Timer {
  constructor(time) {
    this.remainigTime = time;
    this.timer = null;
    this.init();
  }
  init() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.remainigTime--;
      this.render();
      if (this.remainigTime <= 0) this.init(); // mock
    }, 1000);
  }
  render() {
    const minutes = Math.floor((this.remainigTime % 3600) / 60);
    const seconds = this.remainigTime % 60;
    const container = document.getElementById("timer");
    container.querySelector("[data-time=minute]").textContent =
      this.formatToString(minutes);
    container.querySelector("[data-time=seconds]").textContent =
      this.formatToString(seconds);
  }
  formatToString(time) {
    return (time < 10 ? "0" : "") + time;
  }
}
