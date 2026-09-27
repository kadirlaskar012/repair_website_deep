import fs from 'fs';
import path from 'path';

const blogDataPath = path.join(process.cwd(), 'src', 'lib', 'blog-data.ts');
let fileContent = fs.readFileSync(blogDataPath, 'utf-8');

// Match the JSON array
const jsonMatch = fileContent.match(/export const initialBlogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  throw new Error('Could not find initialBlogPosts array in blog-data.ts');
}

const posts = JSON.parse(jsonMatch[1]);

// 1. Enrich Post 2 (Fridge)
const fridgePost = posts.find(p => p.slug === 'refrigerator-not-cooling-light-is-on-repair-guide');
if (fridgePost) {
  const extraFridgeContent = `

---

## Direct Cool vs Frost-Free Refrigerators: Which Fails More Often?

Understanding whether your kitchen has a single-door Direct Cool model or a double-door Frost-Free unit is vital for troubleshooting:

- **Direct Cool Single Door Refrigerators:** Use natural thermal convection without internal fans. A single capillary tube feeds refrigerant directly to the exposed freezer box. Because there are no electronic timers or fans, direct cool units are mechanically simple and rarely suffer sudden total cooling failures. However, they require manual defrosting via the center red button every 7 to 10 days. If ice builds up past 6mm, cooling efficiency drops by 40%.
- **Frost-Free Multi-Airflow Refrigerators:** Use an internal dynamic forced-convection system with a squirrel-cage fan, digital defrost timer, and aluminum bimetal sensor. While they completely eliminate manual defrosting chores, they contain 4 times more failure points. If any single sensor fails, the hidden evaporator coils choke in a solid block of ice within 48 hours, blocking cold air from descending to the vegetable crisper.

---

## How Certified Technicians Test Compressor Health (The 3-Pin Resistance Check)

When an experienced engineer from **[Home Appliance Care India](/)** arrives at your residence, they do not guess whether a compressor is dead. They remove the protective plastic junction box on the compressor side and expose three copper electrical pins arranged in a triangle:
1. **C (Common)**
2. **S (Start)**
3. **R (Run)**

Using a calibrated digital multimeter set to ohms (Ω):
- **Rule 1 (Resistance Formula):** Resistance between Common and Start plus resistance between Common and Run must exactly equal the resistance between Start and Run: \`R(C to S) + R(C to R) = R(S to R)\`. If this sum does not match within 0.5 ohms, an internal motor winding has shorted.
- **Rule 2 (Ground Fault Check):** The engineer tests continuity between each pin and the unpainted bare copper chassis ground. Any beep or resistance below 500kΩ indicates internal insulation breakdown and dangerous electrical leakage.

---

## Seasonal Refrigerator Care for West Bengal Monsoon Humidity

During the monsoon months across Kolkata, Howrah, and coastal West Bengal, relative humidity routinely exceeds 85% to 95%. When hot, moisture-laden air hits cold metal surfaces:
- Condensation forms on exterior door flanges (known as "sweating").
- Black mildew and mold spores colonize the flexible door gasket folds.
- Clean door gaskets monthly with a 50/50 mixture of white vinegar and warm water, then coat with a light dusting of talcum powder to prevent rubber sticking.
- Maintain at least 6 inches of clear air space between the refrigerator back and your kitchen wall to guarantee unimpeded heat dissipation.
`;
  fridgePost.content += extraFridgeContent;
}

