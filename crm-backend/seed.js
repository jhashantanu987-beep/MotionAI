// Using built-in fetch (Node v24+)

const API_URL = 'http://localhost:5000/api/leads';

const seedLeads = [
  {
    name: 'Elon Musk',
    email: 'elon@spacex.com',
    phone: '+1-555-MARS',
    source: 'google',
    score: 98,
    status: 'converted',
    value: 150000,
    notes: 'Interested in fleet of AI sales bots for Starlink.'
  },
  {
    name: 'Satya Nadella',
    email: 'satya@microsoft.com',
    phone: '+1-555-MSFT',
    source: 'meta',
    score: 92,
    status: 'booked',
    value: 85000,
    notes: 'Inquiry about AI revenue systems integration.'
  },
  {
    name: 'Sam Altman',
    email: 'sam@openai.com',
    phone: '+1-555-CHAT',
    source: 'manual',
    score: 85,
    status: 'qualified',
    value: 45000,
    notes: 'Potential partnership for UGC engine.'
  },
  {
    name: 'Jensen Huang',
    email: 'jensen@nvidia.com',
    phone: '+1-555-GPU',
    source: 'tiktok',
    score: 99,
    status: 'converted',
    value: 320000,
    notes: 'Wants to scale GPU-driven revenue funnels.'
  },
  {
    name: 'Mark Zuckerberg',
    email: 'mark@meta.com',
    phone: '+1-555-META',
    source: 'meta',
    score: 75,
    status: 'new',
    value: 12000,
    notes: 'Interested in AI qualification for WhatsApp leads.'
  }
];

async function seed() {
  console.log('🌱 Seeding CRM Backend with Real Data...');
  
  for (const lead of seedLeads) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      const data = await res.json();
      if (data.success) {
        console.log(`✅ Created Lead: ${lead.name}`);
      } else {
        console.log(`❌ Failed: ${lead.name} - ${data.message}`);
      }
    } catch (err) {
      console.log(`❌ Server not responding at ${API_URL}. Is it running?`);
      break;
    }
  }
  
  console.log('\n✨ Seeding complete. Refresh your dashboard!');
}

seed();
