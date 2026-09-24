const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/bn',
  'http://localhost:3000/ac-repair',
  'http://localhost:3000/bn/ac-repair',
  'http://localhost:3000/fridge-repair',
  'http://localhost:3000/washing-machine-repair',
  'http://localhost:3000/microwave-repair',
  'http://localhost:3000/led-tv-repair',
  'http://localhost:3000/blog',
  'http://localhost:3000/bn/blog',
  'http://localhost:3000/blog/ac-not-cooling-top-reasons-solutions-kolkata',
  'http://localhost:3000/bn/blog/ac-not-cooling-top-reasons-solutions-kolkata',
  'http://localhost:3000/privacy-policy',
  'http://localhost:3000/terms-of-service',
  'http://localhost:3000/sitemap.xml',
  'http://localhost:3000/robots.txt',
  'http://localhost:3000/admin/login'
];

async function main() {
  console.log('Testing Endpoints on http://localhost:3000...\n');
  let passCount = 0;

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`[${res.status}] ${url}`);
      if (res.status === 200) passCount++;
    } catch (e) {
      console.error(`[ERROR] ${url}:`, e.message);
    }
  }

  // Also test Booking API POST
  console.log('\nTesting POST /api/bookings...');
  try {
    const bookRes = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sudipto Ganguly',
        mobile: '9830123456',
        service: 'ac-repair',
        serviceName: 'AC Repair',
        brand: 'Voltas',
        problem: 'Gas leakage and cooling stopped',
        address: 'Flat 4B, Sector 2, Salt Lake, Kolkata - 700091',
        preferredDate: '2026-09-26',
        preferredTime: '09:00 AM - 12:00 PM'
      })
    });
    const bookData = await bookRes.json();
    console.log(`[${bookRes.status}] POST /api/bookings -> Booking ID: ${bookData.booking?.bookingId}, Success: ${bookData.success}`);
    if (bookData.success) passCount++;
  } catch (err) {
    console.error('Booking POST error:', err.message);
  }

  console.log(`\nVerification complete: ${passCount}/${urls.length + 1} tests PASSED!`);
}

main();