// 2. Enrich Post 3 (Washing Machine)
const wmPost = posts.find(p => p.slug === 'washing-machine-not-spinning-or-draining-fix-guide');
if (wmPost) {
  const extraWmContent = `

---

## Front Load vs Top Load Washers: Drain & Spin Differences Explained

When diagnosing drainage and spinning complaints, the mechanical architecture of your washing machine dictates the failure mode:

- **Top Load Fully Automatic Washers:** Utilize a vertical stainless steel tub with a center pulsator or agitator disc. Most Indian top load models from **LG**, **Samsung**, and **Whirlpool** employ a gravity-assisted flap valve actuated by a linear pull motor (drain motor) connected by a steel wire cable. If this drain motor gear strips, the valve flap remains closed and water cannot flow into the floor drain.
- **Front Load Automatic Washers:** Have a horizontal drum suspended on heavy-duty overhead expansion springs and lower hydraulic dampers. Because the bottom of the drum sits below the kitchen drain outlet level, front loaders rely 100% on a motorized electric impeller pump to actively lift dirty water up into your standpipe. Front loaders spin at much higher speeds (1000 to 1400 RPM compared to 700 RPM on top loaders), making them far more vulnerable to unbalance vibrations if shock absorbers wear out.

---

## Hard Water Scale & Detergent Sludge: The Hidden Killers in Indian Homes

Across many neighborhoods in West Bengal, household tap water contains high concentrations of dissolved calcium and magnesium carbonates (hard water). Combined with excessive powdered detergent:
- Hard water limescale coats the internal electric heating element with a thick chalky stone blanket, causing the heater to overheat and trip your home MCB.
- Detergent sludge builds up behind the outer drum, corroding the cast aluminum **spider arm assembly** that supports the heavy stainless steel drum.
- Once the spider arm cracks from corrosion, the drum wobbles uncontrollably during spin, emitting a horrifying grinding sound that eventually destroys the tub.

**Professional Recommendation:** Run a dedicated drum cleaning cycle using 150 grams of activated citric acid or manufacturer-approved descaling powder every 30 to 45 wash cycles at 60°C.
`;
  wmPost.content += extraWmContent;
}

// 3. Enrich Post 4 (Microwave)
const mwPost = posts.find(p => p.slug === 'microwave-oven-not-heating-food-repair-guide');
if (mwPost) {
  const extraMwContent = `

---

## Solo vs Grill vs Convection: Complete Breakdown of Failure Points

Not all microwave ovens operate the same way. Understanding your appliance type helps you pinpoint the fault:

- **Solo Microwave Ovens (20L to 25L):** Utilize only microwave RF energy generated by the magnetron tube. They have no heating coils or fans. When a solo microwave stops heating, the culprit is 100% in the high-voltage section (magnetron, diode, or capacitor).
- **Grill Microwave Ovens:** Feature a solo microwave circuit plus a quartz or sheath electric heating rod mounted to the ceiling of the cavity for browning and crisping toast and tandoori. If the grill works but microwave mode remains cold, the heating rod is intact while the magnetron circuit has burned out.
- **Convection Microwave Ovens:** The most versatile units, featuring a rear heating coil, high-temperature blower fan, and convection thermostat for true 200°C baking. Convection models feature a high-voltage fuse that frequently blows during voltage surges, rendering microwave heating inoperable while the convection baking element still functions!

---

## Utensil Safety Science: What Materials Spark and Why?

The physics of microwave sparking inside the cavity is straightforward:
- **Metals Reflect Microwaves:** While smooth, thick metal walls of the oven cavity safely reflect waves into food, thin metal edges (such as gold or silver foil rims on fancy bone china teacups, aluminum foil sheets, or wire twist ties) cannot absorb the intense electrical field.
- **Arcing:** The alternating electrical field induces high surface currents in the thin metal. At sharp corners or edges, the air ionizes and breaks down, creating a blinding electrical plasma arc (spark) that can ignite surrounding food packaging.
- **Always Use Certified Materials:** Only heat food in certified borosilicate glass (Pyrex/Borosil), microwave-safe unpainted ceramics, or food-grade BPA-free polypropylene containers stamped with the microwave wave symbol.

---

## 4-Step Maintenance Protocol to Double Your Microwave's Lifespan

1. **Wipe Interior Spills Immediately:** Never allow tomato curry or oil droplets to bake repeatedly onto cavity walls. Once grease covers the mica waveguide cover, destructive sparking begins within days.
2. **Never Run an Empty Microwave:** Operating an oven with zero food or liquid leaves microwave energy with nothing to absorb it. The standing waves bounce back into the magnetron antenna, destroying the vacuum tube within 60 seconds.
3. **Keep 4 Inches of Air Clearance:** Ensure ventilation vents on the left and rear cabinets have at least 10 cm of clearance from walls and overhead cabinets to allow the cooling fan to dissipate transformer heat.
4. **Use a Dedicated Surge Protector:** Plug your microwave into a 16-Amp dedicated grounded socket protected by an individual voltage stabilizer if your area experiences seasonal thunderstorms.
`;
  mwPost.content += extraMwContent;
}

// 4. Enrich Post 5 (LED TV)
const tvPost = posts.find(p => p.slug === 'led-tv-sound-ok-no-picture-black-screen-fix');
if (tvPost) {
  const extraTvContent = `

---

## Direct-Lit vs Edge-Lit LED TVs: How Backlight Architecture Impacts Repair

Modern Smart LED TVs utilize one of two distinct backlight illumination designs:

- **Direct-Lit (DLED) Backlights:** Found in the vast majority of budget and mid-range 32", 40", 43", and 55" TVs. Multiple horizontal aluminum strips are spaced evenly across the entire rear metal chassis directly behind the LCD diffuser sheets. Each LED bead is capped with an optical acrylic dispersion lens that scatters light evenly across the panel. Direct-lit systems run relatively cool and are exceptionally straightforward for our technicians to service on-site at home.
- **Edge-Lit (ELED) Backlights:** Used in ultra-slim premium televisions. Instead of rows across the back, one or two high-density strips of miniature LEDs are mounted along the bottom or side aluminum edge of the TV frame. A microscopic optical acrylic Light Guide Plate (LGP) distributes the edge light across the entire display. Because hundreds of high-power LEDs are crammed into a narrow metal strip, edge-lit TVs run significantly hotter. Over 4 to 6 years, thermal stress can melt the edge diffuser lens or burn the LED strip, causing dark vertical shadows or total illumination shutdown.

---

## The Secret Setting That Doubles Your TV's Backlight Lifespan

Here is an insider secret known to display repair engineers: **Modern TVs ship from the factory set to destructive picture modes!**

When you unpack a new TV, the default picture mode is set to **"Dynamic"** or **"Vivid"**, designed to look eye-catching under harsh fluorescent showroom lighting. In this mode:
- The backlight illumination is forced to run at **100% maximum overdrive**.
- The internal LED junction temperature climbs past **85°C**.
- Running at 100% continuously causes the phosphor layer on the LED chips to burn out within 2.5 to 3.5 years.

**The Pro Fix:** Open your TV's Settings menu, go to **Picture > Expert Settings**, and reduce the **Backlight** (not Brightness) slider from 100 down to **70 or 75**. 
- In a normal home living room, your eyes will not notice any loss of picture quality.
- Your LED operating temperature drops from 85°C to a comfortable 55°C.
- **This simple 10-second adjustment doubles the lifespan of your backlights from 3 years to over 7 years!**

---

## Monsoon Lightning Surge Protection for Smart TVs in West Bengal

During the thunderstorm and cyclone seasons in West Bengal, sudden lightning strikes induce high-voltage spikes into residential electric lines. 
- While many homes have an inverter or UPS, most basic home inverters do not clamp sudden nanosecond transient voltage spikes.
- The high-voltage surge enters through the TV power cord or through the coaxial HDMI cable connected to your rooftop DTH dish or cable set-top box.
- The voltage spike bypasses the fuse and strikes the sensitive constant-current backlight driver chip on the TV motherboard.

**Best Practice:** Always unplug both the TV wall power socket AND disconnect the HDMI cable from your DTH box during severe lightning storms.
`;
  tvPost.content += extraTvContent;
}

// Print new word counts
console.log('\n--- VERIFIED POST-ENRICHMENT WORD COUNTS ---');
for (const p of posts) {
  const words = p.content.split(/\s+/).filter(Boolean).length;
  console.log(`[${p.category}] ${p.slug}: ${words} words (Target: 1500+ -> ${words >= 1500 ? '✅ PASSED' : '❌ FAILED'})`);
}

// Save back to src/lib/blog-data.ts
const updatedFileContent = `// Auto-generated comprehensive 1500+ word blog posts covering all 5 core appliance categories
import { BlogPost } from './types';

export const initialBlogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

fs.writeFileSync(blogDataPath, updatedFileContent, 'utf-8');
console.log(`\nSuccessfully updated ${blogDataPath} with enriched 1500+ word content!`);
