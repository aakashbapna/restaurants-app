var state = {

};


module.exports = {
  set:function(key, value) {
    state[key] = value;
  },
  get:function(key) {
    return state[key];
  }
}
