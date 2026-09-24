async function getFridge() {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=stainless+steel+refrigerator&srnamespace=6&srlimit=8`;
  const res = await fetch(url, { headers: { 'User-Agent': 'ACRepairWeb/1.0' } });
  const data = await res.json();
  const results = data.query ? data.query.search : [];
  for (const item of results) {
    const fileInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(item.title)}&prop=imageinfo&iiprop=url|mime`;
    const fRes = await fetch(fileInfoUrl, { headers: { 'User-Agent': 'ACRepairWeb/1.0' } });
    const fData = await fRes.json();
    const page = Object.values(fData.query.pages)[0];
    if (page?.imageinfo?.[0]) {
      console.log(item.title, '->', page.imageinfo[0].url);
    }
  }
}

getFridge();
