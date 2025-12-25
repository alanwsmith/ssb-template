export class Main {
  bittyReady() {
    this.api.setProp("--load-hider", "1");
  }
}

export class ThemeSwitcher {
  #themes = [
    ["auto", "Auto"],
    ["light", "Light"],
    ["dark", "Dark"],
  ];

  #extraStyles = new CSSStyleSheet();

  bittyReady() {
    document.adoptedStyleSheets.push(this.#extraStyles);
    this.api.trigger("syncCheckedTheme");
    this.api.trigger("syncHighContrast");
  }

  getCurrentContrast() {
    return localStorage.getItem("contrast")
      ? localStorage.getItem("contrast")
      : "";
  }

  getCurrentTheme() {
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "auto";
  }

  setTheme(ev, _) {
    localStorage.setItem("theme", ev.prop("key"));
    switchColorStyles();
    this.api.trigger("syncCheckedTheme syncHighContrast");
  }

  themeSwitcher(_, el) {
    const switcher = this.api.makeElement(this.template("switcher"));
    for (let theme of this.#themes) {
      const subs = [
        ["KEY", theme[0]],
        ["NAME", theme[1]],
      ];
      const option = this.api.makeElement(this.template("item"), subs);
      switcher.appendChild(option);
    }
    switcher.appendChild(this.api.makeElement(this.template("spacer")));
    switcher.appendChild(this.api.makeElement(this.template("hc-button")));
    el.replaceChildren(switcher);
  }

  toggleHighContrast(ev, _) {
    let current = localStorage.getItem("contrast")
      ? localStorage.getItem("contrast")
      : "";
    if (current === "") {
      localStorage.setItem("contrast", "hc-");
    } else {
      localStorage.setItem("contrast", "");
    }
    switchColorStyles();
    this.api.trigger("syncHighContrast");
  }

  syncCheckedTheme(_, el) {
    if (el.prop("key") === this.getCurrentTheme()) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  }

  syncHighContrast(_, el) {
    /*
    if (this.getCurrentTheme() === "auto") {
      el.hidden = true;
    } else {
      el.hidden = false;
    }
    */

    if (this.getCurrentContrast() === "hc-") {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  }

  template(template) {
    switch (template) {
      case "hc-button":
        return `<button
  data-send="toggleHighContrast"
  data-receive="syncHighContrast"
>High Contrast</button>`;

      case "item":
        return `<button
  data-key="KEY" 
  data-send="setTheme" 
  data-receive="syncCheckedTheme" 
>NAME</button>`;

      case "spacer":
        return `<span>|</span>`;

      case "switcher":
        return `<div class="theme-switcher"><span>|</span> Colors: </div>`;
    }
  }
}
