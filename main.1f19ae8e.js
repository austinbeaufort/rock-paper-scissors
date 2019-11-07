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
},{}],"src/score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayScore = exports.score = void 0;
var score = {
  user: 0,
  computer: 0
};
exports.score = score;
var displayScore = {
  user: document.querySelector('.user-score'),
  computer: document.querySelector('.computer-score'),
  displayContent: document.querySelector('.display-content')
};
exports.displayScore = displayScore;
},{}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignDisplayScoreVariables = exports.addListenerAndStartGame = void 0;

var _homeOnTheRange = _interopRequireDefault(require("home-on-the-range"));

var _score = require("./score");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addListenerAndStartGame = function addListenerAndStartGame() {
  document.querySelector('.buttons-container').addEventListener('click', function (event) {
    return runTheGame(event);
  });
};

exports.addListenerAndStartGame = addListenerAndStartGame;

var assignDisplayScoreVariables = function assignDisplayScoreVariables() {
  _score.displayScore.user.textContent = _score.score.user;
  _score.displayScore.computer.textContent = _score.score.computer;
}; // FIRES GAME EVENTS AND LOGIC ON CLICK


exports.assignDisplayScoreVariables = assignDisplayScoreVariables;

var runTheGame = function runTheGame(event) {
  var userChoice = '';

  switch (event.target.className) {
    case 'rock':
      userChoice = 'rock';
      break;

    case 'paper':
      userChoice = 'paper';
      break;

    case 'scissors':
      userChoice = 'scissors';
      break;

    default:
      log('error...not a valid option');
  }

  pickWinner(userChoice);
}; // GAME LOGIC


var pickWinner = function pickWinner(userChoice) {
  var computerChoice = _homeOnTheRange.default.randomChoice(['rock', 'paper', 'scissors']);

  if (userChoice === computerChoice) {
    console.log('tie');
    _score.displayScore.displayContent.textContent = "(You: ".concat(userChoice, ") VS (Computer: ").concat(computerChoice, ") >>> It's a tie!!");
  } else if (userChoice === 'rock' && computerChoice === 'paper' || userChoice === 'paper' && computerChoice === 'scissors' || userChoice === 'scissors' && computerChoice === 'rock') {
    _score.score.computer++;
    _score.displayScore.computer.textContent = _score.score.computer;
    _score.displayScore.displayContent.textContent = "(You: ".concat(userChoice, ") VS (Computer: ").concat(computerChoice, ") >>> You lose, try again!");
  } else {
    _score.score.user++;
    _score.displayScore.user.textContent = _score.score.user;
    _score.displayScore.displayContent.textContent = "(You: ".concat(userChoice, ") VS (Computer: ").concat(computerChoice, ") >>> You won! Best of 3??");
  }
};
},{"home-on-the-range":"node_modules/home-on-the-range/index.js","./score":"src/score.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _app = require("./src/app");

var main = function main() {
  (0, _app.addListenerAndStartGame)();
  (0, _app.assignDisplayScoreVariables)();
};

main();
},{"./src/app":"src/app.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56679" + '/');

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