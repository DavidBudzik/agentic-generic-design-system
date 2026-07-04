import './docs.css';
import '@gds/core';

// Import all theme CSS as raw strings — Vite ?raw gives us the file content
import neutralTheme from './themes/neutral.css?raw';
import darkTheme from './themes/dark.css?raw';
import raycastTheme from './themes/raycast.css?raw';
import gothicTheme from './themes/gothic.css?raw';
import y2kTheme from './themes/y2k.css?raw';
import stoneTheme from './themes/stone.css?raw';
import oceanTheme from './themes/ocean.css?raw';
import stripeTheme from './themes/stripe.css?raw';
import linearAppTheme from './themes/linear-app.css?raw';
import vercelTheme from './themes/vercel.css?raw';
import notionTheme from './themes/notion.css?raw';
import spotifyTheme from './themes/spotify.css?raw';
import figmaTheme from './themes/figma.css?raw';
import nvidiaTheme from './themes/nvidia.css?raw';
import ferrariTheme from './themes/ferrari.css?raw';
import appleTheme from './themes/apple.css?raw';
import airbnbTheme from './themes/airbnb.css?raw';
import supabaseTheme from './themes/supabase.css?raw';
import sentryTheme from './themes/sentry.css?raw';

const themes: Record<string, string> = {
 neutral: neutralTheme,
 dark: darkTheme,
 raycast: raycastTheme,
 gothic: gothicTheme,
 y2k: y2kTheme,
 stone: stoneTheme,
 ocean: oceanTheme,
 stripe: stripeTheme,
 linearApp: linearAppTheme,
 vercel: vercelTheme,
 notion: notionTheme,
 spotify: spotifyTheme,
 figma: figmaTheme,
 nvidia: nvidiaTheme,
 ferrari: ferrariTheme,
 apple: appleTheme,
 airbnb: airbnbTheme,
 supabase: supabaseTheme,
 sentry: sentryTheme,
};

const themeStyleEl = document.createElement('style');
themeStyleEl.id = 'gds-active-theme';
themeStyleEl.textContent = neutralTheme;
document.head.appendChild(themeStyleEl);

let currentTheme = 'neutral';

// Theme metadata for the dropdown
const themeMeta: { key: string; label: string; group: string; color: string }[] = [
 { key: 'neutral', label: 'Neutral', group: 'Core', color: '#2563eb' },
 { key: 'dark', label: 'Dark', group: 'Core', color: '#3b82f6' },
 { key: 'raycast', label: 'Raycast', group: 'Core', color: '#ff6363' },
 { key: 'gothic', label: 'Gothic', group: 'Core', color: '#a855f7' },
 { key: 'y2k', label: 'Y2K', group: 'Core', color: '#ec4899' },
 { key: 'stone', label: 'Stone', group: 'Core', color: '#475569' },
 { key: 'ocean', label: 'Ocean', group: 'Core', color: '#0369a1' },
 { key: 'stripe', label: 'Stripe', group: 'Brand', color: '#533afd' },
 { key: 'linearApp', label: 'Linear', group: 'Brand', color: '#5e6ad2' },
 { key: 'vercel', label: 'Vercel', group: 'Brand', color: '#171717' },
 { key: 'notion', label: 'Notion', group: 'Brand', color: '#2eaadc' },
 { key: 'spotify', label: 'Spotify', group: 'Brand', color: '#1ed760' },
 { key: 'figma', label: 'Figma', group: 'Brand', color: '#0acf83' },
 { key: 'nvidia', label: 'NVIDIA', group: 'Brand', color: '#76b900' },
 { key: 'ferrari', label: 'Ferrari', group: 'Brand', color: '#DA291C' },
 { key: 'apple', label: 'Apple', group: 'Brand', color: '#0071e3' },
 { key: 'airbnb', label: 'Airbnb', group: 'Brand', color: '#ff385c' },
 { key: 'supabase', label: 'Supabase', group: 'Brand', color: '#3ecf8e' },
 { key: 'sentry', label: 'Sentry', group: 'Brand', color: '#6a5fc1' },
];

function switchTheme(theme: string) {
 if (theme === currentTheme) return;
 const css = themes[theme];
 if (!css) return;
 themeStyleEl.textContent = css;
 currentTheme = theme;
 // Update trigger button
 const label = document.getElementById('theme-label');
 const swatch = document.getElementById('theme-swatch');
 const meta = themeMeta.find(m => m.key === theme);
 if (label && meta) label.textContent = meta.label;
 if (swatch && meta) swatch.style.background = meta.color;
 // Update active state in dropdown
 document.querySelectorAll('.theme-option').forEach(opt => {
  opt.classList.toggle('active', opt.getAttribute('data-theme') === theme);
 });
 // Close dropdown
 closeThemeMenu();
}

