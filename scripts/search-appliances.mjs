async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=6&prop=imageinfo&iiprop=url|mime`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query ? Object.values(data.query.pages) : [];
  console.log(`\n=== Results for "${query}" ===`);
  for (const p of pages) {
    if (p.imageinfo && p.imageinfo[0] && p.imageinfo[0].mime?.startsWith('image/')) {
      console.log(p.title, p.imageinfo[0].url);
    }
  }
}

async function run() {
  await searchCommons('air conditioner indoor unit');
  await searchCommons('modern refrigerator');
  await searchCommons('washing machine');
}

run();
