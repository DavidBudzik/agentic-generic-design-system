import type { CLICommand } from '../types.js';

interface Template {
 name: string;
 description: string;
 components: string[];
 skeleton: string;
}

const DASHBOARD_SKELETON = [
 '<gds-appshell sidebar-open sidebar-width="240">',
 ' <nav slot="sidebar">',
 '  <gds-navigation orientation="vertical" items="dashboard,analytics,reports,settings"></gds-navigation>',
 ' </nav>',
 ' <header slot="header">',
 '  <gds-hstack justify="between" align="center">',
 '   <gds-heading level="1">Dashboard</gds-heading>',
 '   <gds-hstack gap="2">',
 '    <gds-icon-button icon="search" label="Search"></gds-icon-button>',
 '    <gds-icon-button icon="bell" label="Notifications"></gds-icon-button>',
 '    <gds-avatar src="/avatar.png" alt="User" size="sm"></gds-avatar>',
 '   </gds-hstack>',
 '  </gds-hstack>',
 ' </header>',
 ' <main>',
 '  <gds-vstack gap="4">',
 '   <gds-grid columns="4" gap="3">',
 '    <gds-card variant="elevated" padding="4">',
 '     <div slot="header"><gds-text color="muted" size="sm">Revenue</gds-text></div>',
 '     <gds-heading level="2">$48,250</gds-heading>',
 '     <gds-hstack gap="1" align="center">',
 '      <gds-badge variant="success" dot>+12.5%</gds-badge>',
 '      <gds-text size="sm" color="subtle">vs last month</gds-text>',
 '     </gds-hstack>',
 '    </gds-card>',
 '   </gds-grid>',
 '   <gds-card variant="outlined" padding="0">',
 '    <div slot="header"><gds-heading level="3">Recent Orders</gds-heading></div>',
 '    <gds-table .columns=${tableColumns} .rows=${tableRows} sticky-header></gds-table>',
 '   </gds-card>',
 '  </gds-vstack>',
 ' </main>',
 '</gds-appshell>',
].join('\n');

const SETTINGS_SKELETON = [
 '<gds-container max-width="lg" padding="6">',
 ' <gds-vstack gap="6">',
 '  <gds-heading level="1">Settings</gds-heading>',
 '  <gds-card variant="outlined" padding="5">',
 '   <div slot="header"><gds-heading level="2">Profile</gds-heading></div>',
 '   <gds-vstack gap="4">',
 '    <gds-hstack gap="4" align="center">',
 '     <gds-avatar src="/avatar.png" alt="User" size="lg"></gds-avatar>',
 '     <gds-button label="Change avatar" variant="outline" size="sm"></gds-button>',
 '    </gds-hstack>',
 '    <gds-grid columns="2" gap="4">',
 '     <gds-field label="First name"><gds-text-input placeholder="Jane"></gds-text-input></gds-field>',
 '     <gds-field label="Last name"><gds-text-input placeholder="Doe"></gds-text-input></gds-field>',
 '    </gds-grid>',
 '   </gds-vstack>',
 '  </gds-card>',
 '  <gds-card variant="outlined" padding="5">',
 '   <div slot="header"><gds-heading level="2">Notifications</gds-heading></div>',
 '   <gds-vstack gap="3" divided>',
 '    <gds-hstack justify="between" align="center">',
 '     <gds-vstack gap="0"><gds-text weight="medium">Email notifications</gds-text><gds-text size="sm" color="muted">Receive updates via email</gds-text></gds-vstack>',
 '     <gds-switch checked></gds-switch>',
 '    </gds-hstack>',
 '    <gds-divider></gds-divider>',
 '    <gds-hstack justify="between" align="center">',
 '     <gds-vstack gap="0"><gds-text weight="medium">Push notifications</gds-text><gds-text size="sm" color="muted">Get push alerts</gds-text></gds-vstack>',
 '     <gds-switch></gds-switch>',
 '    </gds-hstack>',
 '   </gds-vstack>',
 '  </gds-card>',
 '  <gds-hstack justify="end" gap="2">',
 '   <gds-button label="Cancel" variant="ghost"></gds-button>',
 '   <gds-button label="Save changes" variant="primary"></gds-button>',
 '  </gds-hstack>',
 ' </gds-vstack>',
 '</gds-container>',
].join('\n');

