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

    // Constructor.prototype.each = function(callback) {
    //     if (!callback || typeof callback !== 'function')
    //         return;
    //     this.elems.forEach(function(item, index) {
    //         callback(item, index);
    //     })
    // };
    var addClassFunction = function(className) {
        let classes;
        if ((typeof className) == "string") {
            classes = className.split(' ');
            this.each(function(element) {
                classes.forEach(function(item) {
                    addClass(item, element);
                })
            });
        } else if ((typeof className) == "function") {
            classes = className().split(' ');
            each(function(element) {
                this.classes.forEach(function(item) {
                    addClass(item, element);
                })
            });
        }
    };

    Constructor.prototype.addClass = addClassFunction;


    var removeClassFunction = function(className) {
        let classes;
        if ((typeof className) == 'string') {
            classes = className.split(' ');
            this.each(function(element) {
                classes.forEach(function(item) {
                    removeClass(item, element);
                })
            });
        } else if ((typeof className) == 'function') {
            classes = className().split(' ');
            this.each(function(element) {
                classes.forEach(function(item) {
                    removeClass(item, element);
                })
            });
        }
    };

    Constructor.prototype.removeClass = removeClassFunction;

    var clickFunction = function(callback) {
        this.each(function(item) {
            item.onclick = callback;
        });
    }
    Constructor.prototype.click = clickFunction;

    var textFunction = function() {
        const value = arguments[0];
        if (arguments.length == 0) {
            let result = new String();
            this.each(function(item) {
                const descendants = item.getElementsByTagName('*');
                for (let i = 0; i < descendants.length; i++) {
                    result += String(descendants[i].innerHTML + " ");
                }
            });
            return result;
        } else if (arguments.length == 1) {
            if ((typeof value) == 'string') {
                this.each(function(item) {
                    item.innerHTML = value;
                });
            } else if ((typeof value) == 'function') {
                this.each(function(item) {
                    item.innerHTML = value();
                });
            }
        }
    }

    Constructor.prototype.text = textFunction;

    var appendFunction = function(elementName) {
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

    Constructor.prototype.append = appendFunction;

    var removeFunction = function() {
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

    Constructor.prototype.remove = removeFunction;

    var attrFunction = function() {
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

    Constructor.prototype.attr = attrFunction;

    var childrenFunction = function() {
        const children = new Array();
        this.each(function(item) {
            const childrenNodes = item.children;
            for (let i = 0; i < childrenNodes.length; i++) {
                children.push(childrenNodes[i]);
            }
        });
        return children;
    }
    Constructor.prototype.children = childrenFunction;
    var cssFunction = function() {
        const propName = arguments[0];
        const propValue = arguments[1];
        const properties = new Array();
        if (arguments.length == 1) {
            if ((typeof propName) == 'string') {
                this.each(function(item) {
                    getStyle(item, propName, properties);
                });
                return properties;
            } else if ((typeof propName) == 'object') {
                this.each(function(item) {
                    for (let key in propName) {
                        setStyle(item, key, propName[key]);
                    }
                });
            }
        } else if (arguments.length == 2) {
            if ((typeof propValue) == 'function') {
                this.each(function(item) {
                    setStyle(item, propName, propValue());
                });
            } else if ((typeof propValue) == 'string') {
                this.each(function(item) {
                    setStyle(item, propName, propValue);
                });
            }
        }
    }
    Constructor.prototype.css = cssFunction;
    var emptyFunction = function() {
        this.each(function(item) {
            item.innerHTML = '';
        });
    }
    Constructor.prototype.empty = emptyFunction;

    return instantiate;
})();


function getStyle(item, propName, properties) {
    const styles = getComputedStyle(item);
    for (let x in styles) {
        if (x == propName) {
            properties.push(styles[x]);
        }
    }
}

function setStyle(item, propName, propValue) {
    let styles = item.style;
    for (var x in styles) {
        if (x == propName) {
            styles[x] = propValue;
        }
    }
}

function removeClass(classes, element) {
    classes.forEach((item) => {
        element.classList.remove(item);
    })
}

function addClass(classes, element) {
    classes.forEach((item) => {
        element.classList.add(item);
    })
}