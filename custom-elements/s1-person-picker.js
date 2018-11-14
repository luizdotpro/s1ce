(() => {
    "use strict";

    customElements.define("s1-person-picker", class extends HTMLElement {
        constructor() {
            super();
            this.resources = this.innerHTML.split("\n")
                .map((resource) => resource.trim())
                .filter((resource) => resource.length > 0);
            this.attachShadow({"mode": "open"});
        }

        renderPerson(resource) {
            if (this.person) {
                this.person.remove();
            }
            this.person = document.createElement("s1-person-overview");
            this.person.setAttribute("resource", resource);
            this.shadowRoot.appendChild(this.person);
        }

        // like React's componentDidMount
        connectedCallback() {
            const select = document.createElement("select");
            select.style.cssText = "display: block;";

            this.resources.forEach((resource) => {
                const option = new Option(resource);
                select.appendChild(option);
            });

            select.addEventListener("change", () => {
                this.renderPerson(select.value);
            })

            this.shadowRoot.appendChild(select);
            this.renderPerson(select.value);
        }
    });
})();
