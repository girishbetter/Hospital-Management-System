const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const envPath = path.join(__dirname, '..', '.env');
const envText = fs.readFileSync(envPath, 'utf8');

test('backend env does not duplicate the MONGO_URI key', () => {
  assert.doesNotMatch(envText, /MONGO_URI\s*=\s*MONGO_URI\s*=/i);
});

test('backend env exposes a valid MongoDB connection string', () => {
  const match = envText.match(/^MONGO_URI\s*=\s*(.+)$/m);
  assert.ok(match, 'MONGO_URI is defined in backend/.env');
  assert.match(match[1], /^mongodb\+/i);
});
