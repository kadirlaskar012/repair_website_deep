async function getFiles(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=8`;
  const res = await fetch(url);
  const data = await res.json();
  const results = data.query ? data.query.search : [];
  console.log(`\nResults for: "${query}"`);
  for (const item of results) {
    // Get file url
    const fileInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(item.title)}&prop=imageinfo&iiprop=url|mime|size`;
    const fRes = await fetch(fileInfoUrl);
    const fData = await fRes.json();
    const page = Object.values(fData.query.pages)[0];
    if (page?.imageinfo?.[0]) {
      console.log(item.title, '->', page.imageinfo[0].url);
    }
  }
}

async function run() {
  await getFiles('split air conditioner indoor unit');
  await getFiles('refrigerator stainless steel');
}

run();
