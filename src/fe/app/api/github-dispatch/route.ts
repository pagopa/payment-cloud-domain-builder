// app/api/github-dispatch/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 15);

  // 🚀 Log request start
  console.log(`🚀  [${requestId}] GitHub Dispatch API call started`);
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

  console.log(`    [${requestId}] IP: ${ip}`);
  console.log(`    [${requestId}] Origin: ${request.headers.get('origin') || 'none'}`);
  console.log(`    [${requestId}] User-Agent: ${request.headers.get('user-agent') || 'unknown'}`);

  try {
    // // Verify origin
    // const origin = request.headers.get('origin');
    //
    // // Define allowed origin logic
    // const isAllowedOrigin = (origin: string | null) => {
    //   if (!origin) return false;
    //
    //   // Allow localhost
    //   if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
    //
    //   // Allow Azure Container Apps domains
    //   // This regex matches https://<anything>.azurecontainerapps.io
    //   const azureContainerAppsRegex = /^https:\/\/.*\.azurecontainerapps\.io$/;
    //   return azureContainerAppsRegex.test(origin);
    // };
    //
    // if (!isAllowedOrigin(origin)) {
    //   console.log(`❌  [${requestId}] Unauthorized origin: ${origin}`);
    //   return NextResponse.json(
    //       { error: 'Unauthorized origin' },
    //       { status: 403 }
    //   );
    // }
    // console.log(`✅  [${requestId}] Origin verified successfully`);


    // Parse body
    const body = await request.json();

    console.log(`    [${requestId}] Form data received:`,
      {
        domain_name: body.formData?.domain_name || 'N/A',
        product_name: body.formData?.product_name || 'N/A',
        location: body.formData?.location || 'N/A',
        fieldsCount: Object.keys(body.formData || {}).length
    });

    console.log(`🐙  [${requestId}] Sending request to GitHub API...`);
    const githubStartTime = Date.now();

      // const response = await fetch('https://api.github.com/repos/pagopa/payment-cloud-domain-builder/dispatches', {
      //     method: 'POST',
      //     headers: {
      //         'Accept': 'application/vnd.github.v3+json',
      //         'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      //     },
      //     body: JSON.stringify({
      //         event_type: 'domain-builder-wk',
      //         client_payload: {
      //             data: body.data,
      //             metadata: {
      //                 requestId,
      //                 timestamp: new Date().toISOString(),
      //             }
      //         }
      //     })
      // });

    const response = await fetch('https://api.github.com/repos/pagopa/payment-cloud-domain-builder/actions/workflows/domain-builder.yml/dispatches' , {
      method: 'POST',
      headers: {
        // 'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
          ref: "ansible-on-branch",
          inputs: {
              data: body.data
          }
      })
    });

    const githubDuration = Date.now() - githubStartTime;

    if (!response.ok) {
      console.log(`    [${requestId}] GitHub API error:`, {
        status: response.status,
        statusText: response.statusText,
        duration: `${githubDuration}ms`
      });

      const errorText = await response.text();
      console.log(`    [${requestId}] GitHub response body:`, errorText);

      throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
    }

    console.log(`    [${requestId}] GitHub API call completed successfully!`);
    console.log(`    [${requestId}] GitHub call duration: ${githubDuration}ms`);

    const totalDuration = Date.now() - startTime;
    console.log(`    [${requestId}] Request completed successfully in ${totalDuration}ms`);

    return NextResponse.json({
      success: true,
      requestId,
      duration: totalDuration,
      status: response.status
    });

  } catch (error) {
    const totalDuration = Date.now() - startTime;

    console.log(`    [${requestId}] Error on request:`, {
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
  console.log(`ℹ️  GitHub Dispatch API - Health check called`);
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'GitHub Dispatch API is running! 🚀'
  });
}