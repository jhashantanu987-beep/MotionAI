const ngrok = require('ngrok');

(async function() {
  console.log('Starting NGROK programmatically...');
  try {
    const url = await ngrok.connect(5000);
    console.log('========================================================');
    console.log('✅ YOUR NGROK URL IS:', url);
    console.log('========================================================');
    
    // Keep process alive
    process.stdin.resume();
  } catch (error) {
    console.error('Failed to start ngrok:', error);
  }
})();

