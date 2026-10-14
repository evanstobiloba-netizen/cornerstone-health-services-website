#!/usr/bin/env python3
"""
Generates the static social-sharing and app icons used by the site.

Outputs (committed to the repo — this script documents how they were made):

  public/og-image.png        1200x630  Open Graph / Twitter Card preview
  public/apple-touch-icon.png 180x180  iOS home-screen icon
  public/icon-192.png          192x192 Android / PWA
  public/icon-512.png          512x512 Android / PWA

Why this exists: the brand lockups are landscape (434x122), so they are
illegible when scaled to a 1200x630 card. The OG image therefore composites the
inverse logo with the practice's real script accent and real service names,
drawn in the actual brand fonts.

Requirements: Pillow, plus the Jost and Allison TTFs (both OFL, downloaded
automatically by the command in README.md).

Usage:
  python3 scripts/generate-social-images.py \
      --jost /path/to/Jost.ttf --allison /path/to/Allison-Regular.ttf
"""
from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

# --------------------------------------------------------------- brand tokens
# Taken from the live site's stylesheet and the logo artwork.
NAVY = (14, 15, 59)
NAVY_LIGHT = (26, 30, 88)
CYAN = (39, 212, 237)
BLUE = (20, 165, 235)
WHITE = (255, 255, 255)
MUTED = (170, 178, 204)

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public"

W, H = 1200, 630
PAD = 84


def load_font(path: Path, size: int, weight: int | None = None) -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(str(path), size)
    if weight is not None:
        # Jost ships as a variable font; pick the instance we want.
        font.set_variation_by_axes([weight])
    return font


def vertical_gradient(size: tuple[int, int], top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    """A true vertical gradient, built from a single-column image."""
    w, h = size
    column = Image.new("RGB", (1, h))
    for y in range(h):
        t = y / max(h - 1, 1)
        column.putpixel(
            (0, y),
            tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3)),
        )
    return column.resize((w, h), Image.BILINEAR).convert("RGBA")


def soft_glow(canvas: Image.Image, box, colour, blur: int) -> None:
    """Composite a blurred ellipse onto the canvas in place."""
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse(box, fill=colour)
    canvas.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))


def build_og_image(jost: Path, allison: Path) -> Image.Image:
    img = vertical_gradient((W, H), NAVY_LIGHT, NAVY)

    # Brand-coloured ambience: cyan top-right, blue bottom-left. Kept subtle —
    # these are atmosphere, not features.
    soft_glow(img, (W - 560, -360, W + 260, 460), (*CYAN, 54), 160)
    soft_glow(img, (-320, H - 340, 460, H + 240), (*BLUE, 46), 160)

    draw = ImageDraw.Draw(img)

    # Faithful to the live site's `linear-gradient(180deg, cyan, blue)`.
    bar = vertical_gradient((13, H), CYAN, BLUE)
    img.alpha_composite(bar, (0, 0))

    # --- logo (inverse lockup: white + cyan for dark backgrounds) ---
    logo = Image.open(OUT / "brand" / "logo-inverse.png").convert("RGBA")
    logo_w = 360
    logo = logo.resize((logo_w, round(logo.height * logo_w / logo.width)), Image.LANCZOS)
    img.alpha_composite(logo, (PAD, 66))

    # --- signature script line (the live site's hero treatment) ---
    script = load_font(allison, 66)
    draw.text((PAD - 4, 268), "A Warm Welcome To", font=script, fill=CYAN, anchor="ls")

    # --- headline ---
    head = load_font(jost, 50, weight=600)
    draw.text((PAD, 342), "Compassionate psychiatric care", font=head, fill=WHITE, anchor="ls")
    draw.text((PAD, 400), "in Quincy, Massachusetts", font=head, fill=WHITE, anchor="ls")

    # --- real service names ---
    body = load_font(jost, 24, weight=400)
    draw.text(
        (PAD, 462),
        "Diagnosis  \u00b7  Medication management  \u00b7  Treatment management  \u00b7  Psychotherapy",
        font=body,
        fill=MUTED,
        anchor="ls",
    )

    # --- footer rule + contact ---
    # ImageDraw does not blend semi-transparent fills — it writes the raw RGBA
    # value, which `convert("RGB")` then turns opaque. Draw the hairline on its
    # own layer and composite it so the alpha is honoured.
    rule = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(rule).line([(PAD, 516), (W - PAD, 516)], fill=(255, 255, 255, 46), width=1)
    img.alpha_composite(rule)

    contact = load_font(jost, 27, weight=500)
    draw.text((PAD, 562), "351-231-2513", font=contact, fill=CYAN, anchor="ls")

    domain = load_font(jost, 27, weight=400)
    draw.text(
        (W - PAD, 562),
        "cornerstonehealthinc.com",
        font=domain,
        fill=(226, 231, 244),
        anchor="rs",
    )

    return img.convert("RGB")


def build_icon(size: int) -> Image.Image:
    """
    The favicon's 'cornerstone' motif: three stacked chevrons, cyan over blue
    over white, on the brand navy. Drawn from the same 32-unit geometry as
    public/favicon.svg.
    """
    img = Image.new("RGBA", (size, size), (*NAVY, 255))
    soft_glow(img, (-size * 0.3, -size * 0.3, size * 0.9, size * 0.9), (*CYAN, 46), int(size * 0.28))

    draw = ImageDraw.Draw(img)

    # 32-unit source space, scaled and centred.
    scale = size / 32 * 0.88
    ox = size / 2 - 16 * scale
    oy = size / 2 - 16.45 * scale

    def pt(x: float, y: float) -> tuple[float, float]:
        return (ox + x * scale, oy + y * scale)

    chevron = [(16, 5), (26, 10.7), (26, 13.9), (16, 8.2), (6, 13.9), (6, 10.7)]
    for index, colour in enumerate((CYAN, BLUE, WHITE)):
        offset = index * 7
        draw.polygon([pt(x, y + offset) for x, y in chevron], fill=(*colour, 255))

    return img


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--jost", required=True, type=Path, help="Jost variable TTF")
    parser.add_argument("--allison", required=True, type=Path, help="Allison-Regular.ttf")
    args = parser.parse_args()

    og = build_og_image(args.jost, args.allison)
    og.save(OUT / "og-image.png", "PNG", optimize=True)
    print(f"og-image.png          {og.size[0]}x{og.size[1]}")

    for size, name in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        icon = build_icon(size)
        icon.save(OUT / name, "PNG", optimize=True)
        print(f"{name:22}{size}x{size}")


if __name__ == "__main__":
    main()
