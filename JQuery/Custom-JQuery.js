let $ = (function() {
    let JQuery = function(selector) {
        switch (selector) {
            case 'document':
                this.elememts = [document];
                return;
            case 'window':
                this.elememts = [window];
                return;
            default:
                this.elememts = document.querySelectorAll(selector);
                return;
        }
    };

    let Initialize = function(selector) {
        return new JQuery(selector);
    };

    JQuery.prototype.each = function(callback) {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        this.elememts.forEach((item, index) => {
            callback(item, index);
        })
    };

    JQuery.prototype.addClass = function(className) {
        if (!isString(className) && !isFunction(className)) {
            return;
        }

        const classes = isString(className) ? className.split(' ') : className().split(' ');

        this.each((element) => {
            element.classList.add(...classes);
        });
    };

    JQuery.prototype.removeClass = function(className) {
        if (!isString(className) && !isFunction(className)) {
            return;
        }

        const classes = isString(className) ? className.split(' ') : className().split(' ');

        this.each((element) => {
            element.classList.remove(...classes);
        });
    };

    JQuery.prototype.click = function(callback) {
        this.each((element) => {
            element.onclick = callback;
        });
    }

    JQuery.prototype.text = function() {
        const argument = arguments[0];
        switch (arguments.length) {
            case 0:
                let result = '';
                this.each((element) => {
                    const descendants = element.getElementsByTagName('*');

                    [...descendants].forEach((element) => {
                        result += `${element.innerHTML} `;
                    });
                });
                return result;

            case 1:
                if (!isString(argument) && !isFunction(argument)) {
                    return;
                }

                const text = isString(argument) ? argument : argument();

                this.each((element) => {
                    element.innerHTML = text;
                });

        }
    }

    JQuery.prototype.append = function(element) {
        if (!isString(element) && !isFunction(element)) {
            return;
        }

        const text = isString(element) ? element : element();

        this.each((item) => {
            item.insertAdjacentHTML('beforeend', text);
        });
    }

    JQuery.prototype.remove = function() {
        switch (arguments.length) {
            case 0:
                this.each((element) => {
                    element.remove();
                });
            case 1:
                const selector = arguments[0];

                this.each((element) => {
                    let elem = element.querySelector(selector);
                    element.removeChild(elem);
                });
        }
    }

    JQuery.prototype.attr = function() {
            const attributes = [];
            let argument;
            switch (arguments.length) {
                case 1:
                    argument = arguments[0];
                    if (!isString(argument) && !isObject(argument)) {
                        return;
                    }
                    switch (typeof argument) {
                        case 'string':
                            const attributeName = argument;
                            this.each((element) => {
                                attributes.push(element.getAttribute(attributeName));
                            });
                            return attributes;

                        case 'object':
                            const attributesObject = argument;
                            this.each((element) => {
                                for (const key in attributesObject) {
                                    element.setAttribute(key, attributesObject[key]);
                                }
                            });
                    }
                case 2:
                    const attributeName = arguments[0];
                    argument = arguments[1];
                    if (!isString(argument) && !isFunction(argument)) {
                        return;
                    }

                    const attributeValue = isString(argument) ? argument : argument();
                    this.each((element) => {
                        element.setAttribute(attributeName, attributeValue);
                    });
            }
        }
        //add parameter
    JQuery.prototype.children = function() {
        const children = [];

        this.each((element) => {
            const childrenNodes = element.children;
            [...childrenNodes].forEach((child) => {
                children.push(child);
            })
        });
        return children;
    }

    //add array parameter
    JQuery.prototype.css = function() {

        let argument;
        switch (arguments.length) {
            case 1:
                argument = arguments[0];
                if (!isString(argument) && !isObject(argument)) {
                    return;
                }

                const properties = [];

                switch (typeof argument) {
                    case 'string':
                        const propertyName = argument;
                        this.each((element) => {
                            const styles = getComputedStyle(element);
                            properties.push(styles[propertyName]);
                        });
                        return properties;

                    case 'object':
                        const propertyObject = argument;
                        this.each((element) => {
                            for (let key in propertyObject) {
                                addCssStyle(element, key, propertyObject[key]);
                            }
                        });
                }
            case 2:
                const propertyName = arguments[0];
                argument = arguments[1];
                if (!isString(argument) && !isFunction(argument)) {
                    return;
                }

                const propertyValue = isString(argument) ? argument : argument();
                this.each((element) => {
                    addCssStyle(element, propertyName, propertyValue);
                });
        }
    }


    JQuery.prototype.empty = function() {
        this.each((element) => {
            while (element.hasChildNodes()) {
                element.removeChild(element.childNodes[0]);
            }
        })
    }

    JQuery.prototype.wrap = function() {
        const ElementTag = arguments[0];
        if (!isString(ElementTag) && !isFunction(ElementTag)) {
            return;
        }

        const wrappingElementTag = isString(ElementTag) ? ElementTag : ElementTag();

        this.each((element) => {
            appendAndWrapElement(element, wrappingElementTag);
        });
    }

    //don't check
    JQuery.prototype.toggle = function() {
        if (!arguments.length) {
            this.each((element) => {
                element.setAttribute('display', window.getComputedStyle(element).display)

                if (window.getComputedStyle(item).display == 'none')
                    element.style.display = item.getAttribute('display');
                else if (item.getAttribute('display') == 'none')
                    element.style.display = "initial";
                else if (item.getAttribute('display') != 'none')
                    element.style.display = "none";
            });
        } else if (arguments.length == 1 && typeof arguments[0] == 'boolean') {
            const flag = arguments[0];

            this.each((element) => {
                if (flag == true)
                    element.style.visibility = "visible";
                else element.style.visibility = "hidden";
            });
        }
    }
    return Initialize;

})();

function appendAndWrapElement(item, wrappingElementTag) {
    item.insertAdjacentHTML('beforebegin', wrappingElementTag);
    let wrappingElement = item.previousElementSibling;
    wrappingElement.appendChild(item);
}

function setAttribute(attributeName, attributeValue) {
    if (this.hasAttribute(attributeName))
        this.setAttribute(attributeName, attributeValue);
}

function addCssStyle(item, propName, propValue) {
    let styles = item.style;
    styles[propName] = propValue;
}

function isString(value) {
    return typeof value === 'string' ? true : false;
}

function isObject(value) {
    return typeof value === 'object' ? true : false;
}

function isFunction(value) {
    return typeof value === 'function' ? true : false;
}