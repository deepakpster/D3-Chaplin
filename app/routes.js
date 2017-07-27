// Application routes.
module.exports = function(match) {
  match('', 'home#index');
  match('line', 'line#index');
};
