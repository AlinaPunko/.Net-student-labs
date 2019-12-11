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
        let classes;
        if ((typeof className) == 'string') {
            classes = className.split(' ');
            this.each(function(item) {
                for (let i = 0; i < classes.length; i++) {
                    item.classList.add(classes[i]);
                }
            });
        } else if ((typeof className) == 'function') {
            classes = className().split(' ');
            this.each(function(item) {
                for (let i = 0; i < classes.length; i++) {
                    item.classList.add(classes[i]);
                }
            });
        }
    };

    Constructor.prototype.removeClass = function(className) {
        let classes;
        if ((typeof className) == 'string') {
            classes = className.split(' ');
            this.each(function(item) {
                for (let i = 0; i < classes.length; i++) {
                    item.classList.remove(classes[i]);
                }
            });
        } else if ((typeof className) == 'function') {
            classes = className().split(' ');
            this.each(function(item) {
                for (let i = 0; i < classes.length; i++) {
                    item.classList.remove(classes[i]);
                }
            });
        }
    };

    Constructor.prototype.click = function(callback) {
        alert("click");
        this.each(function(item) {
            item.onclick = callback;
        });
    }

    Constructor.prototype.text = function() {
        // if (arguments.length == 0) {
        //     let result;
        //     this.each(function(item) {
        //         for (var el in item.querySelector(" ")) {
        //             result.push(el.innerHTML);
        //         }
        //     });
        //     return result;
        // } else if (arguments.length == 1) {
        //     if ((typeof arguments[0]) == 'string') {
        //         //alert(typeof className);
        //         this.each(function(item) {
        //             for (var el in item.querySelector('')) {
        //                 el.innerHTML = arguments[0];
        //             }
        //         });
        //     } else if ((typeof arguments[0]) == 'function') {
        //         //alert(typeof className);
        //         this.each(function(item) {
        //             for (var el in item.querySelector('')) {
        //                 el.innerHTML = arguments[0]();
        //             }
        //         });
        //     }
        // }
    }

    Constructor.prototype.append = function(elementName) {
        if (typeof elementName == 'string') {
            this.each(function(item) {
                item.insertAdjacentHTML('beforeend', elementName);
            });
        } else if (typeof elementName == 'function') {
            this.each(function(item) {
                item.insertAdjacentHTML('beforeend', elementName());
            });
        }
    }

    Constructor.prototype.remove = function() {
        const selector = arguments[0];
        if (arguments.length == 0) {
            this.each(function(item) {
                item.remove();
            });
        } else if (arguments.length == 1) {
            this.each(function(item) {
                let elem = document.querySelector(selector);
                item.removeChild(elem);
            });
        }
    }

    Constructor.prototype.attr = function() {
        const attrName = arguments[0];
        const attrValue = arguments[1];
        const attributes = new Array();
        if (arguments.length == 1) {
            if ((typeof attrName) == 'string') {
                this.each(function(item) {
                    attributes.push(item.getAttribute(attrName));
                });
                return attributes;
            } else if ((typeof attrName) == 'object') {
                this.each(function(item) {
                    for (let key in attrName) {
                        if (item.hasAttribute(key))
                            item.setAttribute(key, attrName[key]);
                    }
                });
            }
        } else if (arguments.length == 2) {
            if ((typeof attrValue) == 'function') {
                this.each(function(item) {
                    if (item.hasAttribute(attrName))
                        item.setAttribute(attrName, attrValue());
                });
            } else if ((typeof attrValue) == 'string') {
                this.each(function(item) {
                    if (item.hasAttribute(attrName))
                        item.setAttribute(attrName, attrValue);
                });
            }
        }
    }


    Constructor.prototype.children = function() {
        const children = new Array();
        this.each(function(item) {
            for (let i = 0; i < item.childNodes.length; i++) {
                children.push(item.childNodes[i].nodeName);
            }
        });
        return children;
    }

    Constructor.prototype.css = function() {
        const propName = arguments[0];
        const propValue = arguments[1];
        const properties = new Array();
        let styles;
        if (arguments.length == 1) {
            if ((typeof propName) == 'string') {
                this.each(function(item) {
                    styles = getComputedStyle(item);
                    for (let x in styles) {
                        if (x == propName) {
                            properties.push(styles[x]);
                        }
                    }
                });
                return properties;
            } else if ((typeof propName) == 'object') {
                this.each(function(item) {
                    for (let key in propName) {
                        styles = item.style;
                        for (var x in styles) {
                            if (x == key) {
                                styles[x] = propName[key];
                            }
                        }
                    }
                });
            }
        } else if (arguments.length == 2) {
            if ((typeof propValue) == 'function') {
                this.each(function(item) {
                    styles = item.style;
                    for (var x in styles) {
                        if (x == propName) {
                            styles[x] = propValue();
                        }
                    }
                });
            } else if ((typeof propValue) == 'string') {
                this.each(function(item) {
                    styles = item.style;
                    for (var x in styles) {
                        if (x == propName) {
                            styles[x] = propValue;
                        }
                    }
                });
            }
        }
    }

    Constructor.prototype.empty = function() {
        this.each(function(item) {
            item.innerHTML = '';
        });
    }

    return instantiate;
})();