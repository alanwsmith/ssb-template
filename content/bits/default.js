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

  changeTheme(ev, _) {
    updateStyles(ev.prop("key"));
    this.api.trigger("syncCheckedTheme");
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

  syncCheckedTheme(_, el) {
    if (el.prop("key") === this.getCurrentTheme()) {
      console.log("HERE1");
      console.log(el);
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  }

  template(template) {
    switch (template) {
      case "item":
        return `
<button
  data-key="KEY" 
  data-send="changeTheme" 
  data-receive="syncCheckedTheme" 
>NAME</button>`;

      case "switcher":
        return `<div class="theme-switcher"><span>|</span> Theme: </div>`;
    }
  }
}
