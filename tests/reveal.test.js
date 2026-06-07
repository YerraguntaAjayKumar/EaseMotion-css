import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const revealSource = readFileSync(
  resolve(__dirname, '../core/reveal.js'),
  'utf8',
);

describe('core/reveal.js — source analysis', () => {
  it('should export a self-contained IIFE', () => {
    expect(revealSource).toMatch(/^\s*\(function/);
    expect(revealSource.trim()).toMatch(/\}\)\(\);?\s*$/);
  });

  it('should reference the ease-reveal class', () => {
    expect(revealSource).toContain('ease-reveal');
  });

  it('should reference the active class', () => {
    expect(revealSource).toContain("'active'");
  });

  it('should use IntersectionObserver when available', () => {
    expect(revealSource).toContain('IntersectionObserver');
  });

  it('should have a fallback for browsers without IntersectionObserver', () => {
    expect(revealSource).toContain("'IntersectionObserver' in window");
  });

  it('should handle DOMContentLoaded for deferred loading', () => {
    expect(revealSource).toContain('DOMContentLoaded');
    expect(revealSource).toContain("document.readyState === 'loading'");
  });

  it('should set IntersectionObserver threshold to 0.15', () => {
    expect(revealSource).toContain('threshold: 0.15');
  });

  it('should unobserve elements after they become visible', () => {
    expect(revealSource).toContain('observer.unobserve(entry.target)');
  });

  it('should check element centering with 85% viewport threshold', () => {
    expect(revealSource).toContain('vh * 0.85');
  });
});

describe('core/reveal.js — DOM with IntersectionObserver', () => {
  it('should add "active" to viewport elements and observe off-screen ones', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><html><head></head><body>
        <div id="visible" class="ease-reveal">Hi</div>
        <div id="hidden" class="ease-reveal">Lo</div>
      </body></html>`,
      { url: 'http://localhost', runScripts: 'dangerously', pretendToBeVisual: true },
    );

    const testScript = `
      window.__observed = [];
      window.IntersectionObserver = function(cb, opts) {
        window.__ioCb = cb;
        this.observe = function(el) { window.__observed.push(el); };
        this.unobserve = function() {};
      };

      document.getElementById('visible').getBoundingClientRect = function() {
        return { top: 0, bottom: 100, left: 0, right: 100, width: 100, height: 100 };
      };
      document.getElementById('hidden').getBoundingClientRect = function() {
        return { top: 2000, bottom: 2100, left: 0, right: 100, width: 100, height: 100 };
      };

      ${revealSource}
    `;

    dom.window.eval(testScript);
    // The IIFE registered a DOMContentLoaded listener; fire it
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));

    const visible = dom.window.document.getElementById('visible');
    const hidden = dom.window.document.getElementById('hidden');

    expect(visible.classList.contains('active')).toBe(true);
    expect(hidden.classList.contains('active')).toBe(false);
    expect(dom.window.__observed).toContain(hidden);
  });

  it('should activate elements via IntersectionObserver callback', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><html><head></head><body>
        <div class="ease-reveal">Test</div>
      </body></html>`,
      { url: 'http://localhost', runScripts: 'dangerously', pretendToBeVisual: true },
    );

    const testScript = `
      window.IntersectionObserver = function(cb, opts) {
        window.__ioCb = cb;
        this.observe = function() {};
        this.unobserve = function() {};
      };
      document.querySelector('.ease-reveal').getBoundingClientRect = function() {
        return { top: 2000, bottom: 2100, left: 0, right: 100, width: 100, height: 100 };
      };
      ${revealSource}
    `;

    dom.window.eval(testScript);
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));

    const el = dom.window.document.querySelector('.ease-reveal');
    expect(el.classList.contains('active')).toBe(false);

    dom.window.__ioCb([{ isIntersecting: true, target: el }]);
    expect(el.classList.contains('active')).toBe(true);
  });
});

describe('core/reveal.js — Fallback without IntersectionObserver', () => {
  it('should immediately add "active" to all ease-reveal elements', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><html><head></head><body>
        <div class="ease-reveal">A</div>
        <div class="ease-reveal">B</div>
      </body></html>`,
      { url: 'http://localhost', runScripts: 'dangerously', pretendToBeVisual: true },
    );

    // JSDOM doesn't have IO by default, so the fallback branch runs
    dom.window.eval(revealSource);
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));

    const els = dom.window.document.querySelectorAll('.ease-reveal');
    els.forEach((el) => {
      expect(el.classList.contains('active')).toBe(true);
    });
  });
});
