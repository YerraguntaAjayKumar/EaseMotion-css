import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const componentsDir = resolve(__dirname, '../components');

function loadCSS(filename) {
  return readFileSync(resolve(componentsDir, filename), 'utf8');
}

describe('Components — buttons.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('buttons.css'); });

  it('should define the base .ease-btn class', () => {
    expect(css).toContain('.ease-btn');
  });

  it('should define variant classes (primary, success, danger)', () => {
    expect(css).toContain('.ease-btn-primary');
    expect(css).toContain('.ease-btn-success');
    expect(css).toContain('.ease-btn-danger');
  });

  it('should define style modifiers (outline, ghost, link)', () => {
    expect(css).toContain('.ease-btn-outline');
    expect(css).toContain('.ease-btn-ghost');
    expect(css).toContain('.ease-btn-link');
  });

  it('should define size modifiers (sm, lg, xl)', () => {
    expect(css).toContain('.ease-btn-sm');
    expect(css).toContain('.ease-btn-lg');
    expect(css).toContain('.ease-btn-xl');
  });

  it('should define layout modifiers (block, pill, icon)', () => {
    expect(css).toContain('.ease-btn-block');
    expect(css).toContain('.ease-btn-pill');
    expect(css).toContain('.ease-btn-icon');
  });

  it('should define disabled state styles', () => {
    expect(css).toContain('.ease-btn:disabled');
    expect(css).toContain('.ease-btn-disabled');
  });

  it('should include focus-visible for accessibility', () => {
    expect(css).toContain(':focus-visible');
  });
});

describe('Components — cards.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('cards.css'); });

  it('should define the base .ease-card class', () => {
    expect(css).toContain('.ease-card');
  });

  it('should define structural sub-components', () => {
    expect(css).toContain('.ease-card-header');
    expect(css).toContain('.ease-card-body');
    expect(css).toContain('.ease-card-footer');
    expect(css).toContain('.ease-card-title');
    expect(css).toContain('.ease-card-subtitle');
  });

  it('should define visual variant classes', () => {
    expect(css).toContain('.ease-card-shadow');
    expect(css).toContain('.ease-card-hover');
    expect(css).toContain('.ease-card-glow');
    expect(css).toContain('.ease-card-flat');
    expect(css).toContain('.ease-card-outlined');
    expect(css).toContain('.ease-card-glass');
  });

  it('should define the neumorphic card variant', () => {
    expect(css).toContain('.ease-card-neumorphic');
  });

  it('should define accent color variants', () => {
    expect(css).toContain('.ease-card-accent');
    expect(css).toContain('.ease-card-accent-success');
    expect(css).toContain('.ease-card-accent-danger');
    expect(css).toContain('.ease-card-accent-warning');
  });

  it('should define card image layout', () => {
    expect(css).toContain('.ease-card-image');
    expect(css).toContain('.ease-card-img');
  });
});

describe('Components — navbar.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('navbar.css'); });

  it('should define the glass navbar class', () => {
    expect(css).toContain('.ease-navbar-glass');
  });

  it('should define navbar sub-components', () => {
    expect(css).toContain('.ease-navbar-brand');
    expect(css).toContain('.ease-navbar-menu');
    expect(css).toContain('.ease-navbar-item');
  });

  it('should define the sticky variant', () => {
    expect(css).toContain('.ease-navbar-glass-sticky');
  });
});

describe('Components — chip.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('chip.css'); });

  it('should define the chip group and chip classes', () => {
    expect(css).toContain('.ease-chip-group');
    expect(css).toContain('.ease-chip');
  });

  it('should define chip size modifiers', () => {
    expect(css).toContain('.ease-chip-sm');
  });

  it('should handle checkbox interaction for selection', () => {
    expect(css).toContain('input[type="checkbox"]');
    expect(css).toContain(':checked');
  });

  it('should handle disabled chips', () => {
    expect(css).toContain(':disabled');
  });
});

describe('Components — footer.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('footer.css'); });

  it('should define the base footer class', () => {
    expect(css).toContain('.ease-footer');
  });

  it('should define footer structural components', () => {
    expect(css).toContain('.ease-footer-grid');
    expect(css).toContain('.ease-footer-col-title');
    expect(css).toContain('.ease-footer-links');
  });

  it('should define social media section', () => {
    expect(css).toContain('.ease-footer-social');
  });
});

describe('Components — masonry.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('masonry.css'); });

  it('should define the base masonry class', () => {
    expect(css).toContain('.ease-masonry');
  });

  it('should define column count variants', () => {
    expect(css).toContain('.ease-masonry-2');
    expect(css).toContain('.ease-masonry-3');
    expect(css).toContain('.ease-masonry-4');
  });

  it('should define gap utility classes', () => {
    expect(css).toContain('.ease-gap-1');
  });
});

describe('Components — sidebar.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('sidebar.css'); });

  it('should define sidebar layout classes', () => {
    expect(css).toContain('.ease-sidebar-layout');
    expect(css).toContain('.ease-sidebar');
    expect(css).toContain('.ease-sidebar-main');
  });

  it('should define the collapsed state', () => {
    expect(css).toContain('.ease-sidebar-collapsed');
    expect(css).toContain('.ease-sidebar-label');
  });

  it('should define the toggle button', () => {
    expect(css).toContain('.ease-sidebar-toggle');
  });
});

describe('Components — scroll-progress.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('scroll-progress.css'); });

  it('should define the scroll progress bar class', () => {
    expect(css).toContain('.ease-scroll-progress');
  });

  it('should define color variants', () => {
    expect(css).toContain('.ease-scroll-progress-success');
    expect(css).toContain('.ease-scroll-progress-danger');
    expect(css).toContain('.ease-scroll-progress-warning');
  });

  it('should define a scroll-driven animation root', () => {
    expect(css).toContain('.ease-scroll-progress-root');
  });
});
