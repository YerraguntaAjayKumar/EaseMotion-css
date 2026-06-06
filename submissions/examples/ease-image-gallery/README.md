# ease-image-gallery — Responsive Image Gallery

## What does this do?

A responsive image gallery component with multiple layout options (grid, masonry), smooth hover zoom effects, and optional text overlays. Built with pure CSS using CSS Grid for layout and CSS transforms for animations.

## Variants

| Variant | Class | Description |
|---------|-------|-------------|
| Standard Grid | `.ease-image-gallery--grid` | Default 3-column grid layout |
| Masonry | `.ease-image-gallery--masonry` | Variable height masonry layout |
| Compact | `.ease-image-gallery--compact` | Denser 4-column grid layout |
| No Overlay | `.ease-image-gallery--no-overlay` | Hover zoom without text overlay |
| Rounded | `.ease-image-gallery--rounded` | Softer rounded corners |

## How is it used?

Basic grid gallery:

```html
<div class="ease-image-gallery ease-image-gallery--grid">
  <div class="ease-image-gallery__item">
    <img src="image1.jpg" alt="Description">
    <div class="ease-image-gallery__overlay">
      <h3>Title</h3>
      <p>Description text</p>
    </div>
  </div>
  <div class="ease-image-gallery__item">
    <img src="image2.jpg" alt="Description">
    <div class="ease-image-gallery__overlay">
      <h3>Title</h3>
      <p>Description text</p>
    </div>
  </div>
</div>
```

Masonry layout (images with varying heights):

```html
<div class="ease-image-gallery ease-image-gallery--masonry">
  <div class="ease-image-gallery__item">
    <img src="tall-image.jpg" alt="Tall image">
    <div class="ease-image-gallery__overlay">
      <h3>Title</h3>
      <p>Description</p>
    </div>
  </div>
  <div class="ease-image-gallery__item">
    <img src="wide-image.jpg" alt="Wide image">
    <div class="ease-image-gallery__overlay">
      <h3>Title</h3>
      <p>Description</p>
    </div>
  </div>
</div>
```

Compact grid without overlay:

```html
<div class="ease-image-gallery ease-image-gallery--compact ease-image-gallery--no-overlay">
  <div class="ease-image-gallery__item">
    <img src="image1.jpg" alt="Description">
  </div>
  <div class="ease-image-gallery__item">
    <img src="image2.jpg" alt="Description">
  </div>
</div>
```

## Customization

Use CSS variables to customize the gallery:

```css
.ease-image-gallery {
  --ease-gallery-columns: 3;           /* Number of columns */
  --ease-gallery-gap: 16px;            /* Gap between items */
  --ease-gallery-zoom-scale: 1.1;       /* Hover zoom scale */
  --ease-gallery-zoom-duration: 0.4s;  /* Zoom animation duration */
  --ease-gallery-overlay-duration: 0.3s; /* Overlay fade duration */
  --ease-gallery-item-radius: 8px;     /* Item corner radius */
  --ease-gallery-aspect-ratio: auto;   /* Force aspect ratio */
}
```

## Features

- **Responsive Design**: Automatically adjusts columns based on screen size (3 → 2 → 1)
- **Hover Zoom**: Smooth scale transform on hover
- **Text Overlay**: Gradient overlay with title and description
- **Masonry Support**: Natural layout for images of varying heights
- **Dark Mode**: Automatic dark mode support via `prefers-color-scheme`
- **Reduced Motion**: Respects user's motion preferences
- **Accessibility**: Keyboard navigable with proper focus states
- **Pure CSS**: No JavaScript required for core functionality

## Responsive Breakpoints

- Desktop (>1024px): 3 columns (4 for compact)
- Tablet (640px-1024px): 2 columns (3 for compact)
- Mobile (<640px): 1 column (2 for compact)
- Small Mobile (<480px): 1 column

## Why is it useful?

Image galleries are essential for portfolios, product showcases, and visual content. This component provides a flexible, animation-first solution that works across devices without requiring JavaScript frameworks. The masonry variant is particularly useful for images with different aspect ratios.

## Tech Stack

- HTML
- CSS (CSS Grid, transforms, transitions, custom properties)
- No JavaScript required

## Preview

Open `demo.html` directly in your browser to see all variants in action.

## Contribution Notes

- Class naming follows EaseMotion BEM convention (`ease-image-gallery__*`)
- Maintainer may adjust naming before merging
- Images sourced from picsum.photos (placeholders)
