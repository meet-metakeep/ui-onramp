import { NextRequest, NextResponse } from 'next/server';

const METAKEEP_API_KEY = "AkiEXjPQcDjpe5cPeh0tXblJg5KN/dE+zwouxBuyACgE";
const METAKEEP_API_URL = "https://api.metakeep.xyz/v3/getWallet";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Call MetaKeep API
    const response = await fetch(METAKEEP_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-key': METAKEEP_API_KEY,
      },
      body: JSON.stringify({
        user: {
          email: email.trim(),
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `MetaKeep API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.status !== 'SUCCESS') {
      return NextResponse.json(
        { error: `MetaKeep API returned status: ${data.status}` },
        { status: 500 }
      );
    }

    // Return the wallet data
    return NextResponse.json({
      status: 'success',
      wallet: data.wallet,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 