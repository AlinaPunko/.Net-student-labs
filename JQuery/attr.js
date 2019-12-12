export function attrFunction() {
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