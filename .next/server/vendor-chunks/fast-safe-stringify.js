/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/fast-safe-stringify";
exports.ids = ["vendor-chunks/fast-safe-stringify"];
exports.modules = {

/***/ "(ssr)/./node_modules/fast-safe-stringify/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fast-safe-stringify/index.js ***!
  \***************************************************/
/***/ ((module) => {

eval("module.exports = stringify\nstringify.default = stringify\nstringify.stable = deterministicStringify\nstringify.stableStringify = deterministicStringify\n\nvar LIMIT_REPLACE_NODE = '[...]'\nvar CIRCULAR_REPLACE_NODE = '[Circular]'\n\nvar arr = []\nvar replacerStack = []\n\nfunction defaultOptions () {\n  return {\n    depthLimit: Number.MAX_SAFE_INTEGER,\n    edgesLimit: Number.MAX_SAFE_INTEGER\n  }\n}\n\n// Regular stringify\nfunction stringify (obj, replacer, spacer, options) {\n  if (typeof options === 'undefined') {\n    options = defaultOptions()\n  }\n\n  decirc(obj, '', 0, [], undefined, 0, options)\n  var res\n  try {\n    if (replacerStack.length === 0) {\n      res = JSON.stringify(obj, replacer, spacer)\n    } else {\n      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)\n    }\n  } catch (_) {\n    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')\n  } finally {\n    while (arr.length !== 0) {\n      var part = arr.pop()\n      if (part.length === 4) {\n        Object.defineProperty(part[0], part[1], part[3])\n      } else {\n        part[0][part[1]] = part[2]\n      }\n    }\n  }\n  return res\n}\n\nfunction setReplace (replace, val, k, parent) {\n  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)\n  if (propertyDescriptor.get !== undefined) {\n    if (propertyDescriptor.configurable) {\n      Object.defineProperty(parent, k, { value: replace })\n      arr.push([parent, k, val, propertyDescriptor])\n    } else {\n      replacerStack.push([val, k, replace])\n    }\n  } else {\n    parent[k] = replace\n    arr.push([parent, k, val])\n  }\n}\n\nfunction decirc (val, k, edgeIndex, stack, parent, depth, options) {\n  depth += 1\n  var i\n  if (typeof val === 'object' && val !== null) {\n    for (i = 0; i < stack.length; i++) {\n      if (stack[i] === val) {\n        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)\n        return\n      }\n    }\n\n    if (\n      typeof options.depthLimit !== 'undefined' &&\n      depth > options.depthLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    if (\n      typeof options.edgesLimit !== 'undefined' &&\n      edgeIndex + 1 > options.edgesLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    stack.push(val)\n    // Optimize for Arrays. Big arrays could kill the performance otherwise!\n    if (Array.isArray(val)) {\n      for (i = 0; i < val.length; i++) {\n        decirc(val[i], i, i, stack, val, depth, options)\n      }\n    } else {\n      var keys = Object.keys(val)\n      for (i = 0; i < keys.length; i++) {\n        var key = keys[i]\n        decirc(val[key], key, i, stack, val, depth, options)\n      }\n    }\n    stack.pop()\n  }\n}\n\n// Stable-stringify\nfunction compareFunction (a, b) {\n  if (a < b) {\n    return -1\n  }\n  if (a > b) {\n    return 1\n  }\n  return 0\n}\n\nfunction deterministicStringify (obj, replacer, spacer, options) {\n  if (typeof options === 'undefined') {\n    options = defaultOptions()\n  }\n\n  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj\n  var res\n  try {\n    if (replacerStack.length === 0) {\n      res = JSON.stringify(tmp, replacer, spacer)\n    } else {\n      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)\n    }\n  } catch (_) {\n    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')\n  } finally {\n    // Ensure that we restore the object as it was.\n    while (arr.length !== 0) {\n      var part = arr.pop()\n      if (part.length === 4) {\n        Object.defineProperty(part[0], part[1], part[3])\n      } else {\n        part[0][part[1]] = part[2]\n      }\n    }\n  }\n  return res\n}\n\nfunction deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {\n  depth += 1\n  var i\n  if (typeof val === 'object' && val !== null) {\n    for (i = 0; i < stack.length; i++) {\n      if (stack[i] === val) {\n        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)\n        return\n      }\n    }\n    try {\n      if (typeof val.toJSON === 'function') {\n        return\n      }\n    } catch (_) {\n      return\n    }\n\n    if (\n      typeof options.depthLimit !== 'undefined' &&\n      depth > options.depthLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    if (\n      typeof options.edgesLimit !== 'undefined' &&\n      edgeIndex + 1 > options.edgesLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    stack.push(val)\n    // Optimize for Arrays. Big arrays could kill the performance otherwise!\n    if (Array.isArray(val)) {\n      for (i = 0; i < val.length; i++) {\n        deterministicDecirc(val[i], i, i, stack, val, depth, options)\n      }\n    } else {\n      // Create a temporary object in the required way\n      var tmp = {}\n      var keys = Object.keys(val).sort(compareFunction)\n      for (i = 0; i < keys.length; i++) {\n        var key = keys[i]\n        deterministicDecirc(val[key], key, i, stack, val, depth, options)\n        tmp[key] = val[key]\n      }\n      if (typeof parent !== 'undefined') {\n        arr.push([parent, k, val])\n        parent[k] = tmp\n      } else {\n        return tmp\n      }\n    }\n    stack.pop()\n  }\n}\n\n// wraps replacer function to handle values we couldn't replace\n// and mark them as replaced value\nfunction replaceGetterValues (replacer) {\n  replacer =\n    typeof replacer !== 'undefined'\n      ? replacer\n      : function (k, v) {\n        return v\n      }\n  return function (key, val) {\n    if (replacerStack.length > 0) {\n      for (var i = 0; i < replacerStack.length; i++) {\n        var part = replacerStack[i]\n        if (part[1] === key && part[0] === val) {\n          val = part[2]\n          replacerStack.splice(i, 1)\n          break\n        }\n      }\n    }\n    return replacer.call(this, key, val)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmFzdC1zYWZlLXN0cmluZ2lmeS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxnQkFBZ0I7QUFDekQ7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMEJBQTBCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcc2FjaGFcXFRlc3RcXGV0aGdsXFxub2RlX21vZHVsZXNcXGZhc3Qtc2FmZS1zdHJpbmdpZnlcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5zdHJpbmdpZnkuZGVmYXVsdCA9IHN0cmluZ2lmeVxuc3RyaW5naWZ5LnN0YWJsZSA9IGRldGVybWluaXN0aWNTdHJpbmdpZnlcbnN0cmluZ2lmeS5zdGFibGVTdHJpbmdpZnkgPSBkZXRlcm1pbmlzdGljU3RyaW5naWZ5XG5cbnZhciBMSU1JVF9SRVBMQUNFX05PREUgPSAnWy4uLl0nXG52YXIgQ0lSQ1VMQVJfUkVQTEFDRV9OT0RFID0gJ1tDaXJjdWxhcl0nXG5cbnZhciBhcnIgPSBbXVxudmFyIHJlcGxhY2VyU3RhY2sgPSBbXVxuXG5mdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyAoKSB7XG4gIHJldHVybiB7XG4gICAgZGVwdGhMaW1pdDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXG4gICAgZWRnZXNMaW1pdDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgfVxufVxuXG4vLyBSZWd1bGFyIHN0cmluZ2lmeVxuZnVuY3Rpb24gc3RyaW5naWZ5IChvYmosIHJlcGxhY2VyLCBzcGFjZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucygpXG4gIH1cblxuICBkZWNpcmMob2JqLCAnJywgMCwgW10sIHVuZGVmaW5lZCwgMCwgb3B0aW9ucylcbiAgdmFyIHJlc1xuICB0cnkge1xuICAgIGlmIChyZXBsYWNlclN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVzID0gSlNPTi5zdHJpbmdpZnkob2JqLCByZXBsYWNlciwgc3BhY2VyKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSBKU09OLnN0cmluZ2lmeShvYmosIHJlcGxhY2VHZXR0ZXJWYWx1ZXMocmVwbGFjZXIpLCBzcGFjZXIpXG4gICAgfVxuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KCdbdW5hYmxlIHRvIHNlcmlhbGl6ZSwgY2lyY3VsYXIgcmVmZXJlbmNlIGlzIHRvbyBjb21wbGV4IHRvIGFuYWx5emVdJylcbiAgfSBmaW5hbGx5IHtcbiAgICB3aGlsZSAoYXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdmFyIHBhcnQgPSBhcnIucG9wKClcbiAgICAgIGlmIChwYXJ0Lmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGFydFswXSwgcGFydFsxXSwgcGFydFszXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRbMF1bcGFydFsxXV0gPSBwYXJ0WzJdXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gc2V0UmVwbGFjZSAocmVwbGFjZSwgdmFsLCBrLCBwYXJlbnQpIHtcbiAgdmFyIHByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocGFyZW50LCBrKVxuICBpZiAocHJvcGVydHlEZXNjcmlwdG9yLmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHByb3BlcnR5RGVzY3JpcHRvci5jb25maWd1cmFibGUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJlbnQsIGssIHsgdmFsdWU6IHJlcGxhY2UgfSlcbiAgICAgIGFyci5wdXNoKFtwYXJlbnQsIGssIHZhbCwgcHJvcGVydHlEZXNjcmlwdG9yXSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwbGFjZXJTdGFjay5wdXNoKFt2YWwsIGssIHJlcGxhY2VdKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwYXJlbnRba10gPSByZXBsYWNlXG4gICAgYXJyLnB1c2goW3BhcmVudCwgaywgdmFsXSlcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWNpcmMgKHZhbCwgaywgZWRnZUluZGV4LCBzdGFjaywgcGFyZW50LCBkZXB0aCwgb3B0aW9ucykge1xuICBkZXB0aCArPSAxXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChzdGFja1tpXSA9PT0gdmFsKSB7XG4gICAgICAgIHNldFJlcGxhY2UoQ0lSQ1VMQVJfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMuZGVwdGhMaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIGRlcHRoID4gb3B0aW9ucy5kZXB0aExpbWl0XG4gICAgKSB7XG4gICAgICBzZXRSZXBsYWNlKExJTUlUX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygb3B0aW9ucy5lZGdlc0xpbWl0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgZWRnZUluZGV4ICsgMSA+IG9wdGlvbnMuZWRnZXNMaW1pdFxuICAgICkge1xuICAgICAgc2V0UmVwbGFjZShMSU1JVF9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWwpXG4gICAgLy8gT3B0aW1pemUgZm9yIEFycmF5cy4gQmlnIGFycmF5cyBjb3VsZCBraWxsIHRoZSBwZXJmb3JtYW5jZSBvdGhlcndpc2UhXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBkZWNpcmModmFsW2ldLCBpLCBpLCBzdGFjaywgdmFsLCBkZXB0aCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpXG4gICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICBkZWNpcmModmFsW2tleV0sIGtleSwgaSwgc3RhY2ssIHZhbCwgZGVwdGgsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuICAgIHN0YWNrLnBvcCgpXG4gIH1cbn1cblxuLy8gU3RhYmxlLXN0cmluZ2lmeVxuZnVuY3Rpb24gY29tcGFyZUZ1bmN0aW9uIChhLCBiKSB7XG4gIGlmIChhIDwgYikge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChhID4gYikge1xuICAgIHJldHVybiAxXG4gIH1cbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gZGV0ZXJtaW5pc3RpY1N0cmluZ2lmeSAob2JqLCByZXBsYWNlciwgc3BhY2VyLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRpb25zID0gZGVmYXVsdE9wdGlvbnMoKVxuICB9XG5cbiAgdmFyIHRtcCA9IGRldGVybWluaXN0aWNEZWNpcmMob2JqLCAnJywgMCwgW10sIHVuZGVmaW5lZCwgMCwgb3B0aW9ucykgfHwgb2JqXG4gIHZhciByZXNcbiAgdHJ5IHtcbiAgICBpZiAocmVwbGFjZXJTdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlcyA9IEpTT04uc3RyaW5naWZ5KHRtcCwgcmVwbGFjZXIsIHNwYWNlcilcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzID0gSlNPTi5zdHJpbmdpZnkodG1wLCByZXBsYWNlR2V0dGVyVmFsdWVzKHJlcGxhY2VyKSwgc3BhY2VyKVxuICAgIH1cbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSgnW3VuYWJsZSB0byBzZXJpYWxpemUsIGNpcmN1bGFyIHJlZmVyZW5jZSBpcyB0b28gY29tcGxleCB0byBhbmFseXplXScpXG4gIH0gZmluYWxseSB7XG4gICAgLy8gRW5zdXJlIHRoYXQgd2UgcmVzdG9yZSB0aGUgb2JqZWN0IGFzIGl0IHdhcy5cbiAgICB3aGlsZSAoYXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdmFyIHBhcnQgPSBhcnIucG9wKClcbiAgICAgIGlmIChwYXJ0Lmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGFydFswXSwgcGFydFsxXSwgcGFydFszXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRbMF1bcGFydFsxXV0gPSBwYXJ0WzJdXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZGV0ZXJtaW5pc3RpY0RlY2lyYyAodmFsLCBrLCBlZGdlSW5kZXgsIHN0YWNrLCBwYXJlbnQsIGRlcHRoLCBvcHRpb25zKSB7XG4gIGRlcHRoICs9IDFcbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHN0YWNrW2ldID09PSB2YWwpIHtcbiAgICAgICAgc2V0UmVwbGFjZShDSVJDVUxBUl9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygb3B0aW9ucy5kZXB0aExpbWl0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgZGVwdGggPiBvcHRpb25zLmRlcHRoTGltaXRcbiAgICApIHtcbiAgICAgIHNldFJlcGxhY2UoTElNSVRfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmVkZ2VzTGltaXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBlZGdlSW5kZXggKyAxID4gb3B0aW9ucy5lZGdlc0xpbWl0XG4gICAgKSB7XG4gICAgICBzZXRSZXBsYWNlKExJTUlUX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbClcbiAgICAvLyBPcHRpbWl6ZSBmb3IgQXJyYXlzLiBCaWcgYXJyYXlzIGNvdWxkIGtpbGwgdGhlIHBlcmZvcm1hbmNlIG90aGVyd2lzZSFcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRldGVybWluaXN0aWNEZWNpcmModmFsW2ldLCBpLCBpLCBzdGFjaywgdmFsLCBkZXB0aCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXRlIGEgdGVtcG9yYXJ5IG9iamVjdCBpbiB0aGUgcmVxdWlyZWQgd2F5XG4gICAgICB2YXIgdG1wID0ge31cbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsKS5zb3J0KGNvbXBhcmVGdW5jdGlvbilcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgIGRldGVybWluaXN0aWNEZWNpcmModmFsW2tleV0sIGtleSwgaSwgc3RhY2ssIHZhbCwgZGVwdGgsIG9wdGlvbnMpXG4gICAgICAgIHRtcFtrZXldID0gdmFsW2tleV1cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGFyZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBhcnIucHVzaChbcGFyZW50LCBrLCB2YWxdKVxuICAgICAgICBwYXJlbnRba10gPSB0bXBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0bXBcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhY2sucG9wKClcbiAgfVxufVxuXG4vLyB3cmFwcyByZXBsYWNlciBmdW5jdGlvbiB0byBoYW5kbGUgdmFsdWVzIHdlIGNvdWxkbid0IHJlcGxhY2Vcbi8vIGFuZCBtYXJrIHRoZW0gYXMgcmVwbGFjZWQgdmFsdWVcbmZ1bmN0aW9uIHJlcGxhY2VHZXR0ZXJWYWx1ZXMgKHJlcGxhY2VyKSB7XG4gIHJlcGxhY2VyID1cbiAgICB0eXBlb2YgcmVwbGFjZXIgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IHJlcGxhY2VyXG4gICAgICA6IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgIHJldHVybiB2XG4gICAgICB9XG4gIHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICBpZiAocmVwbGFjZXJTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGxhY2VyU3RhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnQgPSByZXBsYWNlclN0YWNrW2ldXG4gICAgICAgIGlmIChwYXJ0WzFdID09PSBrZXkgJiYgcGFydFswXSA9PT0gdmFsKSB7XG4gICAgICAgICAgdmFsID0gcGFydFsyXVxuICAgICAgICAgIHJlcGxhY2VyU3RhY2suc3BsaWNlKGksIDEpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbClcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/fast-safe-stringify/index.js\n");

/***/ })

};
;