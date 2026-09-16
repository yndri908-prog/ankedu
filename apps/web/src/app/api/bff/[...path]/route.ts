import { NextRequest, NextResponse } from 'next/server';

/**
 * BFF (decision D1).
 *
 * Le navigateur ne parle jamais directement a NestJS : il appelle
 * /api/bff/* sur la meme origine, ce qui permet de garder le cookie de
 * session en SameSite=Strict et supprime l'essentiel du risque CSRF.
 *
 * Squelette volontairement minimal : ni timeout, ni liste blanche d'en-tetes,
 * ni streaming. Ces protections arrivent en Phase 3 avec l'authentification.
 */

const API_URL = process.env.API_INTERNAL_URL ?? 'http://localhost:4000';

async function proxy(req: NextRequest, path: string[]): Promise<NextResponse> {
  const target = `${API_URL}/api/${path.join('/')}${req.nextUrl.search}`;

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers: {
        'content-type': req.headers.get('content-type') ?? 'application/json',
        cookie: req.headers.get('cookie') ?? '',
      },
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : await req.text(),
      redirect: 'manual',
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json(
      { message: "Le service AnkEdu est momentanement injoignable. Reessayez dans un instant." },
      { status: 503 },
    );
  }

  const response = new NextResponse(await upstream.text(), { status: upstream.status });

  const contentType = upstream.headers.get('content-type');
  if (contentType) response.headers.set('content-type', contentType);

  for (const cookie of upstream.headers.getSetCookie()) {
    response.headers.append('set-cookie', cookie);
  }

  return response;
}

type Context = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, ctx: Context) {
  return proxy(req, (await ctx.params).path);
}
export async function POST(req: NextRequest, ctx: Context) {
  return proxy(req, (await ctx.params).path);
}
export async function PATCH(req: NextRequest, ctx: Context) {
  return proxy(req, (await ctx.params).path);
}
export async function PUT(req: NextRequest, ctx: Context) {
  return proxy(req, (await ctx.params).path);
}
export async function DELETE(req: NextRequest, ctx: Context) {
  return proxy(req, (await ctx.params).path);
}
