

 class Util{

   /**
    * Get one element by selector
    * @param selector {String}
    * @returns {Element}
    */
   static one(selector) {
     return document.querySelector(selector);
   }

   /**
    * Get all elements that match a selector as an array
    * @param selector {String}
    * @returns {Array<Element>}
    */
   static all(selector) {
     return Array.from(document.querySelectorAll(selector));
   }

   /**
	 * Create an element and set a bunch of attributes on it
	 * @param tag {String}
	 * @param attributes {Object}
	 * @returns {Element}
	 */
	static create(tag, attributes) {
		var element = document.createElement(tag);

		for (var name in attributes) {
			element.setAttribute(name, attributes[name]);
		}

		return element;
	}

   /**
  * Set multiple event listeners on an element
  */
 static events(target, events, callback) {
   if (callback) {
     events.split(/\s+/).forEach(name => target.addEventListener(name, callback));
   }
   else { // Multiple events and callbacks
     for (var name in events) {
       Util.events(target, name, events[name]);
     }
   }
 }


   /*
  Remove all children of an element
  */
  static removeAllChildren(elt) {
      if(elt == null){
          return;
      }
    while (elt.hasChildNodes()) {
      Util.clear(elt.firstChild);
    }
  }
  /*
  helper method to clear first child recursively
  */
  static clear(elt) {
    while (elt.hasChildNodes()) {
      clear(elt.firstChild);
    }
    elt.parentNode.removeChild(elt);
  }

 }
