function transform(input) {
  return Babel.compile(input).code;
};

function contains(haystack, needle) {
  return haystack.indexOf(needle) >= 0;
};

Tinytest.add("ecmascript - transpilation - types - string", (test) => {
  // make sure that typed variables are turned into JavaScript
  const output = transform('const x: string = 5;');
  test.isFalse(contains(output, ': string'));
  test.isTrue(contains(output, 'x = 5'));
});
