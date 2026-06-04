import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/nicolo-ribaudo/tc39-proposal-esm-cache/demo/libs/lit/3.2.1/lit-all.min.js';

async function loadStyleSheet(path) {
  const cssText = await fetch(path).then((res) => res.text());
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  return sheet;
}

const linkStyles = loadStyleSheet('/blocks/links-lit/link-lit.css');
const linksStyles = loadStyleSheet('/blocks/links-lit/links-lit.css');

class LinkLit extends LitElement {
  static properties = {
    href: { type: String },
    label: { type: String },
  };

  constructor() {
    super();
    this.href = '#';
    this.label = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.adoptedStyleSheets = [await linkStyles];
  }

  render() {
    return html`<a href="${this.href}">${this.label}</a>`;
  }
}

customElements.define('link-lit', LinkLit);

class LinksLit extends LitElement {
  static properties = {
    links: { type: Array },
  };

  constructor() {
    super();
    this.links = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.adoptedStyleSheets = [await linksStyles];
  }

  render() {
    return html`
      ${this.links.map(
    ({ href, text }) => html`<link-lit href="${href}" label="${text}"></link-lit>`,
  )}
    `;
  }
}

customElements.define('links-lit', LinksLit);

export default function decorate(block) {
  const links = [...block.children].map((row) => ({
    href: row.children[0]?.textContent?.trim() || '#',
    text: row.children[1]?.textContent?.trim() || '',
  }));

  const el = document.createElement('links-lit');
  el.links = links;
  block.replaceChildren(el);
}
