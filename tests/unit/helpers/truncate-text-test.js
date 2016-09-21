import { truncateText } from 'foodie-client/helpers/truncate-text';
import { module, test } from 'qunit';

module('Unit | Helper | truncate text');

test('truncates long text if "length" option is defined', function(assert) {
  assert.expect(1);

  let text = '&lt;p&gt;The quick brown fox jumps over the lazy dog.&lt;/p&gt;';
  let newText = truncateText([text], { length: 20 });

  assert.equal(newText, 'The quick brown fox...');
});
