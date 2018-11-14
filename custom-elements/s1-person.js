(() => {
    "use strict";

    const personTemplate = document.createElement("template");
    personTemplate.innerHTML = `
        <h1 id="name"></h1>
        <img id="pic">
        <p id="desc"></p>
    `;

    const styleTemplate = document.createElement("template");
    styleTemplate.innerHTML = `
        <style>
            :host(s1-person) {
                display: block;
                overflow: hidden;
            }
            #name {
                font-style: italic;
            }
            #pic {
                float: left;
                margin: 0 1rem 1rem 0;
            }
        </style>
    `;

    customElements.define("s1-person", class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({"mode": "open"});
        }

        connectedCallback() {
            const person = document.importNode(personTemplate.content, true);
            person.getElementById("name").innerText = this.getAttribute("name");
            person.getElementById("pic").setAttribute("src", this.getAttribute("pic"));
            person.getElementById("desc").innerText = this.getAttribute("desc");

            const style = document.importNode(styleTemplate.content, true);
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(person);
        }
    });
})();
