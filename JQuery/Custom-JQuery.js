let $ = (function() {

    let JQuery = function(selector) {
        if (selector === 'document') {
            this.elems = [document];
        } else if (selector === 'window') {
            this.elems = [window];
        } else {
            this.elems = document.querySelectorAll(selector);
        }
    };

    let instantiate = function(selector) {
        return new JQuery(selector);
    };

    JQuery.prototype.each = function(callback) {
        if (!callback || typeof callback !== 'function')
            return;
        this.elems.forEach((item, index) => {
            callback(item, index);
        })
    };

    let addClassFunction = function(className) {
        let classes;
        if ((typeof className) == "string") {
            classes = className.split(' ');
            this.each((element) => {
                classes.forEach((item) => {
                    addClass(item, element);
                })
            });
        } else if ((typeof className) == "function") {
            classes = className().split(' ');
            each((element) => {
                this.classes.forEach((item) => {
                    addClass(item, element);
                })
            });
        }
    };

    JQuery.prototype.addClass = addClassFunction;

    let removeClassFunction = function(className) {
        let classes;
        if ((typeof className) == 'string') {
            classes = className.split(' ');
            this.each((element) => {
                classes.forEach((item) => {
                    removeClass(item, element);
                })
            });
        } else if ((typeof className) == 'function') {
            classes = className().split(' ');
            this.each((element) => {
                classes.forEach((item) => {
                    removeClass(item, element);
                })
            });
        }
    };

    JQuery.prototype.removeClass = removeClassFunction;

    let clickFunction = function(callback) {
        this.each((item) => {
            item.onclick = callback;
        });
    }
    JQuery.prototype.click = clickFunction;

    let textFunction = function() {
        const value = arguments[0];
        if (arguments.length == 0) {
            let result = new String();
            this.each((element) => {
                const descendants = element.getElementsByTagName('*');
                Array.from(descendants).forEach((item) => {
                    result += String(item.innerHTML + " ");
                });
            });
            return result;
        } else if (arguments.length == 1) {
            if ((typeof value) == 'string') {
                this.each((item) => {
                    item.innerHTML = value;
                });
            } else if ((typeof value) == 'function') {
                this.each((item) => {
                    item.innerHTML = value();
                });
            }
        }
    }

    JQuery.prototype.text = textFunction;

    let appendFunction = function(elementName) {
        if (typeof elementName == 'string') {
            this.each((item) => {
                item.insertAdjacentHTML('beforeend', elementName);
            });
        } else if (typeof elementName == 'function') {
            this.each((item) => {
                item.insertAdjacentHTML('beforeend', elementName());
            });
        }
    }

    JQuery.prototype.append = appendFunction;

    let removeFunction = function() {
        const selector = arguments[0];
        if (arguments.length == 0) {
            this.each((item) => {
                item.remove();
            });
        } else if (arguments.length == 1) {
            this.each((item) => {
                let elem = document.querySelector(selector);
                item.removeChild(elem);
            });
        }
    }

    JQuery.prototype.remove = removeFunction;

    let attrFunction = function() {
        const attrName = arguments[0];
        const attrValue = arguments[1];
        const attributes = new Array();
        if (arguments.length == 1) {
            if ((typeof attrName) == 'string') {
                this.each((item) => {
                    attributes.push(item.getAttribute(attrName));
                });
                return attributes;
            } else if ((typeof attrName) == 'object') {
                this.each((item) => {
                    for (let key in attrName) {
                        if (item.hasAttribute(key))
                            item.setAttribute(key, attrName[key]);
                    }
                });
            }
        } else if (arguments.length == 2) {
            if ((typeof attrValue) == 'function') {
                this.each((item) => {
                    if (item.hasAttribute(attrName))
                        item.setAttribute(attrName, attrValue());
                });
            } else if ((typeof attrValue) == 'string') {
                this.each((item) => {
                    if (item.hasAttribute(attrName))
                        item.setAttribute(attrName, attrValue);
                });
            }
        }
    }

    JQuery.prototype.attr = attrFunction;

    let childrenFunction = function() {
        const children = new Array();
        this.each((item) => {
            const childrenNodes = item.children;
            for (let i = 0; i < childrenNodes.length; i++) {
                children.push(childrenNodes[i]);
            }
        });
        return children;
    }

    JQuery.prototype.children = childrenFunction;

    let cssFunction = function() {
        const propName = arguments[0];
        const propValue = arguments[1];
        const properties = new Array();
        if (arguments.length == 1) {
            if ((typeof propName) == 'string') {
                this.each((item) => {
                    getStyle(item, propName, properties);
                });
                return properties;
            } else if ((typeof propName) == 'object') {
                this.each((item) => {
                    for (let key in propName) {
                        setStyle(item, key, propName[key]);
                    }
                });
            }
        } else if (arguments.length == 2) {
            if ((typeof propValue) == 'function') {
                this.each((item) => {
                    setStyle(item, propName, propValue());
                });
            } else if ((typeof propValue) == 'string') {
                this.each((item) => {
                    setStyle(item, propName, propValue);
                });
            }
        }
    }

    JQuery.prototype.css = cssFunction;

    let emptyFunction = function() {
        this.each(function(item) {
            item.innerHTML = '';
        });
    }

    JQuery.prototype.empty = emptyFunction;

    let wrapFunction = function() {
        const wrappingElementTag = arguments[0];
        if (typeof wrappingElementTag == 'string') {
            this.each((item) => {
                appendAndWrapElement(item, wrappingElementTag);
            });
        } else if (typeof wrappingElement == 'function') {
            this.each((item) => {
                appendAndWrapElement(item, wrappingElementTag());
            });
        }
    }

    JQuery.prototype.wrap = wrapFunction;

    return instantiate;
})();

function appendAndWrapElement(item, wrappingElementTag) {
    item.insertAdjacentHTML('beforebegin', wrappingElementTag);
    let wrappingElement = item.previousElementSibling;
    wrappingElement.appendChild(item);
}

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
    for (let x in styles) {
        if (x == propName) {
            styles[x] = propValue;
        }
    }
}

function removeClass(classes, element) {
    Array.from(classes).forEach((item) => {
        element.classList.remove(item);
    })
}

function addClass(classes, element) {
    Array.from(classes).forEach((item) => {
        element.classList.add(item);
    })
}