import type { CLICommand } from '../types.js';

interface ComponentDoc {
 name: string;
 tag: string;
 category: string;
 description: string;
 props: { name: string; type: string; default?: string; description: string }[];
 slots?: { name: string; description: string }[];
 events?: { name: string; detail: string; description: string }[];
 examples: { title: string; code: string }[];
}

const componentDocs: Record<string, ComponentDoc> = {
 Button: {
  name: 'Button',
  tag: 'gds-button',
  category: 'Action',
  description: 'A versatile button with variants, sizes, and loading state.',
  props: [
   { name: 'label', type: 'string', description: 'Button text' },
   { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'", default: "'primary'", description: 'Visual style' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
   { name: 'loading', type: 'boolean', default: 'false', description: 'Show spinner' },
   { name: 'icon', type: 'string', description: 'SVG icon string' },
   { name: 'iconPosition', type: "'start' | 'end'", default: "'start'", description: 'Icon position' },
   { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Full width button' },
  ],
  events: [
   { name: 'click', detail: 'void', description: 'Fired on click (native event)' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-button label="Click me"></gds-button>' },
   { title: 'Variants', code: '<gds-button label="Primary" variant="primary"></gds-button>\n<gds-button label="Secondary" variant="secondary"></gds-button>\n<gds-button label="Ghost" variant="ghost"></gds-button>\n<gds-button label="Danger" variant="danger"></gds-button>\n<gds-button label="Outline" variant="outline"></gds-button>' },
   { title: 'Loading', code: '<gds-button label="Saving..." loading></gds-button>' },
   { title: 'Full width', code: '<gds-button label="Submit" fullWidth></gds-button>' },
  ],
 },
 ButtonGroup: {
  name: 'ButtonGroup',
  tag: 'gds-button-group',
  category: 'Action',
  description: 'Groups related buttons with consistent spacing and optional attached styling.',
  props: [
   { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction' },
   { name: 'attached', type: 'boolean', default: 'false', description: 'Attach buttons together' },
   { name: 'gap', type: '0 | 1 | 2 | 3 | 4', default: '2', description: 'Spacing between buttons' },
  ],
  slots: [
   { name: 'default', description: 'Button elements' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-button-group>\n <gds-button label="Prev" variant="outline"></gds-button>\n <gds-button label="Next"></gds-button>\n</gds-button-group>' },
   { title: 'Attached', code: '<gds-button-group attached>\n <gds-button label="Left" variant="outline"></gds-button>\n <gds-button label="Center" variant="outline"></gds-button>\n <gds-button label="Right" variant="outline"></gds-button>\n</gds-button-group>' },
  ],
 },
 IconButton: {
  name: 'IconButton',
  tag: 'gds-icon-button',
  category: 'Action',
  description: 'A button containing only an icon, used for compact actions.',
  props: [
   { name: 'icon', type: 'string', description: 'SVG icon string' },
   { name: 'label', type: 'string', description: 'Accessible label (required)' },
   { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'", default: "'ghost'", description: 'Visual style' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
  ],
  events: [
   { name: 'click', detail: 'void', description: 'Fired on click' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-icon-button icon=${closeIcon} label="Close"></gds-icon-button>' },
  ],
 },
 Link: {
  name: 'Link',
  tag: 'gds-link',
  category: 'Action',
  description: 'A styled hyperlink with optional icon and external indicator.',
  props: [
   { name: 'href', type: 'string', description: 'Link URL' },
   { name: 'label', type: 'string', description: 'Link text' },
   { name: 'variant', type: "'primary' | 'secondary' | 'muted'", default: "'primary'", description: 'Color variant' },
   { name: 'external', type: 'boolean', default: 'false', description: 'Show external icon' },
   { name: 'underline', type: "'always' | 'hover' | 'never'", default: "'hover'", description: 'Underline behavior' },
  ],
  slots: [
   { name: 'default', description: 'Link content (overrides label)' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-link href="/about" label="About us"></gds-link>' },
   { title: 'External', code: '<gds-link href="https://example.com" label="Docs" external></gds-link>' },
  ],
 },
 DropdownMenu: {
  name: 'DropdownMenu',
  tag: 'gds-dropdown-menu',
  category: 'Navigation',
  description: 'A dropdown menu with trigger and list of items.',
  props: [
   { name: 'label', type: 'string', description: 'Trigger label' },
   { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", description: 'Menu placement' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable menu' },
  ],
  slots: [
   { name: 'trigger', description: 'Custom trigger element' },
   { name: 'default', description: 'Menu items' },
  ],
  events: [
   { name: 'select', detail: '{ value: string }', description: 'Fired when item is selected' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-dropdown-menu label="Options">\n <gds-dropdown-menu-item value="edit">Edit</gds-dropdown-menu-item>\n <gds-dropdown-menu-item value="delete">Delete</gds-dropdown-menu-item>\n</gds-dropdown-menu>' },
  ],
 },
 MoreMenu: {
  name: 'MoreMenu',
  tag: 'gds-more-menu',
  category: 'Navigation',
  description: 'A kebab/more menu for secondary actions.',
  props: [
   { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-end'", description: 'Menu placement' },
   { name: 'icon', type: "'more' | 'dots'", default: "'more'", description: 'Trigger icon type' },
  ],
  slots: [
   { name: 'default', description: 'Menu items' },
  ],
  events: [
   { name: 'select', detail: '{ value: string }', description: 'Fired when item is selected' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-more-menu>\n <gds-dropdown-menu-item value="share">Share</gds-dropdown-menu-item>\n <gds-dropdown-menu-item value="report">Report</gds-dropdown-menu-item>\n</gds-more-menu>' },
  ],
 },
 SegmentedControl: {
  name: 'SegmentedControl',
  tag: 'gds-segmented-control',
  category: 'Action',
  description: 'A segmented control for switching between mutually exclusive options.',
  props: [
   { name: 'value', type: 'string', description: 'Selected value' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control size' },
   { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch to full width' },
  ],
  slots: [
   { name: 'default', description: 'Segment items' },
  ],
  events: [
   { name: 'change', detail: '{ value: string }', description: 'Fired when selection changes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-segmented-control .value=${v} @change=${onChange}>\n <gds-segment value="day">Day</gds-segment>\n <gds-segment value="week">Week</gds-segment>\n <gds-segment value="month">Month</gds-segment>\n</gds-segmented-control>' },
  ],
 },
 ToggleButton: {
  name: 'ToggleButton',
  tag: 'gds-toggle-button',
  category: 'Action',
  description: 'A button that can be toggled on/off.',
  props: [
   { name: 'pressed', type: 'boolean', default: 'false', description: 'Pressed state' },
   { name: 'label', type: 'string', description: 'Button text' },
   { name: 'icon', type: 'string', description: 'SVG icon string' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
  ],
  events: [
   { name: 'toggle', detail: '{ pressed: boolean }', description: 'Fired when pressed state changes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-toggle-button label="Bold" icon=${boldIcon} ?pressed=${isBold}></gds-toggle-button>' },
  ],
 },
 ToggleButtonGroup: {
  name: 'ToggleButtonGroup',
  tag: 'gds-toggle-button-group',
  category: 'Action',
  description: 'Groups toggle buttons with single or multi-select behavior.',
  props: [
   { name: 'value', type: 'string | string[]', description: 'Selected value(s)' },
   { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple selections' },
   { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction' },
  ],
  slots: [
   { name: 'default', description: 'Toggle button elements' },
  ],
  events: [
   { name: 'change', detail: '{ value: string | string[] }', description: 'Fired when selection changes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-toggle-button-group .value=${v} @change=${onChange}>\n <gds-toggle-button label="Left"></gds-toggle-button>\n <gds-toggle-button label="Center"></gds-toggle-button>\n <gds-toggle-button label="Right"></gds-toggle-button>\n</gds-toggle-button-group>' },
  ],
 },
 Toolbar: {
  name: 'Toolbar',
  tag: 'gds-toolbar',
  category: 'Action',
  description: 'A horizontal toolbar container for action buttons and controls.',
  props: [
   { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction' },
   { name: 'gap', type: '0 | 1 | 2 | 3 | 4', default: '2', description: 'Spacing between items' },
   { name: 'bordered', type: 'boolean', default: 'false', description: 'Show border' },
  ],
  slots: [
   { name: 'default', description: 'Toolbar items' },
   { name: 'start', description: 'Start-aligned items' },
   { name: 'end', description: 'End-aligned items' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-toolbar>\n <gds-icon-button icon=${boldIcon} label="Bold" slot="start"></gds-icon-button>\n <gds-icon-button icon=${italicIcon} label="Italic" slot="start"></gds-icon-button>\n <gds-button label="Publish" slot="end"></gds-button>\n</gds-toolbar>' },
  ],
 },
 VStack: {
  name: 'VStack',
  tag: 'gds-vstack',
  category: 'Layout',
  description: 'Vertical stack layout with configurable gap, alignment, and wrapping.',
  props: [
   { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', default: '0', description: 'Spacing between children (uses spacing tokens)' },
   { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'stretch'", description: 'Cross-axis alignment' },
   { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", default: "'start'", description: 'Main-axis distribution' },
   { name: 'wrap', type: 'boolean', default: 'false', description: 'Allow wrapping' },
  ],
  slots: [
   { name: 'default', description: 'Child elements' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-vstack gap="3">\n <gds-text>Item 1</gds-text>\n <gds-text>Item 2</gds-text>\n</gds-vstack>' },
  ],
 },
 HStack: {
  name: 'HStack',
  tag: 'gds-hstack',
  category: 'Layout',
  description: 'Horizontal stack layout with configurable gap and alignment.',
  props: [
   { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', default: '0', description: 'Spacing between children' },
   { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'center'", description: 'Cross-axis alignment' },
   { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", default: "'start'", description: 'Main-axis distribution' },
   { name: 'wrap', type: 'boolean', default: 'false', description: 'Allow wrapping' },
  ],
  slots: [{ name: 'default', description: 'Child elements' }],
  examples: [
   { title: 'Basic', code: '<gds-hstack gap="2" align="center">\n <gds-button label="Cancel" variant="ghost"></gds-button>\n <gds-button label="Save"></gds-button>\n</gds-hstack>' },
  ],
 },
 Stack: {
  name: 'Stack',
  tag: 'gds-stack',
  category: 'Layout',
  description: 'A flexible stack with configurable direction, gap, and alignment.',
  props: [
   { name: 'direction', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Layout direction' },
   { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', default: '0', description: 'Spacing between children' },
   { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'stretch'", description: 'Cross-axis alignment' },
   { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", default: "'start'", description: 'Main-axis distribution' },
   { name: 'wrap', type: 'boolean', default: 'false', description: 'Allow wrapping' },
  ],
  slots: [
   { name: 'default', description: 'Child elements' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-stack direction="horizontal" gap="4">\n <div>A</div>\n <div>B</div>\n</gds-stack>' },
  ],
 },
 Grid: {
  name: 'Grid',
  tag: 'gds-grid',
  category: 'Layout',
  description: 'A CSS grid layout with configurable columns, gap, and responsive behavior.',
  props: [
   { name: 'columns', type: 'number | string', default: '1', description: 'Number of columns (or CSS grid-template-columns)' },
   { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', default: '4', description: 'Gap between items' },
   { name: 'minColumnWidth', type: 'string', description: 'Minimum column width for auto-fit grid' },
  ],
  slots: [
   { name: 'default', description: 'Grid items' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-grid columns="3" gap="4">\n <gds-card>1</gds-card>\n <gds-card>2</gds-card>\n <gds-card>3</gds-card>\n</gds-grid>' },
   { title: 'Auto-fit', code: '<gds-grid min-column-width="200px" gap="4">\n <gds-card>Item</gds-card>\n</gds-grid>' },
  ],
 },
 Container: {
  name: 'Container',
  tag: 'gds-container',
  category: 'Layout',
  description: 'A centered content container with max-width control.',
  props: [
   { name: 'maxWidth', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'lg'", description: 'Maximum width' },
   { name: 'padding', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '4', description: 'Horizontal padding' },
   { name: 'centered', type: 'boolean', default: 'true', description: 'Center horizontally' },
  ],
  slots: [
   { name: 'default', description: 'Container content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-container maxWidth="md">\n <gds-text>Centered content</gds-text>\n</gds-container>' },
  ],
 },
 AspectRatio: {
  name: 'AspectRatio',
  tag: 'gds-aspect-ratio',
  category: 'Layout',
  description: 'Maintains a consistent aspect ratio for its content.',
  props: [
   { name: 'ratio', type: 'string', default: "'16 / 9'", description: 'Aspect ratio (width / height)' },
   { name: 'maxWidth', type: 'string', description: 'Maximum width' },
  ],
  slots: [
   { name: 'default', description: 'Content to constrain' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-aspect-ratio ratio="16 / 9">\n <img src="image.jpg" alt="Cover" style="width:100%;height:100%;object-fit:cover" />\n</gds-aspect-ratio>' },
  ],
 },
 Divider: {
  name: 'Divider',
  tag: 'gds-divider',
  category: 'Layout',
  description: 'A horizontal or vertical divider line.',
  props: [
   { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Divider direction' },
   { name: 'variant', type: "'solid' | 'dashed' | 'dotted'", default: "'solid'", description: 'Line style' },
   { name: 'label', type: 'string', description: 'Optional label (horizontal only)' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-text>Section 1</gds-text>\n<gds-divider></gds-divider>\n<gds-text>Section 2</gds-text>' },
   { title: 'With label', code: '<gds-divider label="OR"></gds-divider>' },
  ],
 },
 Spacer: {
  name: 'Spacer',
  tag: 'gds-spacer',
  category: 'Layout',
  description: 'A flexible spacer that fills available space.',
  props: [
   { name: 'size', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', description: 'Fixed size (if not flexing)' },
   { name: 'flex', type: 'boolean', default: 'true', description: 'Grow to fill available space' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-hstack>\n <gds-text>Left</gds-text>\n <gds-spacer></gds-spacer>\n <gds-text>Right</gds-text>\n</gds-hstack>' },
  ],
 },
 Avatar: {
  name: 'Avatar',
  tag: 'gds-avatar',
  category: 'Display',
  description: 'A user avatar with image, initials, or icon fallback.',
  props: [
   { name: 'src', type: 'string', description: 'Image URL' },
   { name: 'alt', type: 'string', description: 'Alt text' },
   { name: 'initials', type: 'string', description: 'Initials (2 chars max)' },
   { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size' },
   { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Avatar shape' },
   { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", description: 'Status indicator' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-avatar src="/photo.jpg" alt="John Doe"></gds-avatar>' },
   { title: 'Initials', code: '<gds-avatar initials="JD" size="lg"></gds-avatar>' },
  ],
 },
 AvatarGroup: {
  name: 'AvatarGroup',
  tag: 'gds-avatar-group',
  category: 'Display',
  description: 'Displays multiple avatars with overlap and overflow count.',
  props: [
   { name: 'max', type: 'number', default: '5', description: 'Maximum visible avatars' },
   { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size for all children' },
  ],
  slots: [
   { name: 'default', description: 'Avatar elements' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-avatar-group max="3">\n <gds-avatar initials="A"></gds-avatar>\n <gds-avatar initials="B"></gds-avatar>\n <gds-avatar initials="C"></gds-avatar>\n <gds-avatar initials="D"></gds-avatar>\n</gds-avatar-group>' },
  ],
 },
 Badge: {
  name: 'Badge',
  tag: 'gds-badge',
  category: 'Display',
  description: 'A small status indicator or counter.',
  props: [
   { name: 'label', type: 'string', description: 'Badge text' },
   { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'default'", description: 'Color variant' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", description: 'Badge size' },
   { name: 'dot', type: 'boolean', default: 'false', description: 'Show a leading dot' },
   { name: 'pill', type: 'boolean', default: 'false', description: 'Pill shape' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-badge label="New" variant="primary"></gds-badge>' },
   { title: 'Status dot', code: '<gds-badge label="Online" dot variant="success"></gds-badge>' },
  ],
 },
 Blockquote: {
  name: 'Blockquote',
  tag: 'gds-blockquote',
  category: 'Display',
  description: 'A styled blockquote for displaying quoted content.',
  props: [
   { name: 'cite', type: 'string', description: 'Source URL' },
   { name: 'author', type: 'string', description: 'Author name' },
   { name: 'source', type: 'string', description: 'Source/title of the author' },
  ],
  slots: [
   { name: 'default', description: 'Quote text' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-blockquote author="John Doe" source="Book Title">\n The best way to predict the future is to invent it.\n</gds-blockquote>' },
  ],
 },
 Citation: {
  name: 'Citation',
  tag: 'gds-citation',
  category: 'Display',
  description: 'A citation reference element for academic or scholarly references.',
  props: [
   { name: 'authors', type: 'string', description: 'Author names' },
   { name: 'title', type: 'string', description: 'Work title' },
   { name: 'year', type: 'string', description: 'Publication year' },
   { name: 'source', type: 'string', description: 'Source/journal' },
   { name: 'url', type: 'string', description: 'Link URL' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-citation authors="Smith, J." title="On Things" year="2024" source="Journal of Things"></gds-citation>' },
  ],
 },
 Icon: {
  name: 'Icon',
  tag: 'gds-icon',
  category: 'Display',
  description: 'Renders an SVG icon from a named set or inline SVG string.',
  props: [
   { name: 'name', type: 'string', description: 'Icon name from the icon set' },
   { name: 'svg', type: 'string', description: 'Inline SVG string' },
   { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Icon size' },
   { name: 'color', type: 'string', description: 'Icon color (CSS color)' },
  ],
  examples: [
   { title: 'Named', code: '<gds-icon name="check" size="lg"></gds-icon>' },
   { title: 'Inline SVG', code: '<gds-icon svg=${mySvgString} size="sm"></gds-icon>' },
  ],
 },
 Thumbnail: {
  name: 'Thumbnail',
  tag: 'gds-thumbnail',
  category: 'Display',
  description: 'A small image thumbnail with optional border and rounded corners.',
  props: [
   { name: 'src', type: 'string', description: 'Image URL' },
   { name: 'alt', type: 'string', description: 'Alt text' },
   { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Thumbnail size' },
   { name: 'shape', type: "'rounded' | 'circle' | 'square'", default: "'rounded'", description: 'Corner shape' },
   { name: 'ratio', type: "'1 / 1' | '4 / 3' | '16 / 9'", default: "'1 / 1'", description: 'Aspect ratio' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-thumbnail src="/image.jpg" alt="Preview" size="lg"></gds-thumbnail>' },
  ],
 },
 Heading: {
  name: 'Heading',
  tag: 'gds-heading',
  category: 'Typography',
  description: 'A heading element with configurable level and size.',
  props: [
   { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'Heading level (h1–h6)' },
   { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", description: 'Visual size (overrides level)' },
   { name: 'weight', type: "'normal' | 'medium' | 'semibold' | 'bold'", default: "'semibold'", description: 'Font weight' },
   { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment' },
  ],
  slots: [
   { name: 'default', description: 'Heading text' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-heading level="1">Page Title</gds-heading>' },
   { title: 'Custom size', code: '<gds-heading level="3" size="xl">Large H3</gds-heading>' },
  ],
 },
 Text: {
  name: 'Text',
  tag: 'gds-text',
  category: 'Typography',
  description: 'A text element with size, weight, and color variants.',
  props: [
   { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Font size' },
   { name: 'weight', type: "'normal' | 'medium' | 'semibold' | 'bold'", default: "'normal'", description: 'Font weight' },
   { name: 'variant', type: "'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'", default: "'default'", description: 'Color variant' },
   { name: 'align', type: "'left' | 'center' | 'right' | 'justify'", default: "'left'", description: 'Text alignment' },
   { name: 'truncate', type: 'boolean', default: 'false', description: 'Truncate with ellipsis' },
  ],
  slots: [
   { name: 'default', description: 'Text content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-text>Hello world</gds-text>' },
   { title: 'Muted', code: '<gds-text variant="muted" size="sm">Helper text</gds-text>' },
  ],
 },
 Code: {
  name: 'Code',
  tag: 'gds-code',
  category: 'Typography',
  description: 'An inline or block code element with optional syntax highlighting.',
  props: [
   { name: 'block', type: 'boolean', default: 'false', description: 'Render as code block' },
   { name: 'language', type: 'string', description: 'Language for highlighting' },
   { name: 'copyable', type: 'boolean', default: 'false', description: 'Show copy button' },
  ],
  slots: [
   { name: 'default', description: 'Code text' },
  ],
  examples: [
   { title: 'Inline', code: '<gds-code>const x = 42</gds-code>' },
   { title: 'Block', code: '<gds-code block language="typescript" copyable>const x: number = 42;</gds-code>' },
  ],
 },
 Card: {
  name: 'Card',
  tag: 'gds-card',
  category: 'Container',
  description: 'A container with optional elevation, used for widgets, settings groups, and galleries.',
  props: [
   { name: 'variant', type: "'default' | 'elevated' | 'outlined'", default: "'default'", description: 'Card style' },
   { name: 'padding', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '4', description: 'Internal padding' },
   { name: 'interactive', type: 'boolean', default: 'false', description: 'Hover state for clickable cards' },
   { name: 'href', type: 'string', description: 'Makes the card a link' },
  ],
  slots: [
   { name: 'header', description: 'Card header content' },
   { name: 'default', description: 'Card body' },
   { name: 'footer', description: 'Card footer' },
  ],
  examples: [
   { title: 'Basic card', code: '<gds-card variant="elevated" padding="4">\n <div slot="header"><gds-heading level="3">Title</gds-heading></div>\n <div slot="body">Content here</div>\n <div slot="footer"><gds-button label="Action" size="sm"></gds-button></div>\n</gds-card>' },
  ],
 },
 ClickableCard: {
  name: 'ClickableCard',
  tag: 'gds-clickable-card',
  category: 'Container',
  description: 'A card that acts as a clickable link with hover and focus states.',
  props: [
   { name: 'href', type: 'string', description: 'Link URL' },
   { name: 'target', type: "'_self' | '_blank'", default: "'_self'", description: 'Link target' },
   { name: 'padding', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '4', description: 'Internal padding' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
  ],
  slots: [
   { name: 'default', description: 'Card content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-clickable-card href="/details">\n <gds-heading level="4">Click me</gds-heading>\n <gds-text variant="muted">Go to details</gds-text>\n</gds-clickable-card>' },
  ],
 },
 SelectableCard: {
  name: 'SelectableCard',
  tag: 'gds-selectable-card',
  category: 'Container',
  description: 'A card that can be selected, useful for choice lists and settings.',
  props: [
   { name: 'selected', type: 'boolean', default: 'false', description: 'Selected state' },
   { name: 'value', type: 'string', description: 'Selection value' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable selection' },
   { name: 'padding', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '4', description: 'Internal padding' },
  ],
  slots: [
   { name: 'default', description: 'Card content' },
  ],
  events: [
   { name: 'select', detail: '{ value: string, selected: boolean }', description: 'Fired when selection changes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-selectable-card ?selected=${s} value="option-a">\n <gds-heading level="5">Option A</gds-heading>\n</gds-selectable-card>' },
  ],
 },
 Collapsible: {
  name: 'Collapsible',
  tag: 'gds-collapsible',
  category: 'Container',
  description: 'A collapsible section with a trigger and animated content area.',
  props: [
   { name: 'open', type: 'boolean', default: 'false', description: 'Expanded state' },
   { name: 'label', type: 'string', description: 'Trigger label' },
   { name: 'icon', type: 'string', description: 'Custom trigger icon' },
  ],
  slots: [
   { name: 'default', description: 'Collapsible content' },
   { name: 'trigger', description: 'Custom trigger element' },
  ],
  events: [
   { name: 'toggle', detail: '{ open: boolean }', description: 'Fired when expanded/collapsed' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-collapsible label="Details">\n <gds-text>Hidden content</gds-text>\n</gds-collapsible>' },
  ],
 },
 Carousel: {
  name: 'Carousel',
  tag: 'gds-carousel',
  category: 'Container',
  description: 'A scrollable carousel with navigation arrows and optional indicators.',
  props: [
   { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '4', description: 'Gap between slides' },
   { name: 'showArrows', type: 'boolean', default: 'true', description: 'Show navigation arrows' },
   { name: 'showIndicators', type: 'boolean', default: 'false', description: 'Show dot indicators' },
   { name: 'loop', type: 'boolean', default: 'false', description: 'Loop slides' },
  ],
  slots: [
   { name: 'default', description: 'Slide elements' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-carousel gap="4">\n <gds-card>Slide 1</gds-card>\n <gds-card>Slide 2</gds-card>\n <gds-card>Slide 3</gds-card>\n</gds-carousel>' },
  ],
 },
 Banner: {
  name: 'Banner',
  tag: 'gds-banner',
  category: 'Display',
  description: 'A prominent banner for announcements or important messages.',
  props: [
   { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Banner variant' },
   { name: 'title', type: 'string', description: 'Banner title' },
   { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
   { name: 'icon', type: 'string', description: 'Custom icon' },
  ],
  slots: [
   { name: 'default', description: 'Banner body content' },
   { name: 'actions', description: 'Action buttons' },
  ],
  events: [
   { name: 'dismiss', detail: 'void', description: 'Fired when banner is dismissed' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-banner variant="info" title="Heads up" dismissible>\n A new version is available.\n</gds-banner>' },
  ],
 },
 TextInput: {
  name: 'TextInput',
  tag: 'gds-text-input',
  category: 'Form',
  description: 'A controlled text input with label, supporting text, and error states.',
  props: [
   { name: 'value', type: 'string', default: "''", description: 'Input value (controlled)' },
   { name: 'placeholder', type: 'string', description: 'Placeholder text' },
   { name: 'type', type: "'text' | 'email' | 'password' | 'search' | 'url'", default: "'text'", description: 'Input type' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'error', type: 'string', description: 'Error message (shows red border + error text)' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
   { name: 'readonly', type: 'boolean', default: 'false', description: 'Read-only input' },
   { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
   { name: 'icon', type: 'string', description: 'Leading icon SVG' },
  ],
  events: [
   { name: 'input', detail: '{ value: string }', description: 'Fired on each keystroke' },
   { name: 'change', detail: '{ value: string }', description: 'Fired on blur/Enter' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-text-input placeholder="Enter text" .value=${value} @input=${handleChange}></gds-text-input>' },
   { title: 'With label and error', code: '<gds-text-input label="Email" type="email" placeholder="you@example.com" error="Invalid email"></gds-text-input>' },
  ],
 },
 TextArea: {
  name: 'TextArea',
  tag: 'gds-text-area',
  category: 'Form',
  description: 'A multi-line text input with auto-resize option.',
  props: [
   { name: 'value', type: 'string', default: "''", description: 'Text value (controlled)' },
   { name: 'placeholder', type: 'string', description: 'Placeholder text' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'error', type: 'string', description: 'Error message' },
   { name: 'rows', type: 'number', default: '4', description: 'Visible rows' },
   { name: 'autoResize', type: 'boolean', default: 'false', description: 'Auto-resize to content' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
   { name: 'readonly', type: 'boolean', default: 'false', description: 'Read-only' },
   { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
  ],
  events: [
   { name: 'input', detail: '{ value: string }', description: 'Fired on each keystroke' },
   { name: 'change', detail: '{ value: string }', description: 'Fired on blur' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-text-area label="Message" placeholder="Type here..." rows="4"></gds-text-area>' },
  ],
 },
 NumberInput: {
  name: 'NumberInput',
  tag: 'gds-number-input',
  category: 'Form',
  description: 'A numeric input with increment/decrement controls.',
  props: [
   { name: 'value', type: 'number', default: '0', description: 'Current value' },
   { name: 'min', type: 'number', description: 'Minimum value' },
   { name: 'max', type: 'number', description: 'Maximum value' },
   { name: 'step', type: 'number', default: '1', description: 'Increment step' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'error', type: 'string', description: 'Error message' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
   { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
  ],
  events: [
   { name: 'input', detail: '{ value: number }', description: 'Fired on value change' },
   { name: 'change', detail: '{ value: number }', description: 'Fired on commit' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-number-input label="Quantity" value="1" min="0" max="100" step="1"></gds-number-input>' },
  ],
 },
 Checkbox: {
  name: 'Checkbox',
  tag: 'gds-checkbox',
  category: 'Form',
  description: 'A checkbox with label and indeterminate state.',
  props: [
   { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
   { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable checkbox' },
   { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
  ],
  events: [
   { name: 'change', detail: '{ checked: boolean }', description: 'Fired when checked state changes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-checkbox label="Accept terms" ?checked=${c}></gds-checkbox>' },
  ],
 },
 Radio: {
  name: 'Radio',
  tag: 'gds-radio',
  category: 'Form',
  description: 'A radio button, typically used within a radio group.',
  props: [
   { name: 'checked', type: 'boolean', default: 'false', description: 'Selected state' },
   { name: 'value', type: 'string', description: 'Radio value' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable radio' },
   { name: 'name', type: 'string', description: 'Group name' },
  ],
  events: [
   { name: 'change', detail: '{ value: string }', description: 'Fired when selected' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-radio label="Option A" value="a" name="group1"></gds-radio>\n<gds-radio label="Option B" value="b" name="group1"></gds-radio>' },
  ],
 },
 Switch: {
  name: 'Switch',
  tag: 'gds-switch',
  category: 'Form',
  description: 'A toggle switch for binary on/off states.',
  props: [
   { name: 'checked', type: 'boolean', default: 'false', description: 'On/off state' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable switch' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Switch size' },
  ],
  events: [
   { name: 'change', detail: '{ checked: boolean }', description: 'Fired when toggled' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-switch label="Enable notifications" ?checked=${on}></gds-switch>' },
  ],
 },
 Slider: {
  name: 'Slider',
  tag: 'gds-slider',
  category: 'Form',
  description: 'A range slider with optional ticks and labels.',
  props: [
   { name: 'value', type: 'number | number[]', default: '0', description: 'Current value (or values for range)' },
   { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
   { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
   { name: 'step', type: 'number', default: '1', description: 'Step increment' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable slider' },
   { name: 'showTicks', type: 'boolean', default: 'false', description: 'Show tick marks' },
  ],
  events: [
   { name: 'input', detail: '{ value: number | number[] }', description: 'Fired during drag' },
   { name: 'change', detail: '{ value: number | number[] }', description: 'Fired on release' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-slider label="Volume" min="0" max="100" value="50"></gds-slider>' },
  ],
 },
 Select: {
  name: 'Select',
  tag: 'gds-select',
  category: 'Form',
  description: 'A dropdown select input with single or multi-select support.',
  props: [
   { name: 'value', type: 'string | string[]', description: 'Selected value(s)' },
   { name: 'placeholder', type: 'string', description: 'Placeholder text' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'error', type: 'string', description: 'Error message' },
   { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple selections' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable select' },
   { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Select size' },
  ],
  slots: [
   { name: 'default', description: 'Option or option-group elements' },
  ],
  events: [
   { name: 'change', detail: '{ value: string | string[] }', description: 'Fired when selection changes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-select label="Country" placeholder="Select...">\n <gds-option value="us">United States</gds-option>\n <gds-option value="uk">United Kingdom</gds-option>\n</gds-select>' },
  ],
 },
 Field: {
  name: 'Field',
  tag: 'gds-field',
  category: 'Form',
  description: 'A wrapper for form inputs providing label, hint, and error display.',
  props: [
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'error', type: 'string', description: 'Error message' },
   { name: 'required', type: 'boolean', default: 'false', description: 'Show required indicator' },
  ],
  slots: [
   { name: 'default', description: 'Input element' },
   { name: 'label', description: 'Custom label content' },
   { name: 'hint', description: 'Custom hint content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-field label="Username" hint="3–20 characters" required>\n <gds-text-input placeholder="username" required></gds-text-input>\n</gds-field>' },
  ],
 },
 FileInput: {
  name: 'FileInput',
  tag: 'gds-file-input',
  category: 'Form',
  description: 'A file upload input with drag-and-drop support.',
  props: [
   { name: 'accept', type: 'string', description: 'Accepted file types' },
   { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple files' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'error', type: 'string', description: 'Error message' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
   { name: 'dragDrop', type: 'boolean', default: 'true', description: 'Enable drag-and-drop zone' },
  ],
  events: [
   { name: 'change', detail: '{ files: File[] }', description: 'Fired when files are selected' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-file-input label="Upload" accept="image/*" multiple></gds-file-input>' },
  ],
 },
 DateInput: {
  name: 'DateInput',
  tag: 'gds-date-input',
  category: 'Form',
  description: 'A date picker input with optional min/max constraints.',
  props: [
   { name: 'value', type: 'string', description: 'Date value (ISO 8601)' },
   { name: 'min', type: 'string', description: 'Minimum date' },
   { name: 'max', type: 'string', description: 'Maximum date' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'error', type: 'string', description: 'Error message' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
   { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
  ],
  events: [
   { name: 'change', detail: '{ value: string }', description: 'Fired when date is selected' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-date-input label="Birthday" value="1990-01-01"></gds-date-input>' },
  ],
 },
 TimeInput: {
  name: 'TimeInput',
  tag: 'gds-time-input',
  category: 'Form',
  description: 'A time picker input with optional step control.',
  props: [
   { name: 'value', type: 'string', description: 'Time value (HH:MM)' },
   { name: 'min', type: 'string', description: 'Minimum time' },
   { name: 'max', type: 'string', description: 'Maximum time' },
   { name: 'step', type: 'number', description: 'Step in seconds' },
   { name: 'label', type: 'string', description: 'Label text' },
   { name: 'hint', type: 'string', description: 'Supporting text' },
   { name: 'error', type: 'string', description: 'Error message' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
   { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
  ],
  events: [
   { name: 'change', detail: '{ value: string }', description: 'Fired when time is selected' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-time-input label="Start time" value="09:00"></gds-time-input>' },
  ],
 },
 Toast: {
  name: 'Toast',
  tag: 'gds-toast',
  category: 'Feedback',
  description: 'A transient notification toast with auto-dismiss.',
  props: [
   { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Toast variant' },
   { name: 'title', type: 'string', description: 'Toast title' },
   { name: 'message', type: 'string', description: 'Toast message' },
   { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss duration (ms), 0 for manual' },
   { name: 'dismissible', type: 'boolean', default: 'true', description: 'Show close button' },
   { name: 'icon', type: 'string', description: 'Custom icon' },
  ],
  events: [
   { name: 'dismiss', detail: 'void', description: 'Fired when toast is dismissed' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-toast variant="success" title="Saved" message="Changes saved successfully." duration="3000"></gds-toast>' },
  ],
 },
 Spinner: {
  name: 'Spinner',
  tag: 'gds-spinner',
  category: 'Feedback',
  description: 'A loading spinner indicator.',
  props: [
   { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Spinner size' },
   { name: 'color', type: 'string', description: 'Spinner color (CSS color)' },
   { name: 'label', type: 'string', description: 'Accessible label' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-spinner size="lg" label="Loading..."></gds-spinner>' },
  ],
 },
 Progressbar: {
  name: 'Progressbar',
  tag: 'gds-progressbar',
  category: 'Feedback',
  description: 'A progress bar showing completion percentage.',
  props: [
   { name: 'value', type: 'number', default: '0', description: 'Current value (0–100)' },
   { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
   { name: 'variant', type: "'default' | 'success' | 'warning' | 'danger'", default: "'default'", description: 'Color variant' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Bar height' },
   { name: 'label', type: 'string', description: 'Accessible label' },
   { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate mode' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-progressbar value="60" label="Uploading..."></gds-progressbar>' },
  ],
 },
 Skeleton: {
  name: 'Skeleton',
  tag: 'gds-skeleton',
  category: 'Feedback',
  description: 'A placeholder skeleton for loading states.',
  props: [
   { name: 'variant', type: "'text' | 'rect' | 'circle'", default: "'text'", description: 'Skeleton shape' },
   { name: 'width', type: 'string', description: 'Width (CSS)' },
   { name: 'height', type: 'string', description: 'Height (CSS)' },
   { name: 'lines', type: 'number', default: '1', description: 'Number of lines (text variant)' },
   { name: 'rounded', type: 'boolean', default: 'false', description: 'Fully rounded corners' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-skeleton variant="text" lines="3"></gds-skeleton>' },
   { title: 'Avatar', code: '<gds-skeleton variant="circle" width="48px" height="48px"></gds-skeleton>' },
  ],
 },
 StatusDot: {
  name: 'StatusDot',
  tag: 'gds-status-dot',
  category: 'Feedback',
  description: 'A small colored dot indicating status.',
  props: [
   { name: 'status', type: "'online' | 'offline' | 'busy' | 'away' | 'idle'", default: "'online'", description: 'Status type' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dot size' },
   { name: 'label', type: 'string', description: 'Accessible label' },
   { name: 'pulse', type: 'boolean', default: 'false', description: 'Pulse animation' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-status-dot status="online" pulse></gds-status-dot>' },
  ],
 },
 Tooltip: {
  name: 'Tooltip',
  tag: 'gds-tooltip',
  category: 'Overlay',
  description: 'A tooltip that displays on hover of a trigger element.',
  props: [
   { name: 'content', type: 'string', description: 'Tooltip text' },
   { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Tooltip placement' },
   { name: 'delay', type: 'number', default: '300', description: 'Show delay (ms)' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable tooltip' },
  ],
  slots: [
   { name: 'default', description: 'Trigger element' },
   { name: 'content', description: 'Custom tooltip content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-tooltip content="Delete item" placement="top">\n <gds-icon-button icon=${trashIcon} label="Delete"></gds-icon-button>\n</gds-tooltip>' },
  ],
 },
 EmptyState: {
  name: 'EmptyState',
  tag: 'gds-empty-state',
  category: 'Display',
  description: 'A placeholder for empty content areas with icon, title, and action.',
  props: [
   { name: 'title', type: 'string', description: 'Title text' },
   { name: 'description', type: 'string', description: 'Description text' },
   { name: 'icon', type: 'string', description: 'Icon name or SVG' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Empty state size' },
  ],
  slots: [
   { name: 'default', description: 'Custom content (overrides icon)' },
   { name: 'actions', description: 'Action buttons' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-empty-state icon=${inboxIcon} title="No messages" description="You have no messages yet.">\n <gds-button slot="actions" label="Compose"></gds-button>\n</gds-empty-state>' },
  ],
 },
 Tabs: {
  name: 'Tabs',
  tag: 'gds-tabs',
  category: 'Navigation',
  description: 'A tabbed navigation container with activatable tabs.',
  props: [
   { name: 'value', type: 'string', description: 'Active tab value' },
   { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Tab layout' },
   { name: 'variant', type: "'line' | 'enclosed'", default: "'line'", description: 'Tab style' },
  ],
  slots: [
   { name: 'default', description: 'Tab panel elements' },
   { name: 'tab-bar', description: 'Tab trigger elements' },
  ],
  events: [
   { name: 'change', detail: '{ value: string }', description: 'Fired when active tab changes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-tabs value="overview">\n <gds-tab slot="tab-bar" value="overview">Overview</gds-tab>\n <gds-tab slot="tab-bar" value="activity">Activity</gds-tab>\n <gds-tab-panel value="overview">Overview content</gds-tab-panel>\n <gds-tab-panel value="activity">Activity content</gds-tab-panel>\n</gds-tabs>' },
  ],
 },
 Breadcrumbs: {
  name: 'Breadcrumbs',
  tag: 'gds-breadcrumbs',
  category: 'Navigation',
  description: 'A breadcrumb trail for hierarchical navigation.',
  props: [
   { name: 'separator', type: "string", default: "'/'", description: 'Separator between crumbs' },
   { name: 'maxItems', type: 'number', description: 'Max visible items before collapsing' },
  ],
  slots: [
   { name: 'default', description: 'Breadcrumb item elements' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-breadcrumbs>\n <gds-breadcrumb-item href="/">Home</gds-breadcrumb-item>\n <gds-breadcrumb-item href="/settings">Settings</gds-breadcrumb-item>\n <gds-breadcrumb-item>Profile</gds-breadcrumb-item>\n</gds-breadcrumbs>' },
  ],
 },
 Pagination: {
  name: 'Pagination',
  tag: 'gds-pagination',
  category: 'Navigation',
  description: 'A pagination control for navigating pages.',
  props: [
   { name: 'page', type: 'number', default: '1', description: 'Current page' },
   { name: 'pageSize', type: 'number', default: '10', description: 'Items per page' },
   { name: 'total', type: 'number', default: '0', description: 'Total items' },
   { name: 'siblingCount', type: 'number', default: '1', description: 'Adjacent page buttons' },
   { name: 'showEdges', type: 'boolean', default: 'true', description: 'Always show first/last page' },
  ],
  events: [
   { name: 'change', detail: '{ page: number, pageSize: number }', description: 'Fired when page changes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-pagination page="1" pageSize="10" total="120" @change=${onChange}></gds-pagination>' },
  ],
 },
 Navigation: {
  name: 'Navigation',
  tag: 'gds-navigation',
  category: 'Navigation',
  description: 'A navigation container with collapsible sections and active state.',
  props: [
   { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Layout direction' },
   { name: 'collapsed', type: 'boolean', default: 'false', description: 'Collapsed (icon-only) mode' },
  ],
  slots: [
   { name: 'default', description: 'Navigation items' },
   { name: 'header', description: 'Header content (logo, etc.)' },
   { name: 'footer', description: 'Footer content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-navigation>\n <gds-nav-item href="/dashboard" active>Dashboard</gds-nav-item>\n <gds-nav-item href="/settings">Settings</gds-nav-item>\n</gds-navigation>' },
  ],
 },
 AppShell: {
  name: 'AppShell',
  tag: 'gds-app-shell',
  category: 'Layout',
  description: 'An application shell layout with sidebar, header, and content areas.',
  props: [
   { name: 'sidebarWidth', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Sidebar width' },
   { name: 'sidebarCollapsed', type: 'boolean', default: 'false', description: 'Collapse sidebar' },
   { name: 'headerHeight', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Header height' },
  ],
  slots: [
   { name: 'sidebar', description: 'Sidebar content (navigation)' },
   { name: 'header', description: 'Header content (top bar)' },
   { name: 'default', description: 'Main content area' },
   { name: 'footer', description: 'Footer content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-app-shell>\n <gds-navigation slot="sidebar">\n  <gds-nav-item href="/home" active>Home</gds-nav-item>\n </gds-navigation>\n <div slot="header"><gds-text>My App</gds-text></div>\n <main>Page content</main>\n</gds-app-shell>' },
  ],
 },
 CommandPalette: {
  name: 'CommandPalette',
  tag: 'gds-command-palette',
  category: 'Navigation',
  description: 'A command palette for quick search and action execution.',
  props: [
   { name: 'open', type: 'boolean', default: 'false', description: 'Palette visibility' },
   { name: 'placeholder', type: 'string', default: "'Search commands...'", description: 'Search placeholder' },
  ],
  slots: [
   { name: 'default', description: 'Command items' },
  ],
  events: [
   { name: 'execute', detail: '{ command: string }', description: 'Fired when a command is executed' },
   { name: 'close', detail: 'void', description: 'Fired when palette is closed' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-command-palette ?open=${open} placeholder="Type a command...">\n <gds-command-item value="go-home">Go Home</gds-command-item>\n <gds-command-item value="new-file">New File</gds-command-item>\n</gds-command-palette>' },
  ],
 },
 Dialog: {
  name: 'Dialog',
  tag: 'gds-dialog',
  category: 'Overlay',
  description: 'A modal dialog with title, body, and footer slots.',
  props: [
   { name: 'open', type: 'boolean', default: 'false', description: 'Whether dialog is open' },
   { name: 'title', type: 'string', description: 'Dialog title' },
   { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Dialog width' },
   { name: 'dismissible', type: 'boolean', default: 'true', description: 'Close on Esc/backdrop click' },
  ],
  slots: [
   { name: 'default', description: 'Dialog body content' },
   { name: 'footer', description: 'Dialog footer (actions)' },
  ],
  events: [
   { name: 'close', detail: 'void', description: 'Fired when dialog closes' },
   { name: 'open', detail: 'void', description: 'Fired when dialog opens' },
  ],
  examples: [
   { title: 'Basic dialog', code: '<gds-dialog ?open title="Confirm" size="sm">\n <p>Are you sure?</p>\n <div slot="footer">\n  <gds-button label="Cancel" variant="ghost"></gds-button>\n  <gds-button label="Confirm"></gds-button>\n </div>\n</gds-dialog>' },
  ],
 },
 Popover: {
  name: 'Popover',
  tag: 'gds-popover',
  category: 'Overlay',
  description: 'A floating popover anchored to a trigger element.',
  props: [
   { name: 'open', type: 'boolean', default: 'false', description: 'Popover visibility' },
   { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'", default: "'top'", description: 'Placement relative to trigger' },
   { name: 'trigger', type: "'click' | 'hover' | 'focus'", default: "'click'", description: 'Show trigger' },
   { name: 'dismissible', type: 'boolean', default: 'true', description: 'Close on outside click' },
  ],
  slots: [
   { name: 'default', description: 'Trigger element' },
   { name: 'content', description: 'Popover content' },
  ],
  events: [
   { name: 'open', detail: 'void', description: 'Fired when popover opens' },
   { name: 'close', detail: 'void', description: 'Fired when popover closes' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-popover placement="bottom">\n <gds-button slot="default" label="Show popover"></gds-button>\n <div slot="content">\n  <gds-text>Popover content here</gds-text>\n </div>\n</gds-popover>' },
  ],
 },
 HoverCard: {
  name: 'HoverCard',
  tag: 'gds-hover-card',
  category: 'Overlay',
  description: 'A card that appears on hover, providing supplementary information.',
  props: [
   { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Card placement' },
   { name: 'delay', type: 'number', default: '200', description: 'Show delay (ms)' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable hover card' },
  ],
  slots: [
   { name: 'default', description: 'Trigger element' },
   { name: 'content', description: 'Hover card content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-hover-card placement="bottom">\n <gds-link href="/user" slot="default" label="@user"></gds-link>\n <div slot="content">\n  <gds-avatar initials="JD"></gds-avatar>\n  <gds-text>John Doe</gds-text>\n </div>\n</gds-hover-card>' },
  ],
 },
 ContextMenu: {
  name: 'ContextMenu',
  tag: 'gds-context-menu',
  category: 'Overlay',
  description: 'A context menu that appears on right-click.',
  props: [
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable context menu' },
  ],
  slots: [
   { name: 'default', description: 'Trigger element' },
   { name: 'menu', description: 'Menu items' },
  ],
  events: [
   { name: 'select', detail: '{ value: string }', description: 'Fired when an item is selected' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-context-menu>\n <div slot="default">Right-click me</div>\n <div slot="menu">\n  <gds-dropdown-menu-item value="copy">Copy</gds-dropdown-menu-item>\n  <gds-dropdown-menu-item value="paste">Paste</gds-dropdown-menu-item>\n </div>\n</gds-context-menu>' },
  ],
 },
 Table: {
  name: 'Table',
  tag: 'gds-table',
  category: 'Data',
  description: 'A data table with sortable columns, row selection, and pagination hooks.',
  props: [
   { name: 'data', type: 'object[]', description: 'Array of row data objects' },
   { name: 'columns', type: 'ColumnDef[]', description: 'Column definitions' },
   { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row selection' },
   { name: 'sortable', type: 'boolean', default: 'true', description: 'Enable column sorting' },
   { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Sticky header row' },
   { name: 'density', type: "'compact' | 'comfortable' | 'cozy'", default: "'comfortable'", description: 'Row density' },
  ],
  events: [
   { name: 'row-select', detail: '{ row: object, selected: boolean }', description: 'Fired when a row is selected' },
   { name: 'sort', detail: "{ column: string, direction: 'asc' | 'desc' }", description: 'Fired when sorting changes' },
  ],
  examples: [
   { title: 'Basic', code: "<gds-table .data=${rows} .columns=${cols} selectable></gds-table>" },
  ],
 },
 List: {
  name: 'List',
  tag: 'gds-list',
  category: 'Data',
  description: 'A list container for displaying items in a vertical layout.',
  props: [
   { name: 'variant', type: "'default' | 'compact' | 'spaced'", default: "'default'", description: 'List spacing variant' },
   { name: 'divided', type: 'boolean', default: 'false', description: 'Show dividers between items' },
   { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable item selection' },
  ],
  slots: [
   { name: 'default', description: 'List item elements' },
  ],
  events: [
   { name: 'select', detail: '{ value: string }', description: 'Fired when an item is selected' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-list divided>\n <gds-item>First</gds-item>\n <gds-item>Second</gds-item>\n <gds-item>Third</gds-item>\n</gds-list>' },
  ],
 },
 Item: {
  name: 'Item',
  tag: 'gds-item',
  category: 'Data',
  description: 'A list item with optional icon, trailing content, and selection state.',
  props: [
   { name: 'value', type: 'string', description: 'Item value' },
   { name: 'label', type: 'string', description: 'Item label' },
   { name: 'icon', type: 'string', description: 'Leading icon' },
   { name: 'selected', type: 'boolean', default: 'false', description: 'Selected state' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable item' },
   { name: 'clickable', type: 'boolean', default: 'false', description: 'Hover/click interaction' },
  ],
  slots: [
   { name: 'default', description: 'Item content (overrides label)' },
   { name: 'trailing', description: 'Trailing content (badge, action, etc.)' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-item value="1" label="Item one" icon=${dotIcon} clickable></gds-item>' },
  ],
 },
 TreeList: {
  name: 'TreeList',
  tag: 'gds-tree-list',
  category: 'Data',
  description: 'A hierarchical tree list with expandable nodes.',
  props: [
   { name: 'data', type: 'TreeNode[]', description: 'Tree data structure' },
   { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable node selection' },
   { name: 'expandAll', type: 'boolean', default: 'false', description: 'Expand all nodes by default' },
   { name: 'showLines', type: 'boolean', default: 'false', description: 'Show guide lines' },
  ],
  events: [
   { name: 'select', detail: '{ node: TreeNode }', description: 'Fired when a node is selected' },
   { name: 'expand', detail: '{ node: TreeNode, expanded: boolean }', description: 'Fired when a node is expanded/collapsed' },
  ],
  examples: [
   { title: 'Basic', code: "<gds-tree-list .data=${treeData} selectable></gds-tree-list>" },
  ],
 },
 ChatMessage: {
  name: 'ChatMessage',
  tag: 'gds-chat-message',
  category: 'Chat',
  description: 'A chat message bubble with avatar, timestamp, and role-based styling.',
  props: [
   { name: 'role', type: "'user' | 'assistant' | 'system'", default: "'user'", description: 'Message sender role' },
   { name: 'content', type: 'string', description: 'Message text content' },
   { name: 'author', type: 'string', description: 'Author name' },
   { name: 'avatarSrc', type: 'string', description: 'Avatar image URL' },
   { name: 'timestamp', type: 'string | Date', description: 'Message timestamp' },
   { name: 'status', type: "'pending' | 'sent' | 'error'", default: "'sent'", description: 'Delivery status' },
  ],
  slots: [
   { name: 'default', description: 'Custom message content (overrides content prop)' },
   { name: 'actions', description: 'Action buttons (copy, retry, etc.)' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-chat-message role="user" content="Hello!" author="You" .timestamp=${new Date()}></gds-chat-message>' },
   { title: 'Assistant', code: '<gds-chat-message role="assistant" content="Hi there!" author="AI" status="sent"></gds-chat-message>' },
  ],
 },
 ChatComposer: {
  name: 'ChatComposer',
  tag: 'gds-chat-composer',
  category: 'Chat',
  description: 'A chat input composer with send button and optional attachments.',
  props: [
   { name: 'value', type: 'string', default: "''", description: 'Input text value' },
   { name: 'placeholder', type: 'string', default: "'Type a message...'", description: 'Placeholder text' },
   { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
   { name: 'sendOnEnter', type: 'boolean', default: 'true', description: 'Send on Enter key' },
   { name: 'attachments', type: 'boolean', default: 'false', description: 'Enable file attachments' },
   { name: 'rows', type: 'number', default: '1', description: 'Visible rows (auto-expands)' },
  ],
  slots: [
   { name: 'actions', description: 'Custom action buttons' },
  ],
  events: [
   { name: 'send', detail: '{ value: string, attachments?: File[] }', description: 'Fired when message is sent' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-chat-composer .value=${msg} placeholder="Type a message..." @send=${onSend}></gds-chat-composer>' },
  ],
 },
 ChatLayout: {
  name: 'ChatLayout',
  tag: 'gds-chat-layout',
  category: 'Chat',
  description: 'A full chat layout with message list, scroll container, and composer.',
  props: [
   { name: 'autoScroll', type: 'boolean', default: 'true', description: 'Auto-scroll to bottom on new messages' },
   { name: 'showScrollButton', type: 'boolean', default: 'true', description: 'Show scroll-to-bottom button' },
  ],
  slots: [
   { name: 'default', description: 'Chat message elements' },
   { name: 'header', description: 'Header bar content' },
   { name: 'composer', description: 'Composer element' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-chat-layout>\n <gds-chat-message role="user" content="Hi"></gds-chat-message>\n <gds-chat-message role="assistant" content="Hello!"></gds-chat-message>\n <gds-chat-composer slot="composer"></gds-chat-composer>\n</gds-chat-layout>' },
  ],
 },
 ChatToolCalls: {
  name: 'ChatToolCalls',
  tag: 'gds-chat-tool-calls',
  category: 'Chat',
  description: 'Displays a sequence of tool calls made by the assistant with status and results.',
  props: [
   { name: 'calls', type: 'ToolCall[]', description: 'Array of tool call objects' },
   { name: 'collapsible', type: 'boolean', default: 'true', description: 'Allow collapsing the list' },
   { name: 'expanded', type: 'boolean', default: 'false', description: 'Initial expanded state' },
  ],
  slots: [
   { name: 'default', description: 'Custom tool call rendering' },
  ],
  examples: [
   { title: 'Basic', code: "<gds-chat-tool-calls .calls=${toolCalls} expanded></gds-chat-tool-calls>" },
  ],
 },
 Kbd: {
  name: 'Kbd',
  tag: 'gds-kbd',
  category: 'Display',
  description: 'A keyboard key indicator for displaying shortcuts.',
  props: [
   { name: 'key', type: 'string', description: 'Key label (e.g. "Ctrl", "Enter")' },
   { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Key size' },
  ],
  slots: [
   { name: 'default', description: 'Key content (overrides key prop)' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-kbd key="Enter"></gds-kbd>' },
   { title: 'Combo', code: '<gds-hstack gap="1">\n <gds-kbd key="Ctrl"></gds-kbd>\n <gds-text size="sm">+</gds-text>\n <gds-kbd key="K"></gds-kbd>\n</gds-hstack>' },
  ],
 },
 VisuallyHidden: {
  name: 'VisuallyHidden',
  tag: 'gds-visually-hidden',
  category: 'Display',
  description: 'Content that is visually hidden but accessible to screen readers.',
  props: [],
  slots: [
   { name: 'default', description: 'Hidden content' },
  ],
  examples: [
   { title: 'Basic', code: '<gds-button>\n <gds-icon icon=${closeIcon}></gds-icon>\n <gds-visually-hidden>Close dialog</gds-visually-hidden>\n</gds-button>' },
  ],
 },
};

const componentList = Object.keys(componentDocs).sort();

export const componentCommand: CLICommand = {
 name: 'component',
 description: 'Browse component docs, props, and examples',
 usage: 'gds component [Name] [--list]',
 args: [
  { name: 'Name', description: 'Component name (e.g. Button, Dialog)', required: false },
 ],
 options: [
  { name: 'list', description: 'List all available components', alias: 'l' },
 ],
 run: (args, options) => {
  if (options.list || options.l) {
   console.log('\nAvailable components:\n');
   const categories: Record<string, string[]> = {};
   for (const name of componentList) {
    const doc = componentDocs[name];
    const cat = doc.category;
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(name);
   }
   for (const [cat, comps] of Object.entries(categories)) {
    console.log(` ${cat}:`);
    for (const comp of comps) {
     console.log(`  ${comp.padEnd(20)} ${componentDocs[comp].tag}`);
    }
    console.log();
   }
   return;
  }

  const name = args[0];
  if (!name) {
   console.log('Usage: gds component <Name>');
   console.log('Run `gds component --list` for all components.');
   return;
  }

  const doc = componentDocs[name.charAt(0).toUpperCase+ name.slice(1).toLowerCase()];
  if (!doc) {
   console.error(`Component "${name}" not found. Run \`gds component --list\` for available components.`);
   process.exit(1);
  }

  console.log(`\n${doc.name} (${doc.tag})`);
  console.log(`Category: ${doc.category}`);
  console.log(`\n${doc.description}\n`);

  console.log('Props:');
  for (const prop of doc.props) {
   const def = prop.default ? ` [default: ${prop.default}]` : '';
   console.log(` ${prop.name.padEnd(16)} ${prop.type.padEnd(50)} ${prop.description}${def}`);
  }

  if (doc.slots?.length) {
   console.log('\nSlots:');
   for (const slot of doc.slots) {
    console.log(` ${slot.name.padEnd(16)} ${slot.description}`);
   }
  }

  if (doc.events?.length) {
   console.log('\nEvents:');
   for (const event of doc.events) {
    console.log(` ${event.name.padEnd(16)} ${event.detail.padEnd(30)} ${event.description}`);
   }
  }

  console.log('\nExamples:');
  for (const ex of doc.examples) {
   console.log(`\n ${ex.title}:`);
   for (const line of ex.code.split('\n')) {
    console.log(`  ${line}`);
   }
  }
  console.log();
 },
};