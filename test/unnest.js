var assert = require('assert');

var R = require('..');


describe('unnest', function() {
    it('only flattens one layer deep of a nested list', function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.deepEqual(R.unnest(nest), [1, 2, 3, [4, 5], 6, [[[7], 8]], 9, 10]);
        nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
        assert.deepEqual(R.unnest(nest), [[[3]], 2, 1, 0, [-1, -2], -3]);
        assert.deepEqual(R.unnest([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
    });

    it('is not destructive', function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.notStrictEqual(R.unnest(nest), nest);
    });

    it('handles array-like objects', function() {
        var o = {length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']]};
        assert.deepEqual(R.unnest(o), [1, 2, [3], 'a', 'b', 'c', ['d', 'e']]);
    });

    it('flattens an array of empty arrays', function() {
        assert.deepEqual(R.unnest([[], [], []]), []);
        assert.deepEqual(R.unnest([]), []);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.unnest, TypeError);
    });
});
