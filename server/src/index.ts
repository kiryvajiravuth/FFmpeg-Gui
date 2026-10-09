import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { URL } from "node:url";
import { config } from "./config";
import { HttpError, badRequest, internal, notFound } from "./errors";

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(JSON.stringify(body));
}

function sendError(res: ServerResponse, err: HttpError): void {
  sendJson(res, err.status, { error: err.code, message: err.message });
}

function handleHealth(req: IncomingMessage, res: ServerResponse): void {
  if (req.method !== "GET") {
    sendError(res, badRequest("Method not allowed."));
    return;
  }
  sendJson(res, 200, { ok: true });
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  try {
    if (url.pathname === "/health") {
      handleHealth(req, res);
    } else {
      sendError(res, notFound());
    }
  } catch (err) {
    if (err instanceof HttpError) sendError(res, err);
    else sendError(res, internal("The request could not be processed."));
  }
});

server.listen(config.port, config.host, () => {
  console.log(`ffmpeg-gui backend listening on http://${config.host}:${config.port}`);
});
