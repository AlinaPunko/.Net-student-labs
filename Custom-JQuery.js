var $ = (function() {

    'use strict';
    var Constructor = function(selector) {
        if (selector === 'document') {
            this.elems = [document];
        } else if (selector === 'window') {
            this.elems = [window];
        } else {
            this.elems = document.querySelectorAll(selector);
        }
    };

    var instantiate = function(selector) {
        return new Constructor(selector);
    };
    Constructor.prototype.each = function(callback) {
        if (!callback || typeof callback !== 'function')
            return;
        for (var i = 0; i < this.elems.length; i++) {
            callback(this.elems[i], i);
        }
    };
    Constructor.prototype.addClass = function(className) {
        alert("addClass");
        this.each(function(item) {
            item.classList.add(className);
        });
    };
    Constructor.prototype.removeClass = function(className) {
        alert("removeClass");
        this.each(function(item) {
            item.classList.remove(classname);
        });
    };
    Constructor.prototype.click = function(callback) {
        alert("click");
        this.each(function(item) {
            item.onclick = callback;
        });
    }

    // Constructor.prototype.text = function() {

    // }
    Constructor.prototype.append = function(elementname) {
        this.each(function(item) {
            item.insertAdjacentHTML('beforeend', elementname);
        });
    }
    Constructor.prototype.remove = function() {
        alert('remove');
        this.each(function(item) {
            item.remove();
        });
    }
    Constructor.prototype.attr = function(attrname) {
        alert('attr');
        var attributes = new Array();
        this.each(function(item) {
            if (item.hasAttribute(attrname))
                attributes.push(item.getAttribute(attrname));
        });
        return attributes;
    }
    Constructor.prototype.children = function() {
        alert('children');
        var children = new Array();
        this.each(function(item) {
            for (let i = 0; i < item.childNodes.length; i++) {
                children.push(item.childNodes[i].nodeName);
            }
        });
        return children;
    }

    Constructor.prototype.css = function(property) {
        alert('css');
        var property_values = new Array();
        this.each(function(item) {
            var styles = item.style;
            alert(item.nodeName);
            alert(item.style.color);
            // for (var x in styles) {
            //     alert(property);
            //     if (x == property) {
            //         property_values.push(styles[x]);
            //     }

            // }
        });
        return property_values;
    }

    Constructor.prototype.empty = function() {
        alert('empty');
        this.each(function(item) {
            item.innerHTML = '';
        });

    }

    return instantiate;
})();