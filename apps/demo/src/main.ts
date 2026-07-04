// GDS Demo App — Dashboard template
import '@gds/core';
import '@gds/core/reset.css';
import '@gds/core/gds.css';
import '@gds/theme-neutral/theme.css';

const app = document.getElementById('app')!;
app.innerHTML = `
 <style>
  body { margin: 0; font-family: var(--gds-font-sans); background: var(--gds-color-bg); color: var(--gds-color-text); }
  .demo-header { background: var(--gds-color-bg-elevated); border-bottom: 1px solid var(--gds-color-border); padding: var(--gds-space-4) var(--gds-space-6); display: flex; justify-content: space-between; align-items: center; }
  .demo-content { padding: var(--gds-space-6); max-width: 1200px; margin: 0 auto; }
 </style>
 <div class="demo-header">
  <h1 style="margin: 0; font-size: var(--gds-font-size-xl);">GDS Demo</h1>
  <gds-hstack gap="2" align="center">
   <gds-button label="Docs" variant="ghost" size="sm"></gds-button>
   <gds-button label="GitHub" variant="outline" size="sm"></gds-button>
  </gds-hstack>
 </div>
 <div class="demo-content">
  <gds-vstack gap="6">
   <gds-heading level="2">Dashboard Preview</gds-heading>
   <gds-grid columns="3" gap="4">
    <gds-card variant="elevated" padding="5">
     <div slot="header"><gds-text color="muted" size="sm">Total Users</gds-text></div>
     <gds-heading level="2">12,847</gds-heading>
     <gds-badge variant="success" dot>+15%</gds-badge>
    </gds-card>
    <gds-card variant="elevated" padding="5">
     <div slot="header"><gds-text color="muted" size="sm">Revenue</gds-text></div>
     <gds-heading level="2">$48,250</gds-heading>
     <gds-badge variant="success" dot>+12.5%</gds-badge>
    </gds-card>
    <gds-card variant="elevated" padding="5">
     <div slot="header"><gds-text color="muted" size="sm">Active Now</gds-text></div>
     <gds-heading level="2">1,432</gds-heading>
     <gds-badge variant="info" dot>Live</gds-badge>
    </gds-card>
   </gds-grid>
   <gds-card variant="outlined" padding="5">
    <div slot="header"><gds-heading level="3">Recent Activity</gds-heading></div>
    <gds-table
     .columns=${[
      { key: 'user', label: 'User' },
      { key: 'action', label: 'Action' },
      { key: 'time', label: 'Time' },
     ]}
     .rows=${[
      { user: 'Jane Doe', action: 'Created project "Alpha"', time: '2 min ago' },
      { user: 'John Smith', action: 'Updated profile', time: '15 min ago' },
      { user: 'Alice Brown', action: 'Deleted file "old.json"', time: '1 hour ago' },
     ]}
    ></gds-table>
   </gds-card>
  </gds-vstack>
 </div>
`;