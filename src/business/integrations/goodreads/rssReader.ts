

const goodreadsUserCode = "144326327";


export async function fetchRssFeed(): Promise<string> {
  const url = `https://www.goodreads.com/user/updates_rss/${goodreadsUserCode}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: ["text/html", "application/rss+xml", "application/xml", "text/xml"].join(",")
      },
      mode: "no-cors", });
    const rss = res.text();

    console.log(`[goodreads] fetched rss feed from ${url}`, rss);
    return rss;
  } catch (err) {
    console.error("[goodreads] fetch failed", err);
    throw err;
  }
}
