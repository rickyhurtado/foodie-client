import { unescapeHtml } from 'foodie-client/helpers/unescape-html';
import { module, test } from 'qunit';

module('Unit | Helper | unescape html');

test('parses the HTML tags from a text', function(assert) {
  assert.expect(1);

  let text = '&lt;p&gt;This text is wrapped with a paragraph tag.&lt;/p&gt;';
  let newText = unescapeHtml([text]);

  assert.equal(newText, '<p>This text is wrapped with a paragraph tag.</p>');
});
