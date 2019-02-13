export function promiseGenerator(makeGenerator) {
  return function (...args) {
    const generator = makeGenerator.apply(this, args);

    function handle(result) {
      if (result.done) 
        return Promise.resolve(result.value);

      return Promise.resolve(result.value)
        .then(function(res) {
          return handle(generator.next(res));
        }, function(err) {
          return handle(generator.throw(err));
        })
    }

    try {
      return handle(generator.next())
    } catch (ex) {
      return Promise.reject(ex);
    }
  }
}