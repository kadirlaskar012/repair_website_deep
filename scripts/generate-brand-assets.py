import os
import math
from PIL import Image, ImageDraw

def create_svgs():
    # 1. favicon.svg (optimized for crisp 1:1 tab rendering)
    favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F5143"/>
      <stop offset="50%" stop-color="#146C5B"/>
      <stop offset="100%" stop-color="#09382E"/>
    </linearGradient>
    <linearGradient id="glowBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="iceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#BAE6FD"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <filter id="subtleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Base Rounded Shield / Squircle -->
  <rect x="3" y="3" width="58" height="58" rx="16" fill="url(#shieldGrad)" stroke="url(#glowBorder)" stroke-width="1.8"/>

  <!-- Subtle Cooling Breeze / Frost Wave Arc -->
  <path d="M 12 36 C 18 24, 30 20, 46 22" fill="none" stroke="url(#iceGrad)" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <path d="M 16 42 C 22 34, 32 30, 48 31" fill="none" stroke="url(#iceGrad)" stroke-width="2" stroke-linecap="round" opacity="0.4"/>

  <!-- Precision Engineer's Repair Wrench (45 degree angle) -->
  <g transform="translate(30, 34) rotate(-45) translate(-30, -34)" filter="url(#subtleShadow)">
    <!-- Wrench Body -->
    <path d="M 28 16 
             C 23.5 16, 20 19.5, 20 24 
             C 20 26.8, 21.4 29.3, 23.5 30.7 
             L 27 50 
             C 27.5 51.5, 29 52, 30 52 
             C 31 52, 32.5 51.5, 33 50 
             L 36.5 30.7 
             C 38.6 29.3, 40 26.8, 40 24 
             C 40 19.5, 36.5 16, 32 16
             Z" 
          fill="#FFFFFF"/>
    <!-- Wrench Open Jaws Notch -->
    <path d="M 27 15 L 30 21 L 33 15 Z" fill="url(#shieldGrad)"/>
    <circle cx="30" cy="24" r="3.2" fill="url(#shieldGrad)"/>
    <!-- Bottom Handle Ring Hole -->
    <circle cx="30" cy="46" r="2" fill="url(#shieldGrad)"/>
  </g>

  <!-- Golden 4-Point Energy Spark / 5-Star Certified Accent -->
  <g transform="translate(47, 15) scale(0.9)">
    <path d="M 0 -8 Q 0 0 8 0 Q 0 0 0 8 Q 0 0 -8 0 Q 0 0 0 -8 Z" fill="url(#goldGrad)" filter="url(#subtleShadow)"/>
    <circle cx="0" cy="0" r="1.5" fill="#FFFFFF"/>
  </g>
