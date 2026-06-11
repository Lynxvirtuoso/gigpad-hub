import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    // Validate fields
    if (!name || !category || !message) {
      return NextResponse.json(
        { error: 'Required fields: name, category, and message are missing.' },
        { status: 400 }
      );
    }

    // Telemetry log for local developer checking
    console.log(`[Feedback Submissions] received:`, {
      name,
      email: email || 'N/A',
      category,
      message,
      timestamp: new Date().toISOString()
    });

    // In production, this can be saved to a database (MongoDB, Postgres)
    // or dispatched to a discord webhook / email dispatcher.
    return NextResponse.json(
      { 
        message: 'Feedback received successfully. Thank you for contributing to the GigPad project!' 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload received.' },
      { status: 400 }
    );
  }
}
