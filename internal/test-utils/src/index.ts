/**
 * GDS Test Utilities
 *
 * Helpers for testing Lit Web Components with @open-wc/testing.
 */
import { fixture, elementUpdated, expect, html, nextFrame } from '@open-wc/testing';
import type { LitElement } from 'lit';

export { fixture, elementUpdated, expect, html, nextFrame };

/**
 * Create a component instance in the DOM and wait for it to be ready.
 */
export async function createComponent<T extends LitElement>(
 tag: string,
 properties?: Record<string, unknown>
): Promise<T> {
 const el = await fixture<T>(html`<${tag} .props=${properties}></${tag}>`);
 if (properties) {
  for (const [key, value] of Object.entries(properties)) {
   (el as any)[key] = value;
  }
  await elementUpdated(el);
 }
 return el;
}

/**
 * Wait for a component to emit an event.
 */
export async function waitForEvent(
 el: HTMLElement,
 eventName: string,
 timeout = 1000
): Promise<Event> {
 return new Promise((resolve, reject) => {
  const timer = setTimeout(=> reject(new Error(`Timeout waiting for ${eventName}`)), timeout);
  el.addEventListener(eventName, (e) => {
   clearTimeout(timer);
   resolve(e);
  }, { once: true });
 });
}

/**
 * Simulate a click on an element.
 */
export function click(el: HTMLElement): void {
 el.click();
}

/**
 * Set a property on a Lit element and wait for update.
 */
export async function setProperty<T extends LitElement>(
 el: T,
 prop: string,
 value: unknown
): Promise<void> {
 (el as any)[prop] = value;
 await elementUpdated(el);
}

/**
 * Get the shadow DOM root of an element.
 */
export function getShadowRoot(el: LitElement): ShadowRoot {
 if (!el.shadowRoot) throw new Error('Element has no shadow root');
 return el.shadowRoot;
}

/**
 * Query an element within shadow DOM.
 */
export function shadowQuery<T extends Element = Element>(
 el: LitElement,
 selector: string
): T | null {
 return getShadowRoot(el).querySelector<T>(selector);
}

/**
 * Query all elements within shadow DOM.
 */
export function shadowQueryAll<T extends Element = Element>(
 el: LitElement,
 selector: string
): T[] {
 return Array.from(getShadowRoot(el).querySelectorAll<T>(selector));
}

/**
 * Check if a CSS custom property (token) is set on an element.
 */
export function getTokenValue(el: HTMLElement, token: string): string {
 return getComputedStyle(el).getPropertyValue(token).trim();
}

/**
 * Assert that a component has the expected ARIA attributes.
 */
export function expectAria(
 el: HTMLElement,
 expectations: Record<string, string | boolean | null>
): void {
 for (const [attr, expected] of Object.entries(expectations)) {
  const actual = el.getAttribute(attr);
  if (expected === null) {
   expect(actual).to.be.null;
  } else if (typeof expected === 'boolean') {
   if (expected) {
    expect(el.hasAttribute(attr)).to.be.true;
   } else {
    expect(el.hasAttribute(attr)).to.be.false;
   }
  } else {
   expect(actual).to.equal(expected);
  }
 }
}