</svg>'''

    with open('public/favicon.svg', 'w', encoding='utf-8') as f:
        f.write(favicon_svg)
    with open('public/logo-icon.svg', 'w', encoding='utf-8') as f:
        f.write(favicon_svg)
    print("Created public/favicon.svg and public/logo-icon.svg")

    # 2. logo.svg (Full horizontal brand logo for web headers and marketing)
    full_logo_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 64" width="320" height="64">
  <defs>
    <linearGradient id="shieldGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F5143"/>
      <stop offset="50%" stop-color="#146C5B"/>
      <stop offset="100%" stop-color="#09382E"/>
    </linearGradient>
    <linearGradient id="glowBorderFull" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="goldGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="iceGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#BAE6FD"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <filter id="subtleShadowFull" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Left Emblem (52x52) -->
  <g transform="translate(6, 6)">
    <rect x="0" y="0" width="52" height="52" rx="14" fill="url(#shieldGradFull)" stroke="url(#glowBorderFull)" stroke-width="1.6"/>
    <path d="M 8 30 C 14 18, 24 16, 38 18" fill="none" stroke="url(#iceGradFull)" stroke-width="2.6" stroke-linecap="round" opacity="0.6"/>
    <path d="M 12 36 C 18 28, 26 24, 40 25" fill="none" stroke="url(#iceGradFull)" stroke-width="1.8" stroke-linecap="round" opacity="0.4"/>
    
    <!-- Precision Wrench -->
    <g transform="translate(25, 27) rotate(-45) translate(-25, -27)" filter="url(#subtleShadowFull)">
      <path d="M 23 11 C 19 11, 16 14, 16 18 C 16 20.5, 17.2 22.8, 19 24 L 22 41 C 22.5 42, 23.8 43, 25 43 C 26.2 43, 27.5 42, 28 41 L 31 24 C 32.8 22.8, 34 20.5, 34 18 C 34 14, 31 11, 27 11 Z" fill="#FFFFFF"/>
      <path d="M 22 10 L 25 15 L 28 10 Z" fill="url(#shieldGradFull)"/>
      <circle cx="25" cy="18" r="2.8" fill="url(#shieldGradFull)"/>
      <circle cx="25" cy="37" r="1.8" fill="url(#shieldGradFull)"/>
    </g>

    <!-- Spark -->
    <g transform="translate(40, 11) scale(0.75)">
      <path d="M 0 -7 Q 0 0 7 0 Q 0 0 0 7 Q 0 0 -7 0 Q 0 0 0 -7 Z" fill="url(#goldGradFull)"/>
      <circle cx="0" cy="0" r="1.2" fill="#FFFFFF"/>
    </g>
  </g>

  <!-- Typography: AC REPAIR SERVICE -->
  <text x="70" y="32" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" letter-spacing="-0.02em" fill="#0F2620">AC REPAIR <tspan fill="#146C5B">SERVICE</tspan></text>

  <!-- Verified Trust Badge Pill & SEO Tagline -->
  <rect x="70" y="39" width="16" height="16" rx="8" fill="#10B981" fill-opacity="0.15"/>
  <path d="M 74 47 L 77 50 L 82 44" fill="none" stroke="#059669" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  
  <text x="91" y="51" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" letter-spacing="0.04em" fill="#4B635D">DOORSTEP CARE <tspan fill="#E8A33D">•</tspan> WEST BENGAL</text>
</svg>'''

    with open('public/logo.svg', 'w', encoding='utf-8') as f:
        f.write(full_logo_svg)
    print("Created public/logo.svg")

def render_pillow_icons():
    # Render high-res 512x512 master icon, then downscale smoothly with Lanczos for icons & favicon.ico
    size = 512
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Base Squircle / Rounded Rectangle
    pad = 24
    corner_radius = 128
    
    # Draw gradient background by concentric/vertical interpolation
    for y in range(pad, size - pad):
        factor = (y - pad) / float(size - 2 * pad)
        # Gradient from #0F5143 (15, 81, 67) to #09382E (9, 56, 46)
        r = int(15 * (1 - factor) + 9 * factor)
        g = int(81 * (1 - factor) + 56 * factor)
        b = int(67 * (1 - factor) + 46 * factor)
        draw.line([(pad, y), (size - pad, y)], fill=(r, g, b, 255))

    # Mask with rounded rectangle
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([pad, pad, size - pad, size - pad], radius=corner_radius, fill=255)
    
    # Apply mask
    final_bg = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    final_bg.paste(img, (0, 0), mask)
    draw = ImageDraw.Draw(final_bg)

    # Glowing border
    draw.rounded_rectangle([pad, pad, size - pad, size - pad], radius=corner_radius, outline=(52, 211, 153, 200), width=12)

    # Cooling arcs (cyan #38BDF8)
    draw.arc([pad + 50, pad + 120, size - pad - 60, size - pad], start=180, end=330, fill=(56, 189, 248, 160), width=18)
    draw.arc([pad + 80, pad + 170, size - pad - 80, size - pad + 30], start=185, end=320, fill=(56, 189, 248, 110), width=12)

    # Draw precision wrench angled at 45 deg
    wrench_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    w_draw = ImageDraw.Draw(wrench_layer)
    cx, cy = size // 2, size // 2

    # Draw vertical wrench centered at (cx, cy)
    # Head circle
    w_draw.ellipse([cx - 70, cy - 160, cx + 70, cy - 20], fill=(255, 255, 255, 255))
    # Cutout jaw
    w_draw.polygon([(cx - 24, cy - 165), (cx + 24, cy - 165), (cx, cy - 95)], fill=(15, 81, 67, 255))
    w_draw.ellipse([cx - 18, cy - 105, cx + 18, cy - 70], fill=(15, 81, 67, 255))
    
    # Handle
    w_draw.rounded_rectangle([cx - 26, cy - 50, cx + 26, cy + 150], radius=16, fill=(255, 255, 255, 255))
    w_draw.ellipse([cx - 40, cy + 120, cx + 40, cy + 175], fill=(255, 255, 255, 255))
    w_draw.ellipse([cx - 15, cy + 135, cx + 15, cy + 165], fill=(15, 81, 67, 255))

    # Rotate wrench by 45 degrees
    rotated_wrench = wrench_layer.rotate(45, resample=Image.Resampling.BICUBIC, center=(cx, cy))
    final_bg = Image.alpha_composite(final_bg, rotated_wrench)

    # Golden Spark (Top Right)
    spark_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(spark_layer)
    sx, sy = int(size * 0.76), int(size * 0.22)
    s_rad = 48
    s_points = [
        (sx, sy - s_rad),
        (sx + 14, sy - 14),
        (sx + s_rad, sy),
        (sx + 14, sy + 14),
        (sx, sy + s_rad),
        (sx - 14, sy + 14),
        (sx - s_rad, sy),
        (sx - 14, sy - 14),
    ]
    s_draw.polygon(s_points, fill=(245, 158, 11, 255))
    s_draw.ellipse([sx - 10, sy - 10, sx + 10, sy + 10], fill=(255, 255, 255, 255))
    final_bg = Image.alpha_composite(final_bg, spark_layer)

    # Save exports
    os.makedirs('public', exist_ok=True)
    os.makedirs('src/app', exist_ok=True)

    # 1. icon-512.png
    final_bg.save('public/icon-512.png', 'PNG')
    print("Saved public/icon-512.png")

    # 2. icon-192.png
    icon_192 = final_bg.resize((192, 192), Image.Resampling.LANCZOS)
    icon_192.save('public/icon-192.png', 'PNG')
    print("Saved public/icon-192.png")

    # 3. apple-touch-icon.png (180x180)
    icon_180 = final_bg.resize((180, 180), Image.Resampling.LANCZOS)
    icon_180.save('public/apple-touch-icon.png', 'PNG')
    icon_180.save('src/app/apple-icon.png', 'PNG')
    print("Saved apple-touch-icon.png")

    # 4. favicon.png (32x32)
    icon_32 = final_bg.resize((32, 32), Image.Resampling.LANCZOS)
    icon_32.save('public/favicon.png', 'PNG')
    icon_32.save('src/app/icon.png', 'PNG')
    print("Saved favicon.png and src/app/icon.png")

    # 5. favicon.ico (multi-layer 16, 32, 48)
    icon_16 = final_bg.resize((16, 16), Image.Resampling.LANCZOS)
    icon_48 = final_bg.resize((48, 48), Image.Resampling.LANCZOS)
    
    icon_32.save(
        'public/favicon.ico', 
        format='ICO', 
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icon_16, icon_48]
    )
    icon_32.save(
        'src/app/favicon.ico', 
        format='ICO', 
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icon_16, icon_48]
    )
    print("Saved public/favicon.ico and src/app/favicon.ico")

if __name__ == '__main__':
    create_svgs()
    render_pillow_icons()
