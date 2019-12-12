Constructor.prototype.each = function(callback) {
    if (!callback || typeof callback !== 'function')
        return;
    this.elems.forEach(function(item, index) {
        callback(item, index);
    })
};