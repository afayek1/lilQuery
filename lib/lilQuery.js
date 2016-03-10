/*!
 * lilQuery
 * Understanding how how jQuery works. Some methods are shortened to better emphasize the explanation but I encourage you to explore the jQuery source code:
 https://code.jquery.com/jquery-2.2.1.js

 * Hope this helps!!
 */
(function(window, undefined) {
    /*
    Create a lilQuery object using lilQuery.prototype.init as a constructor. Everytime we do something like lilQuery('.klass') we create a new object.

    NOTE: lilQuery.fn is an alias for lilQuery.prototype since I presume it is shorter and easier to type.
    */
    var lilQuery = function(selector, context) {
      var lilQueryObj = new lilQuery.fn.init(selector, context);
      return lilQueryObj;
    }

    /*
    Create an alias for lilQuery.prototype.
    */
    lilQuery.fn = lilQuery.prototype = {
      /*
      The init method handles the arguments passed when creating a lilQuery object, i.e. lilQuery('.klass'), and assigns properties to this, the lilQuery object. There is nothing special about the name 'init'. You could call this method anything, though 'init' is commonly used.

      Check out this link for more on what init does and the rest of jQuery source organized in a coherent way:
      http://davestewart.io/resources/javascript/deconstructed/jquery/#init
      */
      init: function (selector, context) {
        // Handle $(""), $(null), or $(undefined)
        if (!selector) {
          return this;
        }

        // Handle $(DOMElement)
        if (selector.nodeType) {
          debugger;
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        }

        // Handle $('#eyed'), $('.klass'), $('a')
        if (selector) {
          if (selector[0] === "#") {
            var id = selector.slice(1);
            this.context = this[0] = document.getElementById(id);
          } else if (selector[0] === ".") {
            var klass = selector.slice(1);
            this.context = this[0] = document.getElementsByClassName(klass);
          } else {
            this.context = this[0] = document.getElementsByTagName(selector);
          }
          return this;
        }
      },

      /*
      Properties of our lilQuery object are stored and used by other methods, like html below.
      */
      selector: "",
      length: 0,

      html: function(content) {
        if (content) {
          this[0].innerHTML = content
        } else {
          return this[0].innerHTML
        }
      }
    }

    /*
    When we use lilQuery.fn.init as a constructor, it needs to inherit the rest of the functions defined in its scope, so we assign its prototype, lilQuery.fn.init, to be the prototype its contained in, lilQuery.fn.

    The code below could also be written as:
    lilQuery.prototype.init.prototype = lilQuery.prototype
    */
    lilQuery.fn.init.prototype = lilQuery.fn;

    // Expose lilQuery to the global object
    window.lilQuery = window.$ = lilQuery;

    return lilQuery;
})(window);