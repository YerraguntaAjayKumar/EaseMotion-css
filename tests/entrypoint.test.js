import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = resolve(__dirname, '..');

describe('easemotion.css — entry-point', () => {
  let css;
  beforeAll(() => {
    css = readFileSync(resolve(rootDir, 'easemotion.css'), 'utf8');
  });

  it('should declare cascade layers', () => {
    expect(css).toContain('@layer easemotion-utilities');
    expect(css).toContain('@layer');
  });

  it('should import all core modules in order', () => {
    const varsIdx = css.indexOf('./core/variables.css');
    const baseIdx = css.indexOf('./core/base.css');
    const animIdx = css.indexOf('./core/animations.css');
    const utilIdx = css.indexOf('./core/utilities.css');

    expect(varsIdx).toBeGreaterThan(-1);
    expect(baseIdx).toBeGreaterThan(-1);
    expect(animIdx).toBeGreaterThan(-1);
    expect(utilIdx).toBeGreaterThan(-1);

    expect(varsIdx).toBeLessThan(baseIdx);
    expect(baseIdx).toBeLessThan(animIdx);
    expect(animIdx).toBeLessThan(utilIdx);
  });

  it('should import all component modules', () => {
    expect(css).toContain('./components/buttons.css');
    expect(css).toContain('./components/cards.css');
    expect(css).toContain('./components/navbar.css');
    expect(css).toContain('./components/masonry.css');
    expect(css).toContain('./components/chip.css');
    expect(css).toContain('./components/footer.css');
    expect(css).toContain('./components/sidebar.css');
    expect(css).toContain('./components/scroll-progress.css');
  });

  it('should import the ease-marquee module', () => {
    expect(css).toContain('./easemotion/ease-marquee.css');
  });

  it('should include prefers-reduced-motion media query', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('should set animation-duration to near-zero in reduced-motion', () => {
    expect(css).toContain('animation-duration: 0.01ms !important');
  });
});

describe('ease-wave.css', () => {
  let css;
  beforeAll(() => {
    css = readFileSync(resolve(rootDir, 'ease-wave.css'), 'utf8');
  });

  it('should define the .ease-wave class', () => {
    expect(css).toContain('.ease-wave');
  });

  it('should define the easeWave keyframes', () => {
    expect(css).toContain('@keyframes easeWave');
  });

  it('should use inline-block display', () => {
    expect(css).toContain('inline-block');
  });

  it('should have a hover state that speeds up the animation', () => {
    expect(css).toContain('.ease-wave:hover');
    expect(css).toContain('animation-duration: 1s');
  });
});

describe('easemotion.min.css — minified bundle', () => {
  it('should exist', () => {
    expect(existsSync(resolve(rootDir, 'easemotion.min.css'))).toBe(true);
  });

  it('should be substantially minified (very few newlines)', () => {
    const content = readFileSync(
      resolve(rootDir, 'easemotion.min.css'),
      'utf8',
    );
    const lineCount = content.split('\n').length;
    expect(lineCount).toBeLessThan(10);
  });

  it('should include key framework classes', () => {
    const content = readFileSync(
      resolve(rootDir, 'easemotion.min.css'),
      'utf8',
    );
    expect(content).toContain('.ease-btn');
    expect(content).toContain('.ease-card');
    expect(content).toContain('.ease-fade-in');
  });
});
