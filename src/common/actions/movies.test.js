import * as Actions from './movies';

describe('MovieActions', function() {
  describe('queries', function() {
    it('search', function() {
      const result = Actions.queries.search('Hello');
      expect(result).to.contain.all.keys({
        key: '/search/movie?query=Hello',
        endpoint: '/search/movie',
      });

      expect(result.params).to.contain.all.keys({query: 'Hello'});
    });
  });
});
