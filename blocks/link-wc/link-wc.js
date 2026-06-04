class LinkWc extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'label'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  render() {
    const href = this.getAttribute('href') || '#';
    const label = this.getAttribute('label') || this.textContent.trim() || href;

    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: list-item;
          padding: 0.5rem 0;
          border-bottom: 1px solid #b2b2b2;
          list-style: none;
        }

        :host(:last-child) {
          border-bottom: none;
        }

        a {
          color: #0060a9;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      </style>
      <a href="${href}">${label}</a>
    `;
  }
}

customElements.define('link-wc', LinkWc);

export default LinkWc;
