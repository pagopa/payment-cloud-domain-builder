// app/api/github-dispatch/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 15);

  // 🚀 Log inizio richiesta
  console.log(`🚀  [${requestId}] GitHub Dispatch API chiamata iniziata`);
  console.log(`    [${requestId}] IP: ${request.ip || 'unknown'}`);
  console.log(`    [${requestId}] Origin: ${request.headers.get('origin') || 'none'}`);
  console.log(`    [${requestId}] User-Agent: ${request.headers.get('user-agent') || 'unknown'}`);

  try {
    // Verifica origine
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'http://localhost:3000',
      'https://tuo-dominio.com',
      'https://tuo-dominio.vercel.app'
    ];

    if (!origin || !allowedOrigins.includes(origin)) {
      console.log(`❌  [${requestId}] Origine non autorizzata: ${origin}`);
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      );
    }

    console.log(`✅  [${requestId}] Origine verificata con successo`);

    // Parse del body
    const body = await request.json();

    console.log(`    [${requestId}] Form data ricevuto:`, {
      domain_name: body.formData?.domain_name || 'N/A',
      product_name: body.formData?.product_name || 'N/A',
      location: body.formData?.location || 'N/A',
      // Non loggare dati sensibili completi
      fieldsCount: Object.keys(body.formData || {}).length
    });

    // Chiamata a GitHub
    console.log(`🐙  [${requestId}] Invio richiesta a GitHub API...`);
    const githubStartTime = Date.now();

    const response = await fetch('https://api.github.com/repos/ffppa/test-runners/dispatches', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        event_type: 'test-wk',
        client_payload: {
          foo: "bar",
          formData: body.formData,
          metadata: {
            requestId,
            timestamp: new Date().toISOString(),
            origin
          }
        }
      })
    });

    const githubDuration = Date.now() - githubStartTime;

    if (!response.ok) {
      console.log(`    [${requestId}] GitHub API errore:`, {
        status: response.status,
        statusText: response.statusText,
        duration: `${githubDuration}ms`
      });

      const errorText = await response.text();
      console.log(`    [${requestId}] GitHub response body:`, errorText);

      throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
    }

    console.log(`    [${requestId}] GitHub API chiamata completata con successo!`);
    console.log(`    [${requestId}] Durata chiamata GitHub: ${githubDuration}ms`);

    const totalDuration = Date.now() - startTime;
    console.log(`    [${requestId}] Richiesta completata con successo in ${totalDuration}ms`);

    return NextResponse.json({
      success: true,
      requestId,
      duration: totalDuration
    });

  } catch (error) {
    const totalDuration = Date.now() - startTime;

    console.log(`    [${requestId}] Errore durante la richiesta:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${totalDuration}ms`,
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      {
        error: 'Failed to trigger GitHub workflow',
        requestId,
        duration: totalDuration
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log(`ℹ️  GitHub Dispatch API - Health check chiamato`);
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'GitHub Dispatch API is running! 🚀'
  });
}