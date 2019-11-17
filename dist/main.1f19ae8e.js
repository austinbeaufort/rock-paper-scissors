// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/home-on-the-range/index.js":[function(require,module,exports) {
const h = {
    range: function(firstNumber, secondNumber) {
 
        if (firstNumber < 0 && secondNumber === undefined) {
            secondNumber = 0;
            return makeArray(firstNumber, secondNumber);
        } 
        
        else if (secondNumber === undefined) {
            secondNumber = firstNumber;
            firstNumber = 0;
            return makeArray(firstNumber, secondNumber);
        } 
        
        else if (firstNumber <= secondNumber) {
            return makeArray(firstNumber, secondNumber);
        } 
        
        else if (firstNumber >= secondNumber) {
            return makeReverseArray(firstNumber, secondNumber);
        }
    
        return rangeArray;
    },
    
    // adds strings and numbers
    add: function(...numbers) {
        let numbersFlattened = numbers.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

        let numbersToBeSummed = numbersFlattened.map((item) => Number(item));
        
    
        let sum = numbersToBeSummed.reduce((accumulator, currentValue) => accumulator + currentValue);
        return sum;
    },
    
    // complete array flatten
    deep: function(...arrays) {
        let levelArray = [];
        for (let i = 0; i < arrays.length; i++) {
            if(!Array.isArray(arrays[i])) {
                levelArray.push(arrays[i]);
                continue;
            }
            let newArray = arrays[i].flat(Infinity);
            levelArray.push(newArray);
        }
        let flatArray = levelArray.flat();
        return flatArray;
    },

    // 
    createFibArray: function(numToReach) {
        let firstNum = BigInt(1);
        let secondNum = BigInt(1);
        let total = 0;
        let fibArray = [];
        let count = 0;
        fibArray.push(BigInt(total));
        fibArray.push(firstNum);
        fibArray.push(secondNum);
        while(true) {
            total = BigInt(firstNum + secondNum);
            if (count < numToReach) {
                fibArray.push(total);
                firstNum = BigInt(secondNum);
                secondNum = BigInt(total);
                count++;
            }
            else {
                break;
            }
        }
        return fibArray;
    },
    getPrimeFactors: function(number) {
        let primeArray = [];
        let i = 2;
        while(i < 1000000) {
            if (number % i === 0) {
                primeArray.push(i);
                number /= i;
                i = 2;
            }
            else {
                i++;
            }
        }
        return primeArray;
    },

    findLargestPrimeFactor: function(number) {
        let primeArray = this.getPrimeFactors(number);
        let largestPrime = Math.max(...primeArray);
        return largestPrime;
    },

    findSmallestPrimeFactor: function(number) {
        let primeArray = this.getPrimeFactors(number);
        let smallestPrime = Math.min(...primeArray);
        return smallestPrime;
    },

    numIsPalindrome: function(number) {
        let newNumber = String(number).split('');
        let numToCheck = Math.floor(newNumber.length / 2);
        for (let i = 0; i <= numToCheck; i++) {
            if (newNumber[i] == newNumber[newNumber.length - i - 1]) {
                if (i == numToCheck) {
                    return true;
                }
                continue;
            }
            break;
        }
        return false;
    },

    findLCM: function(...args) {
        let newArray = this.deep(args);
        let numArray = newArray.map(item => Number(item));
        let found = false;
        let answer = 2;
        while (found === false) {
            found = numArray.every(item => {
                return answer % item === 0;
            });
            if (found === true) return answer;
            answer++;
        }
        return answer;
    },

    findNthPrime: function(number) {
        let count = 0;
        let rangeArray = h.range(2, 50000000);
        for (let item of rangeArray) {
            let isPrime = true;
            for (i = 2; i <= Math.sqrt(item); i++){
                if(item % i === 0 && item != i){
                   isPrime = false;
                }
             }
            if (isPrime === true) {
                count++;
                if (count === number) {
                    return item;
                }
            }
        }
        return primeArray;
    },

    getPrimeArray: function(...args) {
        let primeArray = [];
        if (args.length === 1) {
            args[1] = args[0];
            args[0] = 2;
        }
        let rangeArray = h.range(args[0], args[1]);
        for (let item of rangeArray) {
            let isPrime = true;
            for (i = 2; i <= Math.sqrt(item); i++){
                if(item % i === 0 && item != i){
                   isPrime = false;
                }
             }
            if (isPrime === true) {
                primeArray.push(item);
            }
        }
        return primeArray;
    },

    isPrime: function(number) {
        for (i = 2; i <= Math.sqrt(number); i++){
            if(number % i === 0 && number != i){
                return false;
            }
        }
        return true;
    },

    shuffle: function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    count: function(arr, item) {
        let count = 0;

        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === item) {
                count += 1;
            }
        }
        return count;
    },
    removeDuplicates: function(arr) {
        let uniques = [];
        for (item of arr) {
            if(uniques.indexOf(item) === -1) {
                uniques.push(item);
            }
        }
        return uniques;
    },
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomChoice: function(array) {
        let chosenInt = Math.floor(Math.random() * array.length);
        return array[chosenInt];
    },
    getPythagoreanTriples: function(num) {
        let triplesArray = [];
        for (let i = 2; i < num; i++) {
            for (let j = i; j < num; j++) {
                for (let k = j; k < num; k++) {
                    if((i**2) + (j**2) == (k**2)) {
                        triplesArray.push([i, j, k]);
                    }
                }
            }
        } 
        return triplesArray;
    },
    addDigitsOfLargeNumber: function(largeNumber) {
        let newLargeNumber = String(BigInt(largeNumber));
        let numArray = newLargeNumber.split('');
        let answer = h.add(numArray);
        return answer;
    }
}





