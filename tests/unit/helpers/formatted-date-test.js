import { formattedDate } from 'foodie-client/helpers/formatted-date';
import { module, test } from 'qunit';

module('Unit | Helper | formatted date');

test('formats datetime to "month day, year" if "LL" format option is used', function(assert) {
  assert.expect(1);

  let date = formattedDate(['2007-07-07 00:00:00'], { format: 'LL'});

  assert.equal(date, 'July 7, 2007');
});
