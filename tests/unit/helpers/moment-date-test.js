import { momentDate } from 'foodie-client/helpers/moment-date';
import { module, test } from 'qunit';

module('Unit | Helper | moment date');

test('formats date with moment JS using "second" as "startOf" option "fromNow"', function(assert) {
  assert.expect(9);

  let dateNow = new Date();
  let timeNow = dateNow.getSeconds();
  let secondsAgo = momentDate([dateNow.setSeconds(timeNow - 7)], { format: 'second'});
  let minuteAgo = momentDate([dateNow.setSeconds(timeNow - 60)], { format: 'second'});
  let minutesAgo = momentDate([dateNow.setSeconds(timeNow - 90)], { format: 'second'});
  let hourAgo = momentDate([dateNow.setSeconds(timeNow - 3600)], { format: 'second'});
  let hoursAgo = momentDate([dateNow.setSeconds(timeNow - 7200)], { format: 'second'});
  let dayAgo = momentDate([dateNow.setSeconds(timeNow - (3600 * 24))], { format: 'second'});
  let daysAgo = momentDate([dateNow.setSeconds(timeNow - (3600 * 24 * 3))], { format: 'second'});
  let monthAgo = momentDate([dateNow.setSeconds(timeNow - (3600 * 24 * 31))], { format: 'second'});
  let monthsAgo = momentDate([dateNow.setSeconds(timeNow - (3600 * 24 * 200))], { format: 'second'});

  assert.equal(secondsAgo, 'a few seconds ago');
  assert.equal(minuteAgo, 'a minute ago');
  assert.equal(minutesAgo, '3 minutes ago');
  assert.equal(hourAgo, 'an hour ago');
  assert.equal(hoursAgo, '3 hours ago');
  assert.equal(dayAgo, 'a day ago');
  assert.equal(daysAgo, '4 days ago');
  assert.equal(monthAgo, 'a month ago');
  assert.equal(monthsAgo, '8 months ago');
});
