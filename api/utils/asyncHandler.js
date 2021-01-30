/**
 * A function that returns the 'RequestHandler' to catch any possible errors in any 'await' situation.
 * Simply wrap any functions around this, and it will catch any possible errors without the need of 'try/catch'.
 *
 * Background:
 * Returns an anonymous function that is assigned to other functions.
 * Using the concept of Closures.
 * Remember, when there is an error in an async function, next will be filled with Express Error.
 * This so-called 'Express Error' is a promise. It will be caught, then processed on this '.catch' Promise function.
 * 'Fn' contains the req, res, next variable, but we are unable to use it without Closures.
 * The reason we call 'return' is because we only want the function to execute when it has the exact same parameters.
 * Hence, that's why we passed 'req, res, next' variable into the anonymous function.
 *
 * @param {fn} fn - An asynchronous function to be wrapped in.
 * @return void.
 */
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
