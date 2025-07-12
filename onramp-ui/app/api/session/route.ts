/**
 * @title Session Token API Route
 * @notice Secure server-side session token generation for Coinbase Onramp
 * @dev Uses Coinbase Developer Platform (CDP) SDK to generate JWT tokens
 * @author Meet - Coinbase Onramp Integration Demo
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateJwt } from '@coinbase/cdp-sdk/auth';

interface SessionTokenRequest {
  addresses: Array<{
    address: string;
    blockchains: string[];
  }>;
  assets?: string[];
  walletAddress?: string;
}

export async function POST(request: NextRequest) {
  try {
    const keyName = process.env.KEY_NAME || process.env.CDP_API_KEY;
    const keySecret = process.env.KEY_SECRET || process.env.CDP_API_SECRET;

    if (!keyName || !keySecret) {
      return NextResponse.json(
        {
          error: 'Missing CDP API credentials. Please set KEY_NAME and KEY_SECRET environment variables.',
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { addresses, assets, walletAddress } = body as SessionTokenRequest;

    if (!addresses && walletAddress) {
      return NextResponse.json(
        {
          error: 'Legacy walletAddress parameter is no longer supported. Please use addresses array with blockchain specification.',
          details: 'Update your frontend to send: {"addresses": [{"address": "...", "blockchains": ["solana"]}]} instead of {"walletAddress": "..."}'
        },
        { status: 400 }
      );
    }

    if (!addresses || addresses.length === 0) {
      return NextResponse.json(
        {
          error: 'Addresses parameter is required. Format: {"addresses": [{"address": "...", "blockchains": ["network"]}]}',
        },
        { status: 400 }
      );
    }

    for (const addressEntry of addresses) {
      const { address, blockchains } = addressEntry;
      if (!address || !blockchains || blockchains.length === 0) {
        return NextResponse.json(
          {
            error: 'Each address entry must have an address and at least one blockchain',
            details: `Invalid entry: ${JSON.stringify(addressEntry)}`,
          },
          { status: 400 }
        );
      }
    }

    let jwtToken: string;
    try {
      jwtToken = await generateJwt({
        apiKeyId: keyName,
        apiKeySecret: keySecret,
        requestMethod: 'POST',
        requestHost: 'api.developer.coinbase.com',
        requestPath: '/onramp/v1/token',
        expiresIn: 120
      });
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Failed to generate JWT token',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 }
      );
    }

    const cdpApiUrl = 'https://api.developer.coinbase.com/onramp/v1/token';
    const requestBody = {
      addresses: addresses,
      ...(assets && { assets }),
    };

    const response = await fetch(cdpApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseText);
      } catch {
        errorDetails = responseText;
      }
      if (response.status === 401) {
        return NextResponse.json(
          {
            error: 'Authentication failed',
            details: 'Please verify your CDP API key and secret are correct.',
            apiError: errorDetails
          },
          { status: 401 }
        );
      }
      return NextResponse.json(
        {
          error: `CDP API error: ${response.status} ${response.statusText}`,
          details: errorDetails,
        },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json(
        {
          error: 'Invalid response from CDP API',
          details: responseText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 