const AUTH_SKELETON = [
 '<gds-container max-width="sm" padding="6">',
 ' <gds-vstack gap="6" align="center">',
 '  <gds-heading level="1">Welcome back</gds-heading>',
 '  <gds-card variant="elevated" padding="6" style="width: 100%">',
 '   <gds-vstack gap="4">',
 '    <gds-field label="Email" required><gds-text-input type="email" placeholder="you@example.com"></gds-text-input></gds-field>',
 '    <gds-field label="Password" required><gds-text-input type="password" placeholder="****"></gds-text-input></gds-field>',
 '    <gds-hstack justify="between" align="center">',
 '     <gds-checkbox label="Remember me"></gds-checkbox>',
 '     <gds-link href="/forgot" size="sm">Forgot password?</gds-link>',
 '    </gds-hstack>',
 '    <gds-button label="Sign in" full-width size="lg"></gds-button>',
 '    <gds-divider></gds-divider>',
 '    <gds-text align="center" color="muted">Dont have an account? <gds-link href="/signup">Sign up</gds-link></gds-text>',
 '   </gds-vstack>',
 '  </gds-card>',
 ' </gds-vstack>',
 '</gds-container>',
].join('\n');

const PROFILE_SKELETON = [
 '<gds-container max-width="lg" padding="6">',
 ' <gds-vstack gap="6">',
 '  <gds-card variant="outlined" padding="6">',
 '   <gds-hstack gap="6" align="center">',
 '    <gds-avatar src="/avatar.png" alt="Jane Doe" size="xl"></gds-avatar>',
 '    <gds-vstack gap="1">',
 '     <gds-heading level="1">Jane Doe</gds-heading>',
 '     <gds-text color="muted">Product Designer / San Francisco</gds-text>',
 '     <gds-hstack gap="2"><gds-badge variant="primary">Pro</gds-badge><gds-badge variant="success" dot>Active</gds-badge></gds-hstack>',
 '    </gds-vstack>',
 '   </gds-hstack>',
 '  </gds-card>',
 '  <gds-grid columns="3" gap="3">',
 '   <gds-card variant="elevated" padding="4" align="center"><gds-heading level="2">248</gds-heading><gds-text color="muted" size="sm">Projects</gds-text></gds-card>',
 '   <gds-card variant="elevated" padding="4" align="center"><gds-heading level="2">1.2k</gds-heading><gds-text color="muted" size="sm">Followers</gds-text></gds-card>',
 '   <gds-card variant="elevated" padding="4" align="center"><gds-heading level="2">89</gds-heading><gds-text color="muted" size="sm">Following</gds-text></gds-card>',
 '  </gds-grid>',
 '  <gds-card variant="outlined" padding="5">',
 '   <gds-tabs value="activity">',
 '    <gds-tab slot="tab" value="activity">Activity</gds-tab>',
 '    <gds-tab slot="tab" value="projects">Projects</gds-tab>',
 '    <div slot="panel" value="activity"><gds-list .items=${activityItems} divided></gds-list></div>',
 '   </gds-tabs>',
 '  </gds-card>',
 ' </gds-vstack>',
 '</gds-container>',
].join('\n');

const CHAT_SKELETON = [
 '<gds-chat-layout style="min-height: 100dvh">',
 ' <header slot="header">',
 '  <gds-hstack justify="between" align="center" padding="3">',
 '   <gds-hstack gap="2" align="center">',
 '    <gds-avatar src="/bot.png" alt="AI" size="sm"></gds-avatar>',
 '    <gds-vstack gap="0"><gds-text weight="medium">AI Assistant</gds-text>',
 '     <gds-hstack gap="1"><gds-statusdot variant="success" pulse></gds-statusdot><gds-text size="xs" color="muted">Online</gds-text></gds-hstack>',
 '    </gds-vstack>',
 '   </gds-hstack>',
 '   <gds-icon-button icon="x" label="Close"></gds-icon-button>',
 '  </gds-hstack>',
 ' </header>',
 ' <div slot="messages" style="overflow-y: auto">',
 '  <gds-vstack gap="3" padding="4">',
 '   <gds-chat-message role="user" author="You" timestamp="2:30 PM">Can you help me debug this error?</gds-chat-message>',
 '   <gds-chat-message role="assistant" author="AI" timestamp="2:30 PM">',
 '    <gds-vstack gap="3"><span>Let me look at the error.</span>',
 '     <gds-chat-tool-calls .calls=${toolCalls}></gds-chat-tool-calls>',
 '     <span>I found the issue.</span>',
 '    </gds-vstack>',
 '   </gds-chat-message>',
 '  </gds-vstack>',
 ' </div>',
 ' <div slot="composer"><gds-chat-composer placeholder="Type a message..." send-on-enter></gds-chat-composer></div>',
 '</gds-chat-layout>',
].join('\n');

