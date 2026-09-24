import os

os.makedirs('public/images/brands', exist_ok=True)

brands_svg = {
    # 1. SAMSUNG (Official Blue #1428A0 with iconic oval & sharp typography)
    'samsung.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <defs>
    <linearGradient id="samsungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1428A0"/>
      <stop offset="100%" stop-color="#0B1B7D"/>
    </linearGradient>
  </defs>
  <!-- Slanted Blue Oval Characteristic of Samsung -->
  <ellipse cx="80" cy="25" rx="74" ry="21" transform="rotate(-8 80 25)" fill="url(#samsungGrad)"/>
  <!-- Samsung Wordmark in Crisp White -->
  <text x="80" y="32" font-family="'Helvetica Neue', 'Arial Black', Arial, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2px">SAMSUNG</text>
</svg>''',

    # 2. LG (Official Burgundy #A50034 with Smiley Emblem & Dark Grey LG)
    'lg.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <!-- LG Face Circle Emblem -->
  <g transform="translate(18, 5)">
    <circle cx="20" cy="20" r="19" fill="#A50034"/>
    <!-- Outer G arc -->
    <path d="M 20 8 A 12 12 0 1 0 32 20 L 23 20" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Inner L nose -->
    <path d="M 16 14 L 16 26 L 22 26" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Eye dot -->
    <circle cx="14" cy="18" r="2.2" fill="#FFFFFF"/>
  </g>
  <!-- LG Wordmark -->
  <text x="68" y="34" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="900" fill="#A50034" letter-spacing="1px">LG</text>
  <text x="110" y="24" font-family="'Helvetica Neue', Arial, sans-serif" font-size="9" font-weight="700" fill="#6B7280" letter-spacing="0.5px">Life's</text>
  <text x="110" y="35" font-family="'Helvetica Neue', Arial, sans-serif" font-size="9" font-weight="700" fill="#6B7280" letter-spacing="0.5px">Good</text>
</svg>''',

    # 3. WHIRLPOOL (Official Deep Navy #003B71 and Golden Yellow Swirl #EDB900)
    'whirlpool.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <!-- Golden Swirl Orbit -->
  <ellipse cx="65" cy="22" rx="55" ry="14" fill="none" stroke="#EDB900" stroke-width="3.2" transform="rotate(-12 65 22)"/>
  <!-- Dark Navy Wordmark -->
  <text x="80" y="32" font-family="'Trebuchet MS', 'Arial Black', sans-serif" font-size="22" font-weight="900" fill="#003B71" text-anchor="middle" letter-spacing="-0.5px">Whirlpool</text>
</svg>''',

    # 4. VOLTAS (Tata Blue #0054A6 with Red Diamond / Accent)
    'voltas.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <g transform="translate(10, 4)">
    <!-- Red Chevron Accent -->
    <path d="M 6 12 L 18 12 L 12 24 Z" fill="#ED1C24"/>
    <!-- Voltas Bold Wordmark -->
    <text x="24" y="26" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="900" fill="#0054A6" letter-spacing="1px">VOLTAS</text>
    <!-- TATA Enterprise Subtext -->
    <text x="26" y="38" font-family="'Helvetica Neue', Arial, sans-serif" font-size="8.5" font-weight="700" fill="#5B6770" letter-spacing="1.5px">A TATA ENTERPRISE</text>
  </g>
</svg>''',

    # 5. GODREJ (Signature Cursive Script in Vibrant Ruby Red #BF0D3E)
    'godrej.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <!-- Cursive Styled Wordmark -->
  <text x="80" y="33" font-family="'Brush Script MT', 'Lucida Calligraphy', 'Segoe Script', cursive, sans-serif" font-size="34" font-weight="bold" fill="#BF0D3E" text-anchor="middle">Godrej</text>
</svg>''',

    # 6. HAIER (Official Cyan Blue #005A9C with Red Accent & Bold Typo)
    'haier.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <!-- Haier Wordmark -->
  <text x="80" y="33" font-family="'Arial Black', 'Helvetica Neue', sans-serif" font-size="26" font-weight="900" fill="#005A9C" text-anchor="middle" letter-spacing="-0.5px">Haier</text>
  <!-- Red Brand Dot on 'i' -->
  <circle cx="86" cy="16" r="3.2" fill="#E60012"/>
</svg>''',

    # 7. PANASONIC (Official Deep Royal Blue #004098)
    'panasonic.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <text x="80" y="32" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="900" fill="#004098" text-anchor="middle" letter-spacing="0.5px">Panasonic</text>
</svg>''',

    # 8. DAIKIN (Sky Blue #009FE3 Parallelogram with Sharp Bold DAIKIN)
    'daikin.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <g transform="translate(8, 7)">
    <!-- Daikin Dynamic Triangle Slash in Sky Blue -->
    <path d="M 4 28 L 22 8 L 28 8 L 10 28 Z" fill="#009FE3"/>
    <path d="M 16 28 L 30 14 L 34 14 L 20 28 Z" fill="#ED1C24"/>
    <!-- DAIKIN Wordmark -->
    <text x="38" y="25" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-size="21" font-weight="900" fill="#009FE3" letter-spacing="1px">DAIKIN</text>
  </g>
</svg>''',

    # 9. SONY (Classic High-Contrast Bold Serif Wordmark #111111)
    'sony.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <text x="80" y="33" font-family="'Times New Roman', Times, 'Georgia', serif" font-size="30" font-weight="900" fill="#111111" text-anchor="middle" letter-spacing="4px">SONY</text>
</svg>''',

    # 10. IFB (Corporate Red #E31E24 with Navy Blue Badge & Bold IFB)
    'ifb.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <g transform="translate(18, 6)">
    <!-- Red Emblem Box -->
    <rect x="0" y="4" width="30" height="30" rx="6" fill="#E31E24"/>
    <circle cx="15" cy="19" r="7" fill="#FFFFFF"/>
    <circle cx="15" cy="19" r="3.5" fill="#E31E24"/>
    <!-- Bold IFB text -->
    <text x="38" y="28" font-family="'Arial Black', Arial, sans-serif" font-size="26" font-weight="900" fill="#E31E24" letter-spacing="2px">IFB</text>
    <text x="96" y="28" font-family="'Helvetica Neue', Arial, sans-serif" font-size="9" font-weight="800" fill="#1B365D" letter-spacing="1px">APPLIANCES</text>
  </g>
</svg>''',

    # 11. BOSCH (Official Bosch Red #EA1C24 Armature Magneto & Typo)
    'bosch.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <g transform="translate(10, 6)">
    <!-- Bosch Armature Circle Icon -->
    <g transform="translate(4, 5)">
      <circle cx="14" cy="14" r="13" fill="none" stroke="#EA1C24" stroke-width="2.8"/>
      <rect x="7" y="12" width="14" height="4" fill="#EA1C24"/>
      <rect x="12" y="7" width="4" height="14" fill="#EA1C24"/>
    </g>
    <!-- BOSCH Bold Red Typo -->
    <text x="44" y="27" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="900" fill="#EA1C24" letter-spacing="2px">BOSCH</text>
  </g>
</svg>''',

    # 12. BLUE STAR (Official Royal Blue #005CA9 with Star Symbol)
    'blue-star.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <g transform="translate(6, 6)">
    <!-- Star Emblem in Blue & Cyan -->
    <g transform="translate(16, 18) scale(1.1)">
      <!-- 5-Point Star -->
      <polygon points="0,-12 3.5,-3.5 12,-3.5 5,2 7.5,10.5 0,5.5 -7.5,10.5 -5,2 -12,-3.5 -3.5,-3.5" fill="#005CA9"/>
      <polygon points="0,-12 3.5,-3.5 5,2 0,5.5" fill="#0082CA"/>
    </g>
    <!-- BLUE STAR Wordmark -->
    <text x="36" y="21" font-family="'Arial Black', Arial, sans-serif" font-size="14.5" font-weight="900" fill="#005CA9" letter-spacing="1px">BLUE STAR</text>
    <text x="36" y="32" font-family="'Helvetica Neue', Arial, sans-serif" font-size="7.5" font-weight="800" fill="#0082CA" letter-spacing="1.5px">AIR CONDITIONING</text>
  </g>
</svg>'''
}

for filename, content in brands_svg.items():
    path = os.path.join('public/images/brands', filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"Generated {path}")

print("All 12 authentic colored brand logos generated!")
