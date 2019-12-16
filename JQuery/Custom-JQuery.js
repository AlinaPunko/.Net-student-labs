const $ = (function() {
    const JQuery = function(selector) {
        switch (selector) {
            case 'document':
                this.elements = [document];
                return;
            case 'window':
                this.elements = [window];
                return;
            default:
                this.elements = document.querySelectorAll(selector);
                return;
        }
    };

    const Initialize = function(selector) {
        return new JQuery(selector);
    };

    JQuery.prototype.each = function(callback) {
        if (!callback || !isFunction(callback)) {
            return;
        }
        this.elements.forEach((item, index) => {
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
        const newElement = isString(element) ? element : element();

        this.each((item) => {
            item.insertAdjacentHTML('beforeend', newElement);
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
                    let selectedElement = element.querySelector(selector);
                    element.removeChild(selectedElement);
                });
        }
    }

    JQuery.prototype.attr = function() {
        const attributes = [];
        let argument;
        let attributeName;
        switch (arguments.length) {
            case 1:
                argument = arguments[0];
                if (!isString(argument) && !isObject(argument)) {
                    return;
                }
                switch (typeof argument) {
                    case 'string':
                        attributeName = argument;
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
                attributeName = arguments[0];
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

    JQuery.prototype.children = function() {
        const children = [];
        switch (arguments.length) {
            case 0:
                this.each((element) => {
                    const childrenNodes = element.children;
                    [...childrenNodes].forEach((child) => {
                        children.push(child);
                    })
                });
                return children;
            case 1:
                this.each((element) => {
                    const childrenElements = element.querySelectorAll(arguments[0]);
                    for (const child of childrenElements)
                        children.push(child);
                });
                return children;
        }
    }

    JQuery.prototype.css = function() {
        let argument;
        switch (arguments.length) {
            case 1:
                argument = arguments[0];
                const properties = [];
                if (!isString(argument) && !isObject(argument)) {
                    return;
                }
                switch (typeof argument) {
                    case 'string':
                        const propertyName = argument;
                        this.each((element) => {
                            const styles = getComputedStyle(element);
                            if (styles.hasOwnProperty(propertyName)) {
                                properties.push(styles[propertyName]);
                            }
                        });
                        return properties;
                    case 'object':
                        if (Array.isArray(argument)) {
                            const propertyNames = argument;
                            this.each((element) => {
                                const styles = getComputedStyle(element);

                                propertyNames.forEach((property) => {
                                    if (styles.hasOwnProperty(property)) {
                                        properties.push(styles[property]);
                                    }
                                })
                            });
                            return properties;
                        } else {
                            const propertyObject = argument;

                            this.each((element) => {
                                for (let key in propertyObject) {
                                    addCssStyle(element, key, propertyObject[key]);
                                }
                            });
                        }
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

function addCssStyle(item, propertyName, propertyValue) {
    const styles = item.style;
    if (styles.hasOwnProperty(propertyName)) {
        styles[propertyName] = propertyValue;
    }
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