const DATA_TABLE_SKELETON = [
 '<gds-container max-width="xl" padding="6">',
 ' <gds-vstack gap="4">',
 '  <gds-hstack justify="between" align="center">',
 '   <gds-heading level="1">Orders</gds-heading>',
 '   <gds-button label="Export" variant="outline" icon="download"></gds-button>',
 '  </gds-hstack>',
 '  <gds-card variant="outlined" padding="4">',
 '   <gds-hstack gap="3" align="center">',
 '    <gds-text-input placeholder="Search orders..." icon="search" style="flex: 1"></gds-text-input>',
 '    <gds-select placeholder="Status" .options=${statusOptions}></gds-select>',
 '    <gds-select placeholder="Date range" .options=${dateOptions}></gds-select>',
 '   </gds-hstack>',
 '  </gds-card>',
 '  <gds-card variant="outlined" padding="0">',
 '   <gds-table .columns=${columns} .rows=${rows} sortable selectable sticky-header></gds-table>',
 '  </gds-card>',
 '  <gds-hstack justify="between" align="center">',
 '   <gds-text color="muted" size="sm">Showing 1-10 of 248</gds-text>',
 '   <gds-pagination page="1" total-pages="25"></gds-pagination>',
 '  </gds-hstack>',
 ' </gds-vstack>',
 '</gds-container>',
].join('\n');

const templates: Record<string, Template> = {
 dashboard: {
  name: 'dashboard',
  description: 'Analytics dashboard with sidebar, stats, and data table',
  components: ['AppShell', 'Navigation', 'Card', 'Grid', 'VStack', 'HStack', 'Table', 'Progressbar', 'Badge', 'Avatar', 'Text', 'Heading'],
  skeleton: DASHBOARD_SKELETON,
 },
 settings: {
  name: 'settings',
  description: 'Settings page with sections, form fields, and save bar',
  components: ['VStack', 'HStack', 'Card', 'Heading', 'Text', 'Field', 'TextInput', 'Select', 'Switch', 'Button', 'Divider', 'Avatar'],
  skeleton: SETTINGS_SKELETON,
 },
 auth: {
  name: 'auth',
  description: 'Authentication form (login/signup) with centered card layout',
  components: ['Container', 'VStack', 'Card', 'Heading', 'Text', 'Field', 'TextInput', 'Button', 'Link', 'Divider'],
  skeleton: AUTH_SKELETON,
 },
 profile: {
  name: 'profile',
  description: 'User profile page with avatar, stats, and activity feed',
  components: ['Container', 'VStack', 'HStack', 'Grid', 'Card', 'Avatar', 'Heading', 'Text', 'Badge', 'Divider', 'List', 'Item', 'Tabs'],
  skeleton: PROFILE_SKELETON,
 },
 'chat-ui': {
  name: 'chat-ui',
  description: 'AI chat interface with message list and composer',
  components: ['ChatLayout', 'ChatMessage', 'ChatComposer', 'ChatToolCalls', 'VStack', 'HStack', 'Avatar', 'Text', 'Spinner', 'Badge'],
  skeleton: CHAT_SKELETON,
 },
 'data-table': {
  name: 'data-table',
  description: 'Full data table page with filters, search, and pagination',
  components: ['Container', 'VStack', 'HStack', 'Card', 'Table', 'TextInput', 'Select', 'Button', 'Pagination', 'Badge', 'Text', 'Heading', 'DropdownMenu'],
  skeleton: DATA_TABLE_SKELETON,
 },
};

const templateList = Object.keys(templates).sort();

export const templateCommand: CLICommand = {
 name: 'template',
 description: 'Browse and scaffold page templates',
 usage: 'gds template [name] [--list] [--skeleton]',
 args: [
  { name: 'name', description: 'Template name (e.g. dashboard, settings, auth)', required: false },
 ],
 options: [
  { name: 'list', description: 'List all templates', alias: 'l' },
  { name: 'skeleton', description: 'Show the skeleton/layout code', alias: 's' },
 ],
 run: (args, options) => {
  if (options.list || options.l) {
   console.log('\nAvailable templates:\n');
   for (const name of templateList) {
    const tpl = templates[name];
    console.log(` ${tpl.name.padEnd(16)} ${tpl.description}`);
    console.log(` ${' '.repeat(16)} Components: ${tpl.components.join(', ')}\n`);
   }
   return;
  }

  const name = args[0];
  if (!name) {
   console.log('Usage: gds template <name>');
   console.log('Run `gds template --list` for all templates.');
   return;
  }

  const tpl = templates[name];
  if (!tpl) {
   console.error(`Template "${name}" not found. Run \`gds template --list\` for available templates.`);
   process.exit(1);
  }

  console.log(`\n${tpl.name}`);
  console.log(`${tpl.description}\n`);
  console.log(`Components: ${tpl.components.join(', ')}\n`);

  if (options.skeleton || options.s) {
   console.log('Skeleton:\n');
   console.log(tpl.skeleton);
   console.log();
  }
 },
};