export default class Alert {
  constructor(jsonPath = "/json/alerts.json") {
    this.jsonPath = jsonPath;
  }

  async loadAlerts() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("Failed to load alerts");
      const alerts = await response.json();

      if (alerts.length > 0) {
        this.render(alerts);
      }
    } catch (err) {
      alert("Error loading alerts. Please try again later.");
    }
  }

  render(alerts) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.background = alert.background;
      p.style.color = alert.color;
      p.style.padding = "1em";
      p.style.margin = "0";
      p.style.fontWeight = "bold";
      p.style.textAlign = "center";
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(section);
    }
  }
}
