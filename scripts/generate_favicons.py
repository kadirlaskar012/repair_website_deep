import os
import base64
from PIL import Image

def generate_favicons():
    source_path = 'public/logo-icon.png'
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found")
        return

    # Open source image in RGBA
    img = Image.open(source_path).convert('RGBA')
    print(f"Opened {source_path}, size: {img.size}, mode: {img.mode}")

    # Target destinations
    targets = [
        ('src/app/icon.png', (48, 48)),
        ('src/app/apple-icon.png', (180, 180)),
        ('public/favicon.png', (32, 32)),
        ('public/favicon-48.png', (48, 48)),
        ('public/apple-touch-icon.png', (180, 180)),
        ('public/icon-192.png', (192, 192)),
        ('public/icon-512.png', (512, 512)),
    ]

    for dest, size in targets:
        resized = img.resize(size, Image.Resampling.LANCZOS)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        resized.save(dest, format='PNG')
        print(f"Generated {dest} ({size[0]}x{size[1]})")

    # Generate multi-size .ico files for src/app/favicon.ico and public/favicon.ico
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    ico_images = [img.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]

    for ico_dest in ['src/app/favicon.ico', 'public/favicon.ico']:
        ico_images[0].save(
            ico_dest,
            format='ICO',
            sizes=ico_sizes,
            append_images=ico_images[1:]
        )
        print(f"Generated {ico_dest} (multi-size 16, 32, 48, 64)")

    # Generate transparent SVG favicon embedding the high-res PNG
    with open('public/icon-192.png', 'rb') as f:
        png_b64 = base64.b64encode(f.read()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="100%" height="100%">
  <image href="data:image/png;base64,{png_b64}" width="192" height="192" />
</svg>'''
    with open('public/favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print("Generated public/favicon.svg (embedded transparent logo)")

if __name__ == '__main__':
    generate_favicons()