function buildThemeDropdown() {
 const container = document.getElementById('theme-groups');
 if (!container) return;
 const groups: Record<string, typeof themeMeta> = {};
 for (const t of themeMeta) {
  if (!groups[t.group]) groups[t.group] = [];
  groups[t.group].push(t);
 }
 let html = '';
 for (const [group, items] of Object.entries(groups)) {
  html += `<div class="theme-group"><div class="theme-group-label">${group}</div>`;
  for (const item of items) {
   html += `<div class="theme-option${item.key === currentTheme ? ' active' : ''}" data-theme="${item.key}" onclick="window.__switchTheme('${item.key}')">
    <span class="theme-option-swatch" style="background: ${item.color}"></span>
    <span class="theme-option-label">${item.label}</span>
    ${item.key === currentTheme ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
   </div>`;
  }
  html += '</div>';
 }
 container.innerHTML = html;
}

function toggleThemeMenu() {
 const dropdown = document.getElementById('theme-dropdown');
 const trigger = document.getElementById('theme-trigger');
 if (!dropdown || !trigger) return;
 const isOpen = dropdown.classList.contains('open');
 if (isOpen) {
  closeThemeMenu();
 } else {
  buildThemeDropdown();
  dropdown.classList.add('open');
  trigger.classList.add('open');
  const search = document.getElementById('theme-search') as HTMLInputElement;
  if (search) { search.value = ''; search.focus(); }
 }
}

function closeThemeMenu() {
 const dropdown = document.getElementById('theme-dropdown');
 const trigger = document.getElementById('theme-trigger');
 if (dropdown) dropdown.classList.remove('open');
 if (trigger) trigger.classList.remove('open');
}

function filterThemes(query: string) {
 const q = query.toLowerCase();
 document.querySelectorAll('.theme-option').forEach(opt => {
  const label = opt.getAttribute('data-theme') || '';
  const text = (opt.textContent || '').toLowerCase();
  const visible = !q || text.includes(q) || label.includes(q);
  (opt as HTMLElement).style.display = visible ? '' : 'none';
 });
 // Hide empty group labels
 document.querySelectorAll('.theme-group').forEach(group => {
  const visible = group.querySelectorAll('.theme-option:not([style*="display: none"])').length > 0;
  (group as HTMLElement).style.display = visible ? '' : 'none';
 });
}

// Close on outside click
document.addEventListener('click', (e) => {
 const switcher = document.querySelector('.theme-switcher');
 if (switcher && !switcher.contains(e.target as Node)) closeThemeMenu();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
 if (e.key === 'Escape') closeThemeMenu();
});

(window as any).__switchTheme = switchTheme;
(window as any).__toggleThemeMenu = toggleThemeMenu;
(window as any).__filterThemes = filterThemes;

