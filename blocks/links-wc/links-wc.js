import '../../blocks/link-wc/link-wc.js';

class LinksWc extends HTMLElement {
  connectedCallback() {
    const links = this.parseLinks();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: #fff;
          border: 1px solid #b2b2b2;
          border-radius: 6px;
          overflow: hidden;
          padding: 0;
        }
      </style>
      <slot></slot>
    `;

    // Clear original authored rows and replace with link-wc components
    this.innerHTML = '';
    links.forEach(({ href, text }) => {
      const link = document.createElement('link-wc');
      link.setAttribute('href', href);
      link.setAttribute('label', text);
      this.appendChild(link);
    });
  }

  parseLinks() {
    return [...this.children].map((row) => ({
      href: row.children[0]?.textContent?.trim() || '#',
      text: row.children[1]?.textContent?.trim() || '',
    }));
  }
}

customElements.define('links-wc', LinksWc);

export default function decorate(block) {
  const linksWc = document.createElement('links-wc');
  while (block.firstElementChild) linksWc.append(block.firstElementChild);
  block.replaceChildren(linksWc);
}
