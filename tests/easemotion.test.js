import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const easemotionDir = resolve(__dirname, '../easemotion');

function loadCSS(filename) {
  return readFileSync(resolve(easemotionDir, filename), 'utf8');
}

describe('Easemotion — fade.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('fade.css'); });

  it('should define fade-in and fade-out classes', () => {
    expect(css).toContain('.ease-fade-in');
    expect(css).toContain('.ease-fade-out');
  });

  it('should define a fade icon exit animation', () => {
    expect(css).toContain('.ease-fade-icon-exit');
  });

  it('should define @keyframes for fade animations', () => {
    expect(css).toMatch(/@keyframes\s+\S*[Ff]ade/);
  });
});

describe('Easemotion — slide.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('slide.css'); });

  it('should define directional slide-in classes', () => {
    expect(css).toContain('.ease-slide-up');
    expect(css).toContain('.ease-slide-down');
    expect(css).toContain('.ease-slide-in-left');
    expect(css).toContain('.ease-slide-in-right');
  });

  it('should define from-corner slide-in classes', () => {
    expect(css).toContain('.ease-slide-in-from-top-left');
    expect(css).toContain('.ease-slide-in-from-top-right');
    expect(css).toContain('.ease-slide-in-from-bottom-left');
    expect(css).toContain('.ease-slide-in-from-bottom-right');
  });

  it('should define from-edge slide-in classes', () => {
    expect(css).toContain('.ease-slide-in-from-top');
    expect(css).toContain('.ease-slide-in-from-bottom');
    expect(css).toContain('.ease-slide-in-from-left');
    expect(css).toContain('.ease-slide-in-from-right');
  });

  it('should define a slide image exit animation', () => {
    expect(css).toContain('.ease-slide-image-exit');
  });
});

describe('Easemotion — zoom.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('zoom.css'); });

  it('should define zoom-in and zoom-out classes', () => {
    expect(css).toContain('.ease-zoom-in');
    expect(css).toContain('.ease-zoom-out');
  });

  it('should define a contract image entrance animation', () => {
    expect(css).toContain('.ease-contract-image-entrance');
  });

  it('should define @keyframes for zoom animations', () => {
    expect(css).toMatch(/@keyframes\s+\S*[Zz]oom/);
  });
});

describe('Easemotion — bounce.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('bounce.css'); });

  it('should define bounce animation classes', () => {
    expect(css).toContain('.ease-bounce');
    expect(css).toContain('.ease-bounce-in');
  });

  it('should define a bounce button exit animation', () => {
    expect(css).toContain('.ease-bounce-button-exit');
  });

  it('should define @keyframes for bounce animations', () => {
    expect(css).toMatch(/@keyframes\s+\S*[Bb]ounce/);
  });

  it('should use --ease-animation-iterations for looping', () => {
    expect(css).toContain('--ease-animation-iterations');
  });
});

describe('Easemotion — rotate.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('rotate.css'); });

  it('should define rotate and flip classes', () => {
    expect(css).toContain('.ease-rotate');
    expect(css).toContain('.ease-flip');
  });

  it('should define a rotate image exit animation', () => {
    expect(css).toContain('.ease-rotate-image-exit');
  });

  it('should define @keyframes for rotate/flip animations', () => {
    expect(css).toMatch(/@keyframes\s+\S*[Rr]otate|@keyframes\s+\S*[Ff]lip/);
  });
});

describe('Easemotion — hover.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('hover.css'); });

  it('should define hover effect classes', () => {
    expect(css).toContain('.ease-hover-grow');
    expect(css).toContain('.ease-hover-lift');
    expect(css).toContain('.ease-hover-shrink');
    expect(css).toContain('.ease-hover-glow');
  });

  it('should define hover-lift-shadow for combined lift + shadow', () => {
    expect(css).toContain('.ease-hover-lift-shadow');
  });

  it('should define the underline hover effect', () => {
    expect(css).toContain('.ease-hover-underline');
  });

  it('should define the squish button hover', () => {
    expect(css).toContain('.ease-squish-button');
  });

  it('should use :hover pseudo-class for interactions', () => {
    expect(css).toContain(':hover');
  });
});

describe('Easemotion — misc.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('misc.css'); });

  it('should define looping utility classes', () => {
    expect(css).toContain('.ease-float');
    expect(css).toContain('.ease-pulse');
    expect(css).toContain('.ease-ping');
    expect(css).toContain('.ease-shake');
  });

  it('should define visual effect classes', () => {
    expect(css).toContain('.ease-blur-to-focus');
    expect(css).toContain('.ease-shimmer-sweep');
    expect(css).toContain('.ease-gradient-rotation');
    expect(css).toContain('.ease-skeleton-shimmer');
  });

  it('should define exit/emphasis animation classes', () => {
    expect(css).toContain('.ease-contract-bg-exit');
    expect(css).toContain('.ease-pulse-border-emphasis');
    expect(css).toContain('.ease-shake-card-exit');
    expect(css).toContain('.ease-expand-border-exit');
    expect(css).toContain('.ease-scale-text-exit');
    expect(css).toContain('.ease-glow-shadow-exit');
    expect(css).toContain('.ease-contract-shadow-emphasis');
  });

  it('should define @keyframes for misc animations', () => {
    expect(css).toMatch(/@keyframes/);
  });
});

describe('Easemotion — timing.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('timing.css'); });

  it('should define animation delay utility classes', () => {
    expect(css).toContain('.ease-delay-75');
    expect(css).toContain('.ease-delay-100');
    expect(css).toContain('.ease-delay-150');
    expect(css).toContain('.ease-delay-200');
    expect(css).toContain('.ease-delay-300');
    expect(css).toContain('.ease-delay-500');
    expect(css).toContain('.ease-delay-700');
  });

  it('should define animation duration utility classes', () => {
    expect(css).toContain('.ease-duration-fast');
    expect(css).toContain('.ease-duration-medium');
    expect(css).toContain('.ease-duration-slow');
  });

  it('should reference speed custom properties', () => {
    expect(css).toContain('--ease-speed-fast');
    expect(css).toContain('--ease-speed-medium');
    expect(css).toContain('--ease-speed-slow');
  });
});

describe('Easemotion — ease-marquee.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('ease-marquee.css'); });

  it('should define marquee container class', () => {
    expect(css).toMatch(/\.ease-marquee/);
  });

  it('should define @keyframes for marquee scrolling', () => {
    expect(css).toMatch(/@keyframes/);
  });
});

describe('Easemotion — variables.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('variables.css'); });

  it('should import core variables', () => {
    expect(css).toContain('@import');
    expect(css).toContain('core/variables.css');
  });
});

describe('Easemotion — all.css', () => {
  let css;
  beforeAll(() => { css = loadCSS('all.css'); });

  it('should import all animation modules', () => {
    expect(css).toContain('./fade.css');
    expect(css).toContain('./slide.css');
    expect(css).toContain('./zoom.css');
    expect(css).toContain('./rotate.css');
    expect(css).toContain('./bounce.css');
    expect(css).toContain('./hover.css');
    expect(css).toContain('./misc.css');
    expect(css).toContain('./timing.css');
  });

  it('should import core dependencies', () => {
    expect(css).toContain('./variables.css');
    expect(css).toContain('../core/base.css');
    expect(css).toContain('../core/animations.css');
    expect(css).toContain('../core/utilities.css');
  });

  it('should import component dependencies', () => {
    expect(css).toContain('../components/buttons.css');
    expect(css).toContain('../components/cards.css');
  });
});
