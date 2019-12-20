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

    const initialize = function(selector) {
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
        this.each((element) => {
            element.classList.add(...parseClass(className));
        });
    };

    JQuery.prototype.removeClass = function(className) {
        this.each((element) => {
            element.classList.remove(...parseClass(className));
        });
    };

    JQuery.prototype.click = function(callback) {
        this.each((element) => {
            element.onclick = callback;
        });
    }

    JQuery.prototype.text = function(...params) {
        switch (params.length) {
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
                const text = getStringOrFunctionValue(params[0]);

                this.each((element) => {
                    element.innerHTML = text;
                });
        }
    }

    JQuery.prototype.append = function(element) {
        const newElement = getStringOrFunctionValue(element);

        this.each((element) => {
            element.insertAdjacentHTML('beforeend', newElement);
        });
    }

    JQuery.prototype.remove = function(...params) {
        switch (params.length) {
            case 0:
                this.each((element) => {
                    element.remove();
                });
            case 1:
                const selector = params[0];

                this.each((element) => {

                    const selectedElement = element.querySelector(selector);
                    element.removeChild(selectedElement);
                });
        }
    }

    JQuery.prototype.attr = function(...params) {      
        switch (params.length) {
            case 1:
                const firstParameter = params[0]; 
                const attributes = [];

                if (!isString(firstParameter) && !isObject(firstParameter)) {
                    return;
                }

                if (isString(firstParameter))
                {
                    let attributeName=firstParameter; 
                     
                    this.each((element) => {
                        attributes.push(element.getAttribute(attributeName));
                    });
                    return attributes;
                }

                const attributesDictionary = firstParameter;

                this.each((element) => {
                    for (const key in attributesDictionary) {
                        element.setAttribute(key, attributesDictionary[key]);
                    }
                });
                break;

            case 2:
                const attributeValue = getStringOrFunctionValue(params[1]);

                this.each((element) => {
                    element.setAttribute(attributeName, attributeValue);
                });
        }
    }

    JQuery.prototype.children = function(...params) {
        switch (params.length) {
            case 0:
                const children = [];

                this.each((element) => {
                    const childrenNodes = element.children;

                    children.push([...childrenNodes]);
                });
                return children;
            case 1:
                const childrenArray = [];

                this.each((element) => {

                    const childrenElements = element.querySelectorAll(params[0]);

                    for (const child of childrenElements)
                        childrenArray.push(child);
                });
                return childrenArray;
        }
    }

    JQuery.prototype.css = function(...params) {
        switch (params.length) {
            case 1:
                const element=this.elements[0];
                const firstParameter = params[0];
                const properties = [];

                if (!isString(firstParameter) && !isObject(firstParameter)) {
                    return;
                }
                if(isString(firstParameter))
                {
                    const styleName=firstParameter;
                    return getStyleValue(element, styleName);
                }

                if (Array.isArray(firstParameter)) {
                    const styleNames=firstParameter;
                    return getStylesValues(element, styleNames);
                }
                else {
                    const stylesDictionary = firstParameter;
                    addStyles(element, stylesDictionary);
                }
                break;

            case 2:
                const styleName = params[0];
                const styleValue = getStringOrFunctionValue(params[1]);

                addCssStyle(element, styleName, styleValue);
        }
    }

    JQuery.prototype.empty = function() {
        this.each((element) => {
            while (element.hasChildNodes()) {
                element.removeChild(element.childNodes[0]);
            }
        })
    }

    JQuery.prototype.wrap = function(elementTag) {
        const wrappingElementTag = getStringOrFunctionValue(elementTag);

        this.each((element) => {
            appendAndWrapElement(element, wrappingElementTag);
        });
    }

    return initialize;

})();

function addStyles(element, stylesDictionary) {
    for (let key in stylesDictionary) {
        addCssStyle(element, key, stylesDictionary[key]);
    }
}

function getStylesValues(element, styleNames) {
    let stylesValues=[];
    const styles = getComputedStyle(element);

    styleNames.forEach((styleName) => {
        stylesValues.push(styles[styleName]);
    });
    return stylesValues;
}

function getStyleValue(element, propertyName) {
    const styles = getComputedStyle(element);
    return styles[propertyName];
}

function appendAndWrapElement(item, wrappingElementTag) {
    item.insertAdjacentHTML('beforebegin', wrappingElementTag);
    let wrappingElement = item.previousElementSibling;
    wrappingElement.appendChild(item);
}

function setAttribute(attributeName, attributeValue) {
    this.setAttribute(attributeName, attributeValue);
}

function addCssStyle(element, styleName, styleValue) {
    const styles = element.style;   
    styles[styleName] = styleValue;
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

function getStringOrFunctionValue(value){
    if (!isString(value) && !isFunction(value)) {
        return;
    }

    return newValue = isString(value) ? value : value();
}

function parseClass(value){
    return getStringOrFunctionValue(value).split(' ');
}