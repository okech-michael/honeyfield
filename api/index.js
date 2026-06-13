export default async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  const url = `${protocol}://${host}${req.url}`;

  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
  });

  const { default: app } = await import("../.output/server/index.mjs");
  const response = await app.fetch(request);

  res.statusCode = response.status;
  response.headers.forEach((value, name) => {
    if (name.toLowerCase() === "transfer-encoding") return;
    res.setHeader(name, value);
  });

  const body = response.body ? Buffer.from(await response.arrayBuffer()) : undefined;
  if (body) {
    res.end(body);
  } else {
    res.end();
  }
}
