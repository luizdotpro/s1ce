(() => {
    "use strict";

    const loadingTemplate = document.createElement("template");
    loadingTemplate.innerHTML = `<div id="loading">Loading...</div>`;

    customElements.define("s1-person-overview", class extends HTMLElement {
        constructor() {
            super();
            const observer = new MutationObserver((mutations) => {
                const mutation = mutations.reverse().find((mutation) => {
                    return "resource" === mutation.attributeName;
                });
                if (mutation) {
                    this.render();
                }
            });
            observer.observe(this, {attributes: true});
            this.attachShadow({"mode": "open"});
        }

        renderPerson(data) {
            const person = document.createElement("s1-person");
            person.setAttribute("desc", data.content);
            person.setAttribute("name", `${data.first_name} ${data.last_name}`);
            person.setAttribute("pic", data.image.path.replace(":width", 320).replace(":height", 240));
            return person;
        }

        renderTeaser(data) {
            const teaser = document.createElement("s1-teaser");
            teaser.setAttribute("desc", data.abstract);
            teaser.setAttribute("channel", data.channel.icon.path);
            teaser.setAttribute("name", data.title);
            teaser.setAttribute(
                "pic",
                data.main_image && data.main_image.path
                    .replace(":width", 100)
                    .replace(":height", 100)
            );
            teaser.setAttribute("url", data.url);
            return teaser;
        }

        render() {
            const loading = document.importNode(loadingTemplate.content, true);
            this.shadowRoot.innerHTML = "";
            this.shadowRoot.appendChild(loading);

            fetch(this.getAttribute("resource"))
                .then((response) => response.json())
                .then((data) => {
                    window.requestAnimationFrame(() => {
                        data.elements.forEach((thing) => {
                            if ("person" === thing.class) {
                                this.shadowRoot.appendChild(this.renderPerson(thing));
                            }
                            if ("widget" === thing.class && "person_article_list" === thing.type) {
                                thing.elements.forEach((article) => {
                                    this.shadowRoot.appendChild(this.renderTeaser(article));
                                });
                            }
                        });
                        this.shadowRoot.removeChild(this.shadowRoot.getElementById("loading"));
                    });
                })
                .catch(console.error.bind(console));
        }

        connectedCallback() {
            this.render();
        }
    });
})();
