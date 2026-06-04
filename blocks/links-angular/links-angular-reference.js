/**
 * Angular equivalent of link-wc (Single Link Component)
 * ⚠️ For reference/comparison only — NOT for use in AEM EDS
 *
 * Requires: Angular CLI, TypeScript, @angular/core
 */

// ──────────────────────────────────────────────
// link.component.ts
// ──────────────────────────────────────────────
//
// import { Component, Input } from '@angular/core';
//
// @Component({
//   selector: 'app-link',
//   template: `<a [href]="href">{{ label }}</a>`,
//   styles: [`
//     :host {
//       display: list-item;
//       padding: 0.5rem 0;
//       border-bottom: 1px solid #b2b2b2;
//       list-style: none;
//     }
//
//     :host(:last-child) {
//       border-bottom: none;
//     }
//
//     a {
//       color: #0060a9;
//       text-decoration: none;
//     }
//
//     a:hover {
//       text-decoration: underline;
//     }
//   `],
//   encapsulation: ViewEncapsulation.ShadowDom
// })
// export class LinkComponent {
//   @Input() href = '#';
//   @Input() label = '';
// }

// ──────────────────────────────────────────────
// links.component.ts
// ──────────────────────────────────────────────
//
// import { Component, Input } from '@angular/core';
//
// interface LinkItem {
//   href: string;
//   text: string;
// }
//
// @Component({
//   selector: 'app-links',
//   template: `
//     <app-link
//       *ngFor="let link of links"
//       [href]="link.href"
//       [label]="link.text">
//     </app-link>
//   `,
//   styles: [`
//     :host {
//       display: block;
//       background: #fff;
//       border: 1px solid #b2b2b2;
//       border-radius: 6px;
//       overflow: hidden;
//       padding: 0;
//     }
//   `],
//   encapsulation: ViewEncapsulation.ShadowDom
// })
// export class LinksComponent {
//   @Input() links: LinkItem[] = [];
// }

// ──────────────────────────────────────────────
// links.module.ts
// ──────────────────────────────────────────────
//
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { LinkComponent } from './link.component';
// import { LinksComponent } from './links.component';
//
// @NgModule({
//   declarations: [LinkComponent, LinksComponent],
//   imports: [CommonModule],
//   exports: [LinksComponent]
// })
// export class LinksModule {}

// ──────────────────────────────────────────────
// Usage in a parent template:
// ──────────────────────────────────────────────
//
// <app-links [links]="[
//   { href: 'https://example.com', text: 'Example' },
//   { href: 'https://adobe.com', text: 'Adobe' }
// ]"></app-links>
