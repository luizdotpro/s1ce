(() => {
    "use strict";

    const teaserTemplate = document.createElement("template");
    teaserTemplate.innerHTML = `
        <img id="channel">
        <img id="pic" onerror="this.remove()">
        <a id="url" target="_blank">
            <h1 id="name"></h1>
            <p id="desc"></p>
        </a>
    `;

    const styleTemplate = document.createElement("template");
    styleTemplate.innerHTML = `
        <style>
            :host(s1-teaser) {
                border-bottom: 1px solid black;
                display: block;
                padding: 1rem 0;
                overflow: hidden;
            }
            #channel {
                position: absolute;
                right: 0;
            }
            #name {
                color: var(--teaser-name-color, black);
                font-size: 1rem;
            }
            #pic {
                float: left;
                margin: 0 1rem;
            }
            #url {
                color: black;
                text-decoration: none;
            }
        </style>
    `;

    customElements.define("s1-teaser", class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({"mode": "open"});
        }

        connectedCallback() {
            const teaser = document.importNode(teaserTemplate.content, true);
            teaser.getElementById("name").innerText = this.getAttribute("name");
            teaser.getElementById("desc").innerText = this.getAttribute("desc");
            teaser.getElementById("url").setAttribute("href", this.getAttribute("url"));
            teaser.getElementById("pic").setAttribute("src", this.getAttribute("pic"));
            teaser.getElementById("channel").setAttribute("src", this.getAttribute("channel"));

            const style = document.importNode(styleTemplate.content, true);
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(teaser);
        }
    });
})();