// Helper functions

// Range helper -------------------------------------------------------------------------------
function makeArray (firstNumber, secondNumber) {
    let rangeArray = [];
    for (let i = firstNumber; i <= secondNumber; i++) {
        rangeArray.push(i);
    }   
    return rangeArray;
}

function makeReverseArray(firstNumber, secondNumber) {
    let rangeArray = [];
    for (let i = firstNumber; i >= secondNumber; i--) {
        rangeArray.push(i);
    }
    return rangeArray;
}
// ------------------------------------------------------------------------------------------



module.exports = h;
},{}],"src/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display_content = exports.score = void 0;
var score = {
  user: 0,
  computer: 0
};
exports.score = score;
var display_content = {
  user: document.querySelector('.user-score'),
  computer: document.querySelector('.computer-score'),
  board_display: document.querySelector('.display-content')
};
exports.display_content = display_content;
},{}],"src/display.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Display =
/*#__PURE__*/
function () {
  function Display() {
    _classCallCheck(this, Display);
  }

  _createClass(Display, [{
    key: "assign_display_score_variables",
    value: function assign_display_score_variables() {
      _model.display_content.user.textContent = _model.score.user;
      _model.display_content.computer.textContent = _model.score.computer;
    }
  }, {
    key: "update_computer_score",
    value: function update_computer_score() {
      _model.score.computer++;
      _model.display_content.computer.textContent = _model.score.computer;
    }
  }, {
    key: "update_user_score",
    value: function update_user_score() {
      _model.score.user++;
      _model.display_content.user.textContent = _model.score.user;
    }
  }, {
    key: "set_board_display_to_tie",
    value: function set_board_display_to_tie(user_choice, computer_choice) {
      _model.display_content.board_display.textContent = "(You: ".concat(user_choice, ") VS (Computer: ").concat(computer_choice, ") >>> It's a tie!!");
    }
  }, {
    key: "set_board_display_to_loss",
    value: function set_board_display_to_loss(user_choice, computer_choice) {
      _model.display_content.board_display.textContent = "(You: ".concat(user_choice, ") VS (Computer: ").concat(computer_choice, ") >>> You lose, try again!");
    }
  }, {
    key: "set_board_display_to_win",
    value: function set_board_display_to_win(user_choice, computer_choice) {
      _model.display_content.board_display.textContent = "(You: ".concat(user_choice, ") VS (Computer: ").concat(computer_choice, ") >>> You won! Best of 3??");
    }
  }]);

  return Display;
}();

var display = new Display();
var _default = display;
exports.default = _default;
},{"./model":"src/model.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run_game_logic = run_game_logic;

var _homeOnTheRange = require("home-on-the-range");

var _display = _interopRequireDefault(require("./display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FIRES GAME EVENTS AND LOGIC ON CLICK
function run_game_logic(event) {
  var user_choice = assign_user_choice(event.target.className);
  var computer_choice = (0, _homeOnTheRange.randomChoice)(['rock', 'paper', 'scissors']);
  var computer_wins = check_if_computer_wins(user_choice, computer_choice);
  var tie = check_if_tie(user_choice, computer_choice);
  update_score_and_display(user_choice, computer_choice, tie, computer_wins);
} // ----------------------------------------------------------------------------------------


function assign_user_choice(button_clicked) {
  var user_choice = '';
  if (button_clicked === 'rock') user_choice = 'rock';
  if (button_clicked === 'paper') user_choice = 'paper';
  if (button_clicked === 'scissors') user_choice = 'scissors';
  return user_choice;
}

function check_if_computer_wins(user_choice, computer_choice) {
  var computer_wins = false;

  if (user_choice === 'rock' && computer_choice === 'paper' || user_choice === 'paper' && computer_choice === 'scissors' || user_choice === 'scissors' && computer_choice === 'rock') {
    computer_wins = true;
  }

  return computer_wins;
}

function check_if_tie(user_choice, computer_choice) {
  var tie = false;
  if (user_choice === computer_choice) tie = true;
  return tie;
}

function update_score_and_display(user_choice, computer_choice, tie, computer_wins) {
  if (tie) {
    _display.default.set_board_display_to_tie(user_choice, computer_choice);
  } else if (computer_wins) {
    _display.default.update_computer_score();

    _display.default.set_board_display_to_loss(user_choice, computer_choice);
  } else {
    _display.default.update_user_score();

    _display.default.set_board_display_to_win(user_choice, computer_choice);
  }
}
},{"home-on-the-range":"node_modules/home-on-the-range/index.js","./display":"src/display.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _app = require("./src/app");

var _display = require("./src/display");

var main = function main() {
  add_listener_and_start_game();

  _display.display.assign_display_score_variables();
};

main(); // ------------------------------------------------------------------------

function add_listener_and_start_game() {
  document.querySelector('.buttons-container').addEventListener('click', function (event) {
    return (0, _app.run_game_logic)(event);
  });
}
},{"./src/app":"src/app.js","./src/display":"src/display.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55129" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map