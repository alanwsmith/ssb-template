export class Main {
  bittyReady() {
    this.api.setProp("--load-hider", "1");
  }
}

export class ThemeSwitcher {
  #themes = [
    ["auto", "Auto"],
    ["light", "Light"],
    ["hc-light", "HC Light"],
    ["dark", "Dark"],
    ["hc-dark", "HC Dark"]
  ];

  changeTheme(ev, _el) {
    if (ev.type === "input") {
      updateStyles(ev.target.value);
      this.api.trigger("syncCheckedTheme");
    }
  }

  getCurrentTheme() {
    let current = localStorage.getItem("theme");
    if (current) {
      return current;
    } else {
      return "auto";
    }
  }

  themeSwitcher(ev, el) {
    const switcher = this.api.makeElement(this.template("switcher"));
    for (let theme of this.#themes) {
      const checked = this.getCurrentTheme() === theme[0] ? "checked" : "";
      const subs = [
        ["KEY", theme[0]],
        ["NAME", theme[1]],
        ["LOCATION", el.dataset.location],
        ["CHECKED", checked],
      ];
      const option = this.api.makeElement(this.template("item"), subs);
      switcher.appendChild(option);
    }
    el.replaceChildren(switcher);
  }

  syncCheckedTheme(_event, el) {
    if (el.value === this.getCurrentTheme()) {
      el.checked = true;
    } else {
      el.checked = false;
    }
  }

  template(template) {
    switch(template) {
      case "item": 
        return `<div><label>
  <input type="radio" 
    name="mode-LOCATION" 
    value="KEY" 
    data-send="changeTheme" 
    data-receive="syncCheckedTheme" 
    CHECKED
/> NAME</label></div>`;

      case "switcher":
        return `<div class="theme-switcher"></div>`;
    }
  }
}
