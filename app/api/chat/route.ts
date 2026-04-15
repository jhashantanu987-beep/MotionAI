import { NextResponse } from 'next/server'

const pricingResponse = 'Our packages start at $2,500 setup plus $4,500/month. Enterprise and performance tiers scale with volume, ROI tracking, and priority onboarding.'
const bookingResponse = 'Your bookable pipeline is active: clients are scheduling calls, follow-ups are queued, and the next open slots are in the early afternoon. Keep the sequence moving to reduce no-shows.'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, leadId } = body;

    // Proxy the request to our real Express AI Engine
    const response = await fetch('http://127.0.0.1:5000/api/leads/public-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, leadId }),
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error('Express backend unreachable');
    }

    const data = await response.json();

    // Return the real AI response and the new leadId for session tracking
    return NextResponse.json({
      text: data.text,
      leadId: data.leadId,
      quickActions: data.newAppointmentDate 
        ? ['View my appointment', 'Talk to human'] 
        : ['How many leads?', 'What is my revenue?', 'Book a call']
    });

  } catch (error) {
    console.error('Chat Proxy Error:', error);
    return NextResponse.json({ 
      text: 'I am currently synchronizing with the neural core. Please try again in a moment.',
      quickActions: ['Retry connection']
    }, { status: 502 });
  }
}
