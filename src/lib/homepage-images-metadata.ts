import defaultImages from './homepage-images.json';

export interface ImageSlotMeta {
  slotId: string;
  section: string;
  title: string;
  description: string;
  recommendedSize: string;
  defaultPath: string;
}

export const HOMEPAGE_IMAGE_SLOTS: ImageSlotMeta[] = [
  // Hero & Spotlight Section
  {
    slotId: 'hero_ac',
    section: 'Hero Spotlight Cards',
    title: 'AC Deep Cleaning & Gas Refill (Hero)',
    description: 'Main Hero card 1 showing professional AC technician at doorstep',
    recommendedSize: '1000 x 800 px (JPEG/WebP)',
    defaultPath: '/images/ac_service.jpg'
  },
  {
    slotId: 'hero_fridge',
    section: 'Hero Spotlight Cards',
    title: 'Reliable Refrigerator Repair (Hero)',
    description: 'Main Hero card 2 showing technician servicing open refrigerator',
    recommendedSize: '1000 x 800 px (JPEG/WebP)',
    defaultPath: '/images/fridge_service.jpg'
  },
  {
    slotId: 'hero_washing',
    section: 'Hero Spotlight Cards',
    title: 'Professional Washing Machine Care (Hero)',
    description: 'Main Hero card 3 showing washing machine repair',
    recommendedSize: '1000 x 800 px (JPEG/WebP)',
    defaultPath: '/images/service_washing_machine.jpg'
  },

  // Most Booked Services
  {
    slotId: 'service_ac',
    section: 'Most Booked Services',
    title: 'Split AC Jet Pump Service Card',
    description: 'Service card image in the 2-column most booked services section',
    recommendedSize: '800 x 600 px (JPEG/WebP)',
    defaultPath: '/images/ac_service.jpg'
  },
  {
    slotId: 'service_fridge',
    section: 'Most Booked Services',
    title: 'Double Door Refrigerator Cooling Card',
    description: 'Service card image for refrigerator cooling & gas charge repair',
    recommendedSize: '800 x 600 px (JPEG/WebP)',
    defaultPath: '/images/fridge_service.jpg'
  },
  {
    slotId: 'service_washing',
    section: 'Most Booked Services',
    title: 'Front Load Washer Drum & Motor Card',
    description: 'Service card image for washing machine drum and motor service',
    recommendedSize: '800 x 600 px (JPEG/WebP)',
    defaultPath: '/images/service_washing_machine.jpg'
  },
  {
    slotId: 'service_microwave',
    section: 'Most Booked Services',
    title: 'Microwave Heating & Magnetron Card',
    description: 'Service card image for microwave heating repair',
    recommendedSize: '800 x 600 px (JPEG/WebP)',
    defaultPath: '/images/service_microwave_oven.jpg'
  },
  {
    slotId: 'service_led_tv',
    section: 'Most Booked Services',
    title: 'Smart LED TV Screen & Board Card',
    description: 'Service card image for smart television display panel service',
    recommendedSize: '800 x 600 px (JPEG/WebP)',
    defaultPath: '/images/service_smart_led_tv.jpg'
  },

  // Appliance Categories
  {
    slotId: 'cat_ac',
    section: 'Appliance Categories',
    title: 'Air Conditioner Unit Photo',
    description: 'Direct appliance photography for AC category card',
    recommendedSize: '600 x 450 px (JPEG/WebP)',
    defaultPath: '/images/split_ac_unit.jpg'
  },
  {
    slotId: 'cat_fridge',
    section: 'Appliance Categories',
    title: 'Refrigerator Unit Photo',
    description: 'Direct appliance photography for Refrigerator category card',
    recommendedSize: '600 x 450 px (JPEG/WebP)',
    defaultPath: '/images/samsung_fridge_unit.jpg'
  },
  {
    slotId: 'cat_washing',
    section: 'Appliance Categories',
    title: 'Washing Machine Unit Photo',
    description: 'Direct appliance photography for Washing Machine category card',
    recommendedSize: '600 x 450 px (JPEG/WebP)',
    defaultPath: '/images/front_load_washer.jpg'
  },
  {
    slotId: 'cat_microwave',
    section: 'Appliance Categories',
    title: 'Microwave Oven Unit Photo',
    description: 'Direct appliance photography for Microwave category card',
    recommendedSize: '600 x 450 px (JPEG/WebP)',
    defaultPath: '/images/microwave_oven_unit.jpg'
  },
  {
    slotId: 'cat_led_tv',
    section: 'Appliance Categories',
    title: 'Smart LED TV Unit Photo',
    description: 'Direct appliance photography for LED TV category card',
    recommendedSize: '600 x 450 px (JPEG/WebP)',
    defaultPath: '/images/smart_led_tv_unit.jpg'
  },

  // Promotional Banners
  {
    slotId: 'promo_banner_1',
    section: 'Promotional Banners',
    title: 'Hassle-Free Home Comfort Banner',
    description: 'First wide promo banner across Kolkata & West Bengal',
    recommendedSize: '1600 x 600 px (JPEG/WebP)',
    defaultPath: '/images/banner_comfort.jpg'
  },
  {
    slotId: 'promo_banner_2',
    section: 'Promotional Banners',
    title: 'Expert Certified Technicians Banner',
    description: 'Second wide promo banner highlighting technician expertise',
    recommendedSize: '1600 x 600 px (JPEG/WebP)',
    defaultPath: '/images/expert_banner_modern.jpg'
  },

  // Trust Section
  {
    slotId: 'trust_technician',
    section: 'Trust & Verification',
    title: 'Verified Technician Trust Photo',
    description: 'Trust section badge showing background-verified technician',
    recommendedSize: '800 x 800 px (JPEG/WebP)',
    defaultPath: '/images/technician_trust.jpg'
  }
];

export type HomepageImagesMap = Record<string, string>;

export function getHomepageImages(): HomepageImagesMap {
  try {
    return { ...defaultImages };
  } catch {
    const fallback: HomepageImagesMap = {};
    for (const slot of HOMEPAGE_IMAGE_SLOTS) {
      fallback[slot.slotId] = slot.defaultPath;
    }
    return fallback;
  }
}