const app = document.getElementById('app')!;
app.innerHTML = `
 <div class="theme-switcher">
  <button class="theme-trigger" id="theme-trigger" onclick="window.__toggleThemeMenu()">
   <span class="theme-swatch" id="theme-swatch"></span>
   <span class="theme-label" id="theme-label">Neutral</span>
   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="theme-chevron"><path d="m6 9 6 6 6-6"/></svg>
  </button>
  <div class="theme-dropdown" id="theme-dropdown">
   <input type="text" class="theme-search" id="theme-search" placeholder="Search themes..." oninput="window.__filterThemes(this.value)" />
   <div class="theme-groups" id="theme-groups"></div>
  </div>
 </div>

 <div class="docs-layout">
  <aside class="docs-sidebar">
   <h2>GDS</h2>
   <nav>
    <a href="#getting-started" class="active">Getting Started</a>
    <div class="category">
     <h3>Foundations</h3>
     <a href="#tokens">Design Tokens</a>
     <a href="#themes">Themes</a>
    </div>
    <div class="category">
     <h3>Components</h3>
     <a href="#action">Action</a>
     <a href="#layout">Layout</a>
     <a href="#content">Content</a>
     <a href="#container">Container</a>
     <a href="#form">Form</a>
     <a href="#feedback">Feedback</a>
     <a href="#navigation">Navigation</a>
     <a href="#overlay">Overlay</a>
     <a href="#data">Data</a>
     <a href="#chat">Chat</a>
    </div>
   </nav>
  </aside>

  <main class="docs-main">
   <h1>Generic Design System</h1>
   <p>An open source design system built on Lit Web Components. Fully customizable, framework-agnostic, and agent-ready. <span style="color: var(--gds-color-primary); font-weight: 600;">19 themes.</span> 106 components.</p>

   <section id="getting-started" class="docs-section">
    <h2>Getting Started</h2>
    <div class="docs-code"><code>npm install @gds/core @gds/theme-neutral</code></div>
   </section>

   <section id="action" class="docs-section">
    <h2>Action</h2>
    <h3>Button</h3>
    <div class="docs-demo">
     <gds-button label="Primary"></gds-button>
     <gds-button label="Secondary" variant="secondary"></gds-button>
     <gds-button label="Ghost" variant="ghost"></gds-button>
     <gds-button label="Danger" variant="danger"></gds-button>
     <gds-button label="Outline" variant="outline"></gds-button>
     <gds-button label="Loading" loading></gds-button>
     <gds-button label="Small" size="sm"></gds-button>
     <gds-button label="Large" size="lg"></gds-button>
    </div>
   </section>

   <section id="layout" class="docs-section">
    <h2>Layout</h2>
    <h3>VStack</h3>
    <div class="docs-demo">
     <gds-vstack gap="3" align="stretch" style="width: 200px;">
      <gds-button label="Item 1" variant="secondary" full-width></gds-button>
      <gds-button label="Item 2" variant="secondary" full-width></gds-button>
      <gds-button label="Item 3" variant="secondary" full-width></gds-button>
     </gds-vstack>
    </div>

    <h3>HStack</h3>
    <div class="docs-demo">
     <gds-hstack gap="2" align="center" justify="between">
      <gds-button label="Cancel" variant="ghost"></gds-button>
      <gds-button label="Save"></gds-button>
     </gds-hstack>
    </div>

    <h3>Grid</h3>
    <div class="docs-demo">
    <gds-grid columns="2" gap="3" style="width: 100%;">
    <gds-card variant="outlined" padding="4" style="grid-column: span 2;"><gds-text>Wide feature card</gds-text></gds-card>
    <gds-card variant="outlined" padding="3"><gds-text>A</gds-text></gds-card>
    <gds-card variant="outlined" padding="3"><gds-text>B</gds-text></gds-card>
    </gds-grid>
    </div>
   </section>

   <section id="content" class="docs-section">
    <h2>Content</h2>
    <h3>Heading</h3>
    <div class="docs-demo" style="flex-direction: column; align-items: flex-start;">
     <gds-heading level="1">Heading 1</gds-heading>
     <gds-heading level="2">Heading 2</gds-heading>
     <gds-heading level="3">Heading 3</gds-heading>
    </div>

    <h3>Badge</h3>
    <div class="docs-demo">
     <gds-badge variant="primary">Primary</gds-badge>
     <gds-badge variant="success">Success</gds-badge>
     <gds-badge variant="warning">Warning</gds-badge>
     <gds-badge variant="danger">Danger</gds-badge>
     <gds-badge variant="info">Info</gds-badge>
    </div>

    <h3>Avatar</h3>
    <div class="docs-demo">
     <gds-avatar size="sm" fallback="JD"></gds-avatar>
     <gds-avatar size="md" fallback="AB"></gds-avatar>
     <gds-avatar size="lg" fallback="CD"></gds-avatar>
     <gds-avatar size="xl" fallback="EF"></gds-avatar>
    </div>
   </section>

   <section id="container" class="docs-section">
    <h2>Container</h2>
    <h3>Card</h3>
    <div class="docs-demo">
     <gds-card variant="default" padding="4" style="width: 240px;">
      <div slot="header"><gds-heading level="3">Default Card</gds-heading></div>
      <div slot="body"><gds-text color="muted">Card content goes here.</gds-text></div>
      <div slot="footer"><gds-button label="Action" size="sm"></gds-button></div>
     </gds-card>
     <gds-card variant="elevated" padding="4" style="width: 240px;">
      <div slot="header"><gds-heading level="3">Elevated Card</gds-heading></div>
      <div slot="body"><gds-text color="muted">With shadow elevation.</gds-text></div>
     </gds-card>
     <gds-card variant="outlined" padding="4" style="width: 240px;">
      <div slot="header"><gds-heading level="3">Outlined Card</gds-heading></div>
      <div slot="body"><gds-text color="muted">With border only.</gds-text></div>
     </gds-card>
    </div>
   </section>

   <section id="form" class="docs-section">
    <h2>Form</h2>
    <h3>Text Input</h3>
    <div class="docs-demo" style="flex-direction: column; align-items: stretch; max-width: 400px;">
     <gds-text-input label="Email" type="email" placeholder="you@example.com"></gds-text-input>
     <gds-text-input label="Password" type="password" placeholder="••••••••"></gds-text-input>
     <gds-text-input label="Error" placeholder="With error" error="This field is required"></gds-text-input>
     <gds-text-input label="Disabled" placeholder="Can't edit" disabled></gds-text-input>
    </div>

    <h3>Switch</h3>
    <div class="docs-demo">
     <gds-switch checked label="Enabled"></gds-switch>
     <gds-switch label="Disabled"></gds-switch>
    </div>

    <h3>Checkbox</h3>
    <div class="docs-demo">
     <gds-checkbox checked label="Checked"></gds-checkbox>
     <gds-checkbox label="Unchecked"></gds-checkbox>
    </div>
   </section>

   <section id="feedback" class="docs-section">
    <h2>Feedback</h2>
    <h3>Spinner</h3>
    <div class="docs-demo">
     <gds-spinner size="sm"></gds-spinner>
     <gds-spinner size="md"></gds-spinner>
     <gds-spinner size="lg"></gds-spinner>
    </div>

    <h3>Progress Bar</h3>
    <div class="docs-demo" style="flex-direction: column; align-items: stretch; max-width: 400px;">
     <gds-progressbar value="25"></gds-progressbar>
     <gds-progressbar value="50" variant="circular"></gds-progressbar>
    </div>

    <h3>Skeleton</h3>
    <div class="docs-demo" style="flex-direction: column; align-items: stretch; max-width: 400px;">
     <gds-skeleton variant="text" width="60%"></gds-skeleton>
     <gds-skeleton variant="text" width="100%"></gds-skeleton>
     <gds-skeleton variant="rect" height="100px"></gds-skeleton>
    </div>

    <h3>Status Dot</h3>
    <div class="docs-demo">
     <gds-statusdot variant="success"></gds-statusdot>
     <gds-statusdot variant="warning"></gds-statusdot>
     <gds-statusdot variant="danger"></gds-statusdot>
     <gds-statusdot variant="info" pulse></gds-statusdot>
    </div>
   </section>

   <section id="navigation" class="docs-section">
    <h2>Navigation</h2>
    <h3>Breadcrumbs</h3>
    <div class="docs-demo">
     <gds-breadcrumbs .items=${[
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile', href: '/settings/profile' },
     ]}></gds-breadcrumbs>
    </div>

    <h3>Pagination</h3>
    <div class="docs-demo">
     <gds-pagination page="1" total-pages="10"></gds-pagination>
    </div>
   </section>

   <section id="overlay" class="docs-section">
    <h2>Overlay</h2>
    <h3>Dialog</h3>
    <div class="docs-demo">
     <gds-button label="Open Dialog" id="open-dialog-btn"></gds-button>
     <gds-dialog title="Confirm Action" size="sm" id="demo-dialog">
      <div slot="body"><p>Are you sure you want to proceed?</p></div>
      <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
       <gds-button label="Cancel" variant="ghost" id="dialog-cancel"></gds-button>
       <gds-button label="Confirm" id="dialog-confirm"></gds-button>
      </div>
     </gds-dialog>
    </div>
   </section>

   <section id="data" class="docs-section">
    <h2>Data</h2>
    <h3>Table</h3>
    <div class="docs-demo" style="display: block; width: 100%;">
     <gds-table
      .columns=${[
       { key: 'name', label: 'Name' },
       { key: 'email', label: 'Email' },
       { key: 'role', label: 'Role' },
      ]}
      .rows=${[
       { name: 'Jane Doe', email: 'jane@example.com', role: 'Admin' },
       { name: 'John Smith', email: 'john@example.com', role: 'Editor' },
       { name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer' },
      ]}
     ></gds-table>
    </div>
   </section>

   <section id="chat" class="docs-section">
    <h2>Chat</h2>
    <h3>Chat Message</h3>
    <div class="docs-demo" style="flex-direction: column; align-items: stretch; max-width: 600px;">
     <gds-chat-message role="user" author="You" timestamp="2:30 PM">
      Can you help me with this error?
     </gds-chat-message>
     <gds-chat-message role="assistant" author="AI" timestamp="2:30 PM">
      Of course! Let me take a look at that for you.
     </gds-chat-message>
    </div>
   </section>
  </main>
 </div>
`;

// Wire up dialog
const openBtn = document.getElementById('open-dialog-btn');
const dialog = document.getElementById('demo-dialog') as any;
const cancelBtn = document.getElementById('dialog-cancel');
const confirmBtn = document.getElementById('dialog-confirm');

openBtn?.addEventListener('click', () => {
 if (dialog) dialog.open = true;
});
cancelBtn?.addEventListener('click', () => {
 if (dialog) dialog.open = false;
});
confirmBtn?.addEventListener('click', () => {
 if (dialog) dialog.open = false;
});