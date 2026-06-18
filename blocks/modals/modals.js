import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * EDS-style block decorator for `modal-demo`.
 *
 * Receives the raw block markup that EDS produces from authored content
 * (a div containing key/value pairs as nested divs) and replaces it with
 * a button that opens a configured <fe-modal>.
 */
export default function decorate(block) {
  // Parse the EDS key/value structure.
  // EDS wraps cell content in <p> tags, so use textContent for scalar fields
  // and innerHTML only for the body field which may contain rich text.
  const config = {};
  const HTML_FIELDS = ['body'];
  block.querySelectorAll(':scope > div').forEach((row) => {
    const [keyCell, valueCell] = row.children;
    if (!keyCell || !valueCell) return;
    const key = keyCell.textContent.trim().toLowerCase();
    config[key] = HTML_FIELDS.includes(key)
      ? valueCell.innerHTML.trim()
      : valueCell.textContent.trim();
  });

  // Build trigger button
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'modal-demo__trigger';
  button.innerHTML = config.heading || 'Open modal';

  // Build the modal
  const modal = document.createElement('fe-modal');
  modal.setAttribute('heading', config.heading || '');
  if (config.variant) modal.setAttribute('variant', config.variant);
  if (config.size) modal.setAttribute('size', config.size);

  const body = document.createElement('div');
  body.innerHTML = config.body || '';
  modal.appendChild(body);

  // Build footer buttons from comma-separated list
  const buttonLabels = config.buttons
    ? config.buttons.split(',').map((s) => s.trim())
    : ['OK'];

  buttonLabels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.slot = 'footer';
    btn.innerHTML = label;
    // All buttons except the last one get secondary styling
    if (i < buttonLabels.length - 1) btn.className = 'secondary';
    btn.addEventListener('click', () => {
      appendLog('[' + modal.getAttribute('heading') + '] action: ' + label);
      modal.hide();
    });
    modal.appendChild(btn);
  });

  button.addEventListener('click', () => modal.show());

  // Replace block content
  block.innerHTML = '';
  block.appendChild(button);
  block.appendChild(modal);

  // Log events
  modal.addEventListener('fe-open', () => appendLog('[' + modal.getAttribute('heading') + '] fe-open'));
  modal.addEventListener('fe-close', (e) => appendLog('[' + modal.getAttribute('heading') + '] fe-close — reason: ' + e.detail.reason));
}

function appendLog(msg) {
  var log = document.getElementById('event-log');
  if (log) log.textContent += '\n' + msg;
}

