import assert from 'power-assert';
import { Observable } from 'rxjs';
import distinct from '../src/distinct';

describe('distinct', function() {
  context('when []', function() {
    it('works', function() {
      const source = Observable.fromArray([]);
      distinct(source)
        .toArray()
        .subscribe(array => {
          assert(array.length === 0);
        });
    });
  });

  context('when [1]', function() {
    it('works', function() {
      const source = Observable.fromArray([1]);
      distinct(source)
        .toArray()
        .subscribe(array => {
          assert(array.length === 1);
          const [i1] = array;
          assert.deepEqual(i1, 1);
        });
    });
  });

  context('when [1, 1]', function() {
    it('works', function() {
      const source = Observable.fromArray([1, 1]);
      distinct(source)
        .toArray()
        .subscribe(array => {
          assert(array.length === 1);
          const [i1] = array;
          assert.deepEqual(i1, 1);
        });
    });
  });

  context('when [1, 2]', function() {
    it('works', function() {
      const source = Observable.fromArray([1, 2]);
      distinct(source)
        .toArray()
        .subscribe(array => {
          assert(array.length === 2);
          const [i1, i2] = array;
          assert.deepEqual(i1, 1);
          assert.deepEqual(i2, 2);
        });
    });
  });

  context('when [1, 2, 1]', function() {
    it('works', function() {
      const source = Observable.fromArray([1, 2, 1]);
      distinct(source)
        .toArray()
        .subscribe(array => {
          assert(array.length === 2);
          const [i1, i2] = array;
          assert.deepEqual(i1, 1);
          assert.deepEqual(i2, 2);
        });
    });
  });

  context('when [1, 2, 1, 3]', function() {
    it('works', function() {
      const source = Observable.fromArray([1, 2, 1, 3]);
      distinct(source)
        .toArray()
        .subscribe(array => {
          assert(array.length === 3);
          const [i1, i2, i3] = array;
          assert.deepEqual(i1, 1);
          assert.deepEqual(i2, 2);
          assert.deepEqual(i3, 3);
        });
    });
  });

  context('when [{ n: 1 }, { n: 2 }, { n: 1 }, { n: 3 }]', function() {
    it('works', function() {
      const source = Observable.fromArray([
        { n: 1 },
        { n: 2 },
        { n: 1 },
        { n: 3 }
      ]);
      distinct(source)
        .toArray()
        .subscribe(array => {
          assert(array.length === 4);
          const [i1, i2, i3, i4] = array;
          assert.deepEqual(i1, { n: 1 });
          assert.deepEqual(i2, { n: 2 });
          assert.deepEqual(i3, { n: 1 });
          assert.deepEqual(i4, { n: 3 });
        });
    });
  });

  context('when [{ n: 1 }, { n: 2 }, { n: 1 }, { n: 3 }]', function() {
    it('works', function() {
      const source = Observable.fromArray([
        { n: 1 },
        { n: 2 },
        { n: 1 },
        { n: 3 }
      ]);
      distinct(source, (o: { n: number }): number => o.n)
        .toArray()
        .subscribe(array => {
          assert(array.length === 3);
          const [i1, i2, i3] = array;
          assert.deepEqual(i1, { n: 1 });
          assert.deepEqual(i2, { n: 2 });
          assert.deepEqual(i3, { n: 3 });
        });
    });
  });
});
