import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const scriptsDir = resolve(__dirname, '../scripts');

function loadScript(filename) {
  return readFileSync(resolve(scriptsDir, filename), 'utf8');
}

describe('scripts/build-minified-css.mjs — removeCSSComments', () => {
  let removeCSSComments;

  it('should be importable as a pure function by extracting from source', async () => {
    const src = loadScript('build-minified-css.mjs');
    expect(src).toContain('function removeCSSComments');
    expect(src).toContain('function minifyCss');
  });

  it('removeCSSComments should strip block comments', async () => {
    const { removeCSSComments } = await loadBuildHelpers();
    expect(removeCSSComments('a { color: red; /* comment */ }')).toBe(
      'a { color: red;  }',
    );
  });

  it('removeCSSComments should preserve strings containing comment-like tokens', async () => {
    const { removeCSSComments } = await loadBuildHelpers();
    const input = 'content: "/* not a comment */";';
    expect(removeCSSComments(input)).toBe(input);
  });

  it('removeCSSComments should handle empty input', async () => {
    const { removeCSSComments } = await loadBuildHelpers();
    expect(removeCSSComments('')).toBe('');
  });

  it('removeCSSComments should handle nested-looking comment openers', async () => {
    const { removeCSSComments } = await loadBuildHelpers();
    expect(removeCSSComments('a { /* a /* b */ color: red; }')).toBe(
      'a {  color: red; }',
    );
  });
});

describe('scripts/build-minified-css.mjs — minifyCss', () => {
  it('should collapse whitespace and remove trailing semicolons before }', async () => {
    const { minifyCss } = await loadBuildHelpers();
    const input = 'a {\n  color: red;\n  font-size: 16px;\n}';
    const result = minifyCss(input);
    expect(result).not.toContain('\n');
    expect(result).toContain('color:red');
    expect(result).not.toMatch(/;\}/);
  });

  it('should strip CSS comments during minification', async () => {
    const { minifyCss } = await loadBuildHelpers();
    const input = '/* comment */\na { color: red; }';
    const result = minifyCss(input);
    expect(result).not.toContain('comment');
    expect(result).toContain('color:red');
  });

  it('should handle empty input', async () => {
    const { minifyCss } = await loadBuildHelpers();
    expect(minifyCss('')).toBe('');
  });

  it('should collapse multiple whitespace characters', async () => {
    const { minifyCss } = await loadBuildHelpers();
    const result = minifyCss('a  {   color:   red   }');
    expect(result).toBe('a{color:red}');
  });
});

describe('scripts/check-duplicates.mjs — source analysis', () => {
  let src;
  beforeAll(() => { src = loadScript('check-duplicates.mjs'); });

  it('should scan "core" and "components" directories', () => {
    expect(src).toContain('"core"');
    expect(src).toContain('"components"');
  });

  it('should define patterns for class and keyframe detection', () => {
    expect(src).toContain('classPattern');
    expect(src).toContain('keyframePattern');
  });

  it('should read a baseline file for allowed duplicates', () => {
    expect(src).toContain('duplicate-baseline.json');
  });
});

describe('scripts/validate-package.mjs — source analysis', () => {
  let src;
  beforeAll(() => { src = loadScript('validate-package.mjs'); });

  it('should verify the package name is easemotion-css', () => {
    expect(src).toContain('"easemotion-css"');
  });

  it('should check for required scripts', () => {
    expect(src).toContain('"build"');
    expect(src).toContain('"test"');
    expect(src).toContain('"lint:duplicates"');
    expect(src).toContain('"validate:manifest"');
    expect(src).toContain('"validate:bundle"');
    expect(src).toContain('"validate:pack"');
    expect(src).toContain('"release:check"');
  });

  it('should check for required package files', () => {
    expect(src).toContain('"easemotion.css"');
    expect(src).toContain('"easemotion.min.css"');
    expect(src).toContain('"core/"');
    expect(src).toContain('"components/"');
  });

  it('should verify test script is not a placeholder', () => {
    expect(src).toContain('No tests yet');
  });
});

describe('scripts/validate-pack.mjs — source analysis', () => {
  let src;
  beforeAll(() => { src = loadScript('validate-pack.mjs'); });

  it('should verify required files are present in npm pack output', () => {
    expect(src).toContain('"package.json"');
    expect(src).toContain('"easemotion.css"');
    expect(src).toContain('"easemotion.min.css"');
    expect(src).toContain('"core/variables.css"');
    expect(src).toContain('"core/base.css"');
    expect(src).toContain('"core/animations.css"');
    expect(src).toContain('"core/utilities.css"');
  });

  it('should verify all component CSS files are included', () => {
    expect(src).toContain('"components/buttons.css"');
    expect(src).toContain('"components/cards.css"');
    expect(src).toContain('"components/chip.css"');
    expect(src).toContain('"components/footer.css"');
    expect(src).toContain('"components/masonry.css"');
    expect(src).toContain('"components/navbar.css"');
    expect(src).toContain('"components/scroll-progress.css"');
    expect(src).toContain('"components/sidebar.css"');
  });

  it('should check for unexpected files in the pack', () => {
    expect(src).toContain('unexpected');
  });
});

describe('scripts/validate-bundle.mjs — source analysis', () => {
  let src;
  beforeAll(() => { src = loadScript('validate-bundle.mjs'); });

  it('should reference the minified bundle path', () => {
    expect(src).toContain('easemotion.min.css');
  });

  it('should detect CI via GITHUB_ACTIONS', () => {
    expect(src).toContain('GITHUB_ACTIONS');
  });

  it('should skip validation when no bundle-affecting files changed', () => {
    expect(src).toContain('Skipping bundle validation');
  });

  it('should error when the bundle is stale', () => {
    expect(src).toContain('is stale');
    expect(src).toContain('npm run build');
  });
});

// ── Helper: extract pure functions from the build script ────────
async function loadBuildHelpers() {
  const src = loadScript('build-minified-css.mjs');

  const commentFnMatch = src.match(
    /function removeCSSComments\(source\)\s*\{/,
  );
  if (!commentFnMatch) throw new Error('Cannot locate removeCSSComments');

  // Extract function bodies manually for isolated testing
  const removeCSSComments = new Function(
    'source',
    extractFunctionBody(src, 'removeCSSComments'),
  );

  const minifyCss = (css) => {
    return removeCSSComments(css)
      .replace(/\r\n/g, '\n')
      .replace(/\n+/g, '\n')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>])\s*/g, '$1')
      .replace(/;}/g, '}')
      .replace(/\)\s+\{/g, '){')
      .trim();
  };

  return { removeCSSComments, minifyCss };
}

function extractFunctionBody(src, fnName) {
  const startIdx = src.indexOf(`function ${fnName}(`);
  if (startIdx === -1) throw new Error(`Function ${fnName} not found`);

  let braceCount = 0;
  let bodyStart = -1;
  let bodyEnd = -1;

  for (let i = startIdx; i < src.length; i++) {
    if (src[i] === '{') {
      if (bodyStart === -1) bodyStart = i + 1;
      braceCount++;
    } else if (src[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        bodyEnd = i;
        break;
      }
    }
  }

  if (bodyStart === -1 || bodyEnd === -1)
    throw new Error(`Cannot extract body of ${fnName}`);

  return src.slice(bodyStart, bodyEnd);
}
