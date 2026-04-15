const store = require('./crm-backend/services/FileLeadStore');

async function testStore() {
  console.log("--- Testing FileLeadStore Persistence ---");
  try {
    const name = `Test Lead ${Date.now()}`;
    const email = `test_${Date.now()}@example.com`;
    
    console.log(`Adding lead: ${name}`);
    const newLead = await store.create({ name, email, source: 'manual' });
    console.log(`Created lead with ID: ${newLead.id}`);

    const allLeads = await store.getAll();
    const found = allLeads.find(l => l.id === newLead.id);
    if (found) {
      console.log("SUCCESS: Lead verified in storage.");
    } else {
      console.error("FAILURE: Lead NOT found in storage after create.");
    }

    // Test uniqueness
    try {
      await store.create({ name: 'Duplicate', email });
      console.error("FAILURE: Uniqueness check failed. Duplicate email allowed.");
    } catch (e) {
      console.log(`SUCCESS: Duplicate email blocked as expected: ${e.message}`);
    }

  } catch (err) {
    console.error(`TEST ERROR: ${err.message}`);
  }
}

testStore();
