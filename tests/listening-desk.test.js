import assert from 'node:assert/strict';
import test from 'node:test';
import { readSavedKeys, stationInstant } from '../assets/listening-desk.js';

test('reads existing preference arrays without duplicates or invalid entries', () => {
  assert.deepEqual([...readSavedKeys('["metal",null,1,"metal","arena"]')], ['metal', 'arena']);
  for (const raw of [null, 'broken JSON', '{}', '"not an array"']) {
    assert.equal(readSavedKeys(raw).size, 0);
  }
});

test('uses Jerusalem winter and summer offsets', () => {
  assert.equal(stationInstant(new Date('2026-11-12'), '18:00').toISOString(), '2026-11-12T16:00:00.000Z');
  assert.equal(stationInstant(new Date('2026-07-12'), '18:00').toISOString(), '2026-07-12T15:00:00.000Z');
});

test('keeps an honest fallback for the Jerusalem spring DST gap', () => {
  assert.equal(stationInstant(new Date('2026-03-27'), '02:30'), null);
  assert.equal(stationInstant(new Date('2026-03-27'), '03:30').toISOString(), '2026-03-27T00:30:00.000Z');
});
