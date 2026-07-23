import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, title } = await req.json();

    if (!text && !title) {
      return NextResponse.json({ error: 'Description or title is required' }, { status: 400 });
    }

    const input = `${title || ''} ${text || ''}`.toLowerCase();

    // Smart heuristic NLP fallback engine
    let category = 'other';
    let priority = 'medium';
    let estimatedFixTime = '2 hours';
    let suggestedStaff = 'General Maintenance Team';

    // HVAC / Air Conditioner
    if (input.includes('ac') || input.includes('air conditioner') || input.includes('cooling') || input.includes('heat') || input.includes('vent')) {
      category = 'hvac';
      priority = input.includes('hot') || input.includes('leak') || input.includes('noise') ? 'high' : 'medium';
      estimatedFixTime = '2-3 hours';
      suggestedStaff = 'Robert Vance (HVAC Technician)';
    }
    // Plumbing / Water
    else if (input.includes('tap') || input.includes('water') || input.includes('leak') || input.includes('sink') || input.includes('flush') || input.includes('toilet') || input.includes('pipe') || input.includes('shower')) {
      category = 'plumbing';
      priority = input.includes('flood') || input.includes('overflow') || input.includes('heavy') ? 'emergency' : 'high';
      estimatedFixTime = '1-2 hours';
      suggestedStaff = 'Carlos Plumbing Team';
    }
    // Electrical / Power
    else if (input.includes('power') || input.includes('light') || input.includes('fan') || input.includes('socket') || input.includes('spark') || input.includes('switch') || input.includes('short')) {
      category = 'electrical';
      priority = input.includes('spark') || input.includes('short') ? 'emergency' : 'medium';
      estimatedFixTime = '1 hour';
      suggestedStaff = 'Electra Tech Services';
    }
    // Wi-Fi / Internet
    else if (input.includes('wifi') || input.includes('internet') || input.includes('router') || input.includes('slow') || input.includes('connection') || input.includes('network')) {
      category = 'wifi';
      priority = 'medium';
      estimatedFixTime = '45 mins';
      suggestedStaff = 'IT & Networking Desk';
    }
    // Furniture / Carpentry
    else if (input.includes('chair') || input.includes('desk') || input.includes('bed') || input.includes('door') || input.includes('lock') || input.includes('key') || input.includes('cupboard') || input.includes('window')) {
      category = 'furniture';
      priority = input.includes('lock') || input.includes('door') ? 'high' : 'low';
      estimatedFixTime = '1-2 hours';
      suggestedStaff = 'Mike Carpentry Services';
    }
    // Cleanliness / Housekeeping
    else if (input.includes('clean') || input.includes('dust') || input.includes('garbage') || input.includes('trash') || input.includes('smell') || input.includes('stain')) {
      category = 'cleanliness';
      priority = 'low';
      estimatedFixTime = '30 mins';
      suggestedStaff = 'Housekeeping Staff';
    }

    // Improved Polish & Grammar
    const rawWords = (text || title || '').trim();
    const improvedGrammar = rawWords
      ? rawWords.charAt(0).toUpperCase() + rawWords.slice(1) + (rawWords.endsWith('.') ? '' : '.')
      : 'Issue reported regarding hostel room facility maintenance.';

    const aiSummary = `AI Triage: Identified ${category.toUpperCase()} issue with ${priority.toUpperCase()} urgency level. Recommended fix time: ${estimatedFixTime}.`;

    return NextResponse.json({
      success: true,
      category,
      priority,
      estimatedFixTime,
      suggestedStaff,
      polishedDescription: improvedGrammar,
      aiSummary,
    });
  } catch (error) {
    return NextResponse.json({ error: 'AI processing failed', details: String(error) }, { status: 500 });
  }
}
