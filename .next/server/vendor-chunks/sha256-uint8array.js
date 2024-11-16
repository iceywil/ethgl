"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/sha256-uint8array";
exports.ids = ["vendor-chunks/sha256-uint8array"];
exports.modules = {

/***/ "(ssr)/./node_modules/sha256-uint8array/dist/sha256-uint8array.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/sha256-uint8array/dist/sha256-uint8array.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Hash: () => (/* binding */ Hash),\n/* harmony export */   createHash: () => (/* binding */ createHash)\n/* harmony export */ });\n/**\n * sha256-uint8array.ts\n */\n// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311\nconst K = [\n    0x428a2f98 | 0, 0x71374491 | 0, 0xb5c0fbcf | 0, 0xe9b5dba5 | 0,\n    0x3956c25b | 0, 0x59f111f1 | 0, 0x923f82a4 | 0, 0xab1c5ed5 | 0,\n    0xd807aa98 | 0, 0x12835b01 | 0, 0x243185be | 0, 0x550c7dc3 | 0,\n    0x72be5d74 | 0, 0x80deb1fe | 0, 0x9bdc06a7 | 0, 0xc19bf174 | 0,\n    0xe49b69c1 | 0, 0xefbe4786 | 0, 0x0fc19dc6 | 0, 0x240ca1cc | 0,\n    0x2de92c6f | 0, 0x4a7484aa | 0, 0x5cb0a9dc | 0, 0x76f988da | 0,\n    0x983e5152 | 0, 0xa831c66d | 0, 0xb00327c8 | 0, 0xbf597fc7 | 0,\n    0xc6e00bf3 | 0, 0xd5a79147 | 0, 0x06ca6351 | 0, 0x14292967 | 0,\n    0x27b70a85 | 0, 0x2e1b2138 | 0, 0x4d2c6dfc | 0, 0x53380d13 | 0,\n    0x650a7354 | 0, 0x766a0abb | 0, 0x81c2c92e | 0, 0x92722c85 | 0,\n    0xa2bfe8a1 | 0, 0xa81a664b | 0, 0xc24b8b70 | 0, 0xc76c51a3 | 0,\n    0xd192e819 | 0, 0xd6990624 | 0, 0xf40e3585 | 0, 0x106aa070 | 0,\n    0x19a4c116 | 0, 0x1e376c08 | 0, 0x2748774c | 0, 0x34b0bcb5 | 0,\n    0x391c0cb3 | 0, 0x4ed8aa4a | 0, 0x5b9cca4f | 0, 0x682e6ff3 | 0,\n    0x748f82ee | 0, 0x78a5636f | 0, 0x84c87814 | 0, 0x8cc70208 | 0,\n    0x90befffa | 0, 0xa4506ceb | 0, 0xbef9a3f7 | 0, 0xc67178f2 | 0,\n];\nconst algorithms = {\n    sha256: 1,\n};\nfunction createHash(algorithm) {\n    if (algorithm && !algorithms[algorithm] && !algorithms[algorithm.toLowerCase()]) {\n        throw new Error(\"Digest method not supported\");\n    }\n    return new Hash();\n}\nclass Hash {\n    constructor() {\n        // first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19\n        this.A = 0x6a09e667 | 0;\n        this.B = 0xbb67ae85 | 0;\n        this.C = 0x3c6ef372 | 0;\n        this.D = 0xa54ff53a | 0;\n        this.E = 0x510e527f | 0;\n        this.F = 0x9b05688c | 0;\n        this.G = 0x1f83d9ab | 0;\n        this.H = 0x5be0cd19 | 0;\n        this._size = 0;\n        this._sp = 0; // surrogate pair\n        if (!sharedBuffer || sharedOffset >= 8000 /* N.allocTotal */) {\n            sharedBuffer = new ArrayBuffer(8000 /* N.allocTotal */);\n            sharedOffset = 0;\n        }\n        this._byte = new Uint8Array(sharedBuffer, sharedOffset, 80 /* N.allocBytes */);\n        this._word = new Int32Array(sharedBuffer, sharedOffset, 20 /* N.allocWords */);\n        sharedOffset += 80 /* N.allocBytes */;\n    }\n    update(data) {\n        // data: string\n        if (\"string\" === typeof data) {\n            return this._utf8(data);\n        }\n        // data: undefined\n        if (data == null) {\n            throw new TypeError(\"Invalid type: \" + typeof data);\n        }\n        const byteOffset = data.byteOffset;\n        const length = data.byteLength;\n        let blocks = (length / 64 /* N.inputBytes */) | 0;\n        let offset = 0;\n        // longer than 1 block\n        if (blocks && !(byteOffset & 3) && !(this._size % 64 /* N.inputBytes */)) {\n            const block = new Int32Array(data.buffer, byteOffset, blocks * 16 /* N.inputWords */);\n            while (blocks--) {\n                this._int32(block, offset >> 2);\n                offset += 64 /* N.inputBytes */;\n            }\n            this._size += offset;\n        }\n        // data: TypedArray | DataView\n        const BYTES_PER_ELEMENT = data.BYTES_PER_ELEMENT;\n        if (BYTES_PER_ELEMENT !== 1 && data.buffer) {\n            const rest = new Uint8Array(data.buffer, byteOffset + offset, length - offset);\n            return this._uint8(rest);\n        }\n        // no more bytes\n        if (offset === length)\n            return this;\n        // data: Uint8Array | Int8Array\n        return this._uint8(data, offset);\n    }\n    _uint8(data, offset) {\n        const { _byte, _word } = this;\n        const length = data.length;\n        offset = offset | 0;\n        while (offset < length) {\n            const start = this._size % 64 /* N.inputBytes */;\n            let index = start;\n            while (offset < length && index < 64 /* N.inputBytes */) {\n                _byte[index++] = data[offset++];\n            }\n            if (index >= 64 /* N.inputBytes */) {\n                this._int32(_word);\n            }\n            this._size += index - start;\n        }\n        return this;\n    }\n    _utf8(text) {\n        const { _byte, _word } = this;\n        const length = text.length;\n        let surrogate = this._sp;\n        for (let offset = 0; offset < length;) {\n            const start = this._size % 64 /* N.inputBytes */;\n            let index = start;\n            while (offset < length && index < 64 /* N.inputBytes */) {\n                let code = text.charCodeAt(offset++) | 0;\n                if (code < 0x80) {\n                    // ASCII characters\n                    _byte[index++] = code;\n                }\n                else if (code < 0x800) {\n                    // 2 bytes\n                    _byte[index++] = 0xC0 | (code >>> 6);\n                    _byte[index++] = 0x80 | (code & 0x3F);\n                }\n                else if (code < 0xD800 || code > 0xDFFF) {\n                    // 3 bytes\n                    _byte[index++] = 0xE0 | (code >>> 12);\n                    _byte[index++] = 0x80 | ((code >>> 6) & 0x3F);\n                    _byte[index++] = 0x80 | (code & 0x3F);\n                }\n                else if (surrogate) {\n                    // 4 bytes - surrogate pair\n                    code = ((surrogate & 0x3FF) << 10) + (code & 0x3FF) + 0x10000;\n                    _byte[index++] = 0xF0 | (code >>> 18);\n                    _byte[index++] = 0x80 | ((code >>> 12) & 0x3F);\n                    _byte[index++] = 0x80 | ((code >>> 6) & 0x3F);\n                    _byte[index++] = 0x80 | (code & 0x3F);\n                    surrogate = 0;\n                }\n                else {\n                    surrogate = code;\n                }\n            }\n            if (index >= 64 /* N.inputBytes */) {\n                this._int32(_word);\n                _word[0] = _word[16 /* N.inputWords */];\n            }\n            this._size += index - start;\n        }\n        this._sp = surrogate;\n        return this;\n    }\n    _int32(data, offset) {\n        let { A, B, C, D, E, F, G, H } = this;\n        let i = 0;\n        offset = offset | 0;\n        while (i < 16 /* N.inputWords */) {\n            W[i++] = swap32(data[offset++]);\n        }\n        for (i = 16 /* N.inputWords */; i < 64 /* N.workWords */; i++) {\n            W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0;\n        }\n        for (i = 0; i < 64 /* N.workWords */; i++) {\n            const T1 = (H + sigma1(E) + ch(E, F, G) + K[i] + W[i]) | 0;\n            const T2 = (sigma0(A) + maj(A, B, C)) | 0;\n            H = G;\n            G = F;\n            F = E;\n            E = (D + T1) | 0;\n            D = C;\n            C = B;\n            B = A;\n            A = (T1 + T2) | 0;\n        }\n        this.A = (A + this.A) | 0;\n        this.B = (B + this.B) | 0;\n        this.C = (C + this.C) | 0;\n        this.D = (D + this.D) | 0;\n        this.E = (E + this.E) | 0;\n        this.F = (F + this.F) | 0;\n        this.G = (G + this.G) | 0;\n        this.H = (H + this.H) | 0;\n    }\n    digest(encoding) {\n        const { _byte, _word } = this;\n        let i = (this._size % 64 /* N.inputBytes */) | 0;\n        _byte[i++] = 0x80;\n        // pad 0 for current word\n        while (i & 3) {\n            _byte[i++] = 0;\n        }\n        i >>= 2;\n        if (i > 14 /* N.highIndex */) {\n            while (i < 16 /* N.inputWords */) {\n                _word[i++] = 0;\n            }\n            i = 0;\n            this._int32(_word);\n        }\n        // pad 0 for rest words\n        while (i < 16 /* N.inputWords */) {\n            _word[i++] = 0;\n        }\n        // input size\n        const bits64 = this._size * 8;\n        const low32 = (bits64 & 0xffffffff) >>> 0;\n        const high32 = (bits64 - low32) / 0x100000000;\n        if (high32)\n            _word[14 /* N.highIndex */] = swap32(high32);\n        if (low32)\n            _word[15 /* N.lowIndex */] = swap32(low32);\n        this._int32(_word);\n        return (encoding === \"hex\") ? this._hex() : this._bin();\n    }\n    _hex() {\n        const { A, B, C, D, E, F, G, H } = this;\n        return hex32(A) + hex32(B) + hex32(C) + hex32(D) + hex32(E) + hex32(F) + hex32(G) + hex32(H);\n    }\n    _bin() {\n        const { A, B, C, D, E, F, G, H, _byte, _word } = this;\n        _word[0] = swap32(A);\n        _word[1] = swap32(B);\n        _word[2] = swap32(C);\n        _word[3] = swap32(D);\n        _word[4] = swap32(E);\n        _word[5] = swap32(F);\n        _word[6] = swap32(G);\n        _word[7] = swap32(H);\n        return _byte.slice(0, 32);\n    }\n}\nconst W = new Int32Array(64 /* N.workWords */);\nlet sharedBuffer;\nlet sharedOffset = 0;\nconst hex32 = num => (num + 0x100000000).toString(16).substr(-8);\nconst swapLE = (c => (((c << 24) & 0xff000000) | ((c << 8) & 0xff0000) | ((c >> 8) & 0xff00) | ((c >> 24) & 0xff)));\nconst swapBE = (c => c);\nconst swap32 = isBE() ? swapBE : swapLE;\nconst ch = (x, y, z) => (z ^ (x & (y ^ z)));\nconst maj = (x, y, z) => ((x & y) | (z & (x | y)));\nconst sigma0 = x => ((x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10));\nconst sigma1 = x => ((x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7));\nconst gamma0 = x => ((x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3));\nconst gamma1 = x => ((x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10));\nfunction isBE() {\n    const buf = new Uint8Array(new Uint16Array([0xFEFF]).buffer); // BOM\n    return (buf[0] === 0xFE);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2hhMjU2LXVpbnQ4YXJyYXkvZGlzdC9zaGEyNTYtdWludDhhcnJheS5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixlQUFlO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGVBQWU7QUFDL0I7QUFDQTtBQUNBLDZCQUE2QixnQkFBZ0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx5QkFBeUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywwQkFBMEI7QUFDbEU7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGVBQWU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHlCQUF5QjtBQUN6QztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdUNBQXVDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFO0FBQ2xFO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcc2FjaGFcXFRlc3RcXGV0aGdsXFxub2RlX21vZHVsZXNcXHNoYTI1Ni11aW50OGFycmF5XFxkaXN0XFxzaGEyNTYtdWludDhhcnJheS5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBzaGEyNTYtdWludDhhcnJheS50c1xuICovXG4vLyBmaXJzdCAzMiBiaXRzIG9mIHRoZSBmcmFjdGlvbmFsIHBhcnRzIG9mIHRoZSBjdWJlIHJvb3RzIG9mIHRoZSBmaXJzdCA2NCBwcmltZXMgMi4uMzExXG5jb25zdCBLID0gW1xuICAgIDB4NDI4YTJmOTggfCAwLCAweDcxMzc0NDkxIHwgMCwgMHhiNWMwZmJjZiB8IDAsIDB4ZTliNWRiYTUgfCAwLFxuICAgIDB4Mzk1NmMyNWIgfCAwLCAweDU5ZjExMWYxIHwgMCwgMHg5MjNmODJhNCB8IDAsIDB4YWIxYzVlZDUgfCAwLFxuICAgIDB4ZDgwN2FhOTggfCAwLCAweDEyODM1YjAxIHwgMCwgMHgyNDMxODViZSB8IDAsIDB4NTUwYzdkYzMgfCAwLFxuICAgIDB4NzJiZTVkNzQgfCAwLCAweDgwZGViMWZlIHwgMCwgMHg5YmRjMDZhNyB8IDAsIDB4YzE5YmYxNzQgfCAwLFxuICAgIDB4ZTQ5YjY5YzEgfCAwLCAweGVmYmU0Nzg2IHwgMCwgMHgwZmMxOWRjNiB8IDAsIDB4MjQwY2ExY2MgfCAwLFxuICAgIDB4MmRlOTJjNmYgfCAwLCAweDRhNzQ4NGFhIHwgMCwgMHg1Y2IwYTlkYyB8IDAsIDB4NzZmOTg4ZGEgfCAwLFxuICAgIDB4OTgzZTUxNTIgfCAwLCAweGE4MzFjNjZkIHwgMCwgMHhiMDAzMjdjOCB8IDAsIDB4YmY1OTdmYzcgfCAwLFxuICAgIDB4YzZlMDBiZjMgfCAwLCAweGQ1YTc5MTQ3IHwgMCwgMHgwNmNhNjM1MSB8IDAsIDB4MTQyOTI5NjcgfCAwLFxuICAgIDB4MjdiNzBhODUgfCAwLCAweDJlMWIyMTM4IHwgMCwgMHg0ZDJjNmRmYyB8IDAsIDB4NTMzODBkMTMgfCAwLFxuICAgIDB4NjUwYTczNTQgfCAwLCAweDc2NmEwYWJiIHwgMCwgMHg4MWMyYzkyZSB8IDAsIDB4OTI3MjJjODUgfCAwLFxuICAgIDB4YTJiZmU4YTEgfCAwLCAweGE4MWE2NjRiIHwgMCwgMHhjMjRiOGI3MCB8IDAsIDB4Yzc2YzUxYTMgfCAwLFxuICAgIDB4ZDE5MmU4MTkgfCAwLCAweGQ2OTkwNjI0IHwgMCwgMHhmNDBlMzU4NSB8IDAsIDB4MTA2YWEwNzAgfCAwLFxuICAgIDB4MTlhNGMxMTYgfCAwLCAweDFlMzc2YzA4IHwgMCwgMHgyNzQ4Nzc0YyB8IDAsIDB4MzRiMGJjYjUgfCAwLFxuICAgIDB4MzkxYzBjYjMgfCAwLCAweDRlZDhhYTRhIHwgMCwgMHg1YjljY2E0ZiB8IDAsIDB4NjgyZTZmZjMgfCAwLFxuICAgIDB4NzQ4ZjgyZWUgfCAwLCAweDc4YTU2MzZmIHwgMCwgMHg4NGM4NzgxNCB8IDAsIDB4OGNjNzAyMDggfCAwLFxuICAgIDB4OTBiZWZmZmEgfCAwLCAweGE0NTA2Y2ViIHwgMCwgMHhiZWY5YTNmNyB8IDAsIDB4YzY3MTc4ZjIgfCAwLFxuXTtcbmNvbnN0IGFsZ29yaXRobXMgPSB7XG4gICAgc2hhMjU2OiAxLFxufTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIYXNoKGFsZ29yaXRobSkge1xuICAgIGlmIChhbGdvcml0aG0gJiYgIWFsZ29yaXRobXNbYWxnb3JpdGhtXSAmJiAhYWxnb3JpdGhtc1thbGdvcml0aG0udG9Mb3dlckNhc2UoKV0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRGlnZXN0IG1ldGhvZCBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEhhc2goKTtcbn1cbmV4cG9ydCBjbGFzcyBIYXNoIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gZmlyc3QgMzIgYml0cyBvZiB0aGUgZnJhY3Rpb25hbCBwYXJ0cyBvZiB0aGUgc3F1YXJlIHJvb3RzIG9mIHRoZSBmaXJzdCA4IHByaW1lcyAyLi4xOVxuICAgICAgICB0aGlzLkEgPSAweDZhMDllNjY3IHwgMDtcbiAgICAgICAgdGhpcy5CID0gMHhiYjY3YWU4NSB8IDA7XG4gICAgICAgIHRoaXMuQyA9IDB4M2M2ZWYzNzIgfCAwO1xuICAgICAgICB0aGlzLkQgPSAweGE1NGZmNTNhIHwgMDtcbiAgICAgICAgdGhpcy5FID0gMHg1MTBlNTI3ZiB8IDA7XG4gICAgICAgIHRoaXMuRiA9IDB4OWIwNTY4OGMgfCAwO1xuICAgICAgICB0aGlzLkcgPSAweDFmODNkOWFiIHwgMDtcbiAgICAgICAgdGhpcy5IID0gMHg1YmUwY2QxOSB8IDA7XG4gICAgICAgIHRoaXMuX3NpemUgPSAwO1xuICAgICAgICB0aGlzLl9zcCA9IDA7IC8vIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICAgIGlmICghc2hhcmVkQnVmZmVyIHx8IHNoYXJlZE9mZnNldCA+PSA4MDAwIC8qIE4uYWxsb2NUb3RhbCAqLykge1xuICAgICAgICAgICAgc2hhcmVkQnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKDgwMDAgLyogTi5hbGxvY1RvdGFsICovKTtcbiAgICAgICAgICAgIHNoYXJlZE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnl0ZSA9IG5ldyBVaW50OEFycmF5KHNoYXJlZEJ1ZmZlciwgc2hhcmVkT2Zmc2V0LCA4MCAvKiBOLmFsbG9jQnl0ZXMgKi8pO1xuICAgICAgICB0aGlzLl93b3JkID0gbmV3IEludDMyQXJyYXkoc2hhcmVkQnVmZmVyLCBzaGFyZWRPZmZzZXQsIDIwIC8qIE4uYWxsb2NXb3JkcyAqLyk7XG4gICAgICAgIHNoYXJlZE9mZnNldCArPSA4MCAvKiBOLmFsbG9jQnl0ZXMgKi87XG4gICAgfVxuICAgIHVwZGF0ZShkYXRhKSB7XG4gICAgICAgIC8vIGRhdGE6IHN0cmluZ1xuICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91dGY4KGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRhdGE6IHVuZGVmaW5lZFxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCB0eXBlOiBcIiArIHR5cGVvZiBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBieXRlT2Zmc2V0ID0gZGF0YS5ieXRlT2Zmc2V0O1xuICAgICAgICBjb25zdCBsZW5ndGggPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgIGxldCBibG9ja3MgPSAobGVuZ3RoIC8gNjQgLyogTi5pbnB1dEJ5dGVzICovKSB8IDA7XG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICAvLyBsb25nZXIgdGhhbiAxIGJsb2NrXG4gICAgICAgIGlmIChibG9ja3MgJiYgIShieXRlT2Zmc2V0ICYgMykgJiYgISh0aGlzLl9zaXplICUgNjQgLyogTi5pbnB1dEJ5dGVzICovKSkge1xuICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBuZXcgSW50MzJBcnJheShkYXRhLmJ1ZmZlciwgYnl0ZU9mZnNldCwgYmxvY2tzICogMTYgLyogTi5pbnB1dFdvcmRzICovKTtcbiAgICAgICAgICAgIHdoaWxlIChibG9ja3MtLSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ludDMyKGJsb2NrLCBvZmZzZXQgPj4gMik7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDY0IC8qIE4uaW5wdXRCeXRlcyAqLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NpemUgKz0gb2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIC8vIGRhdGE6IFR5cGVkQXJyYXkgfCBEYXRhVmlld1xuICAgICAgICBjb25zdCBCWVRFU19QRVJfRUxFTUVOVCA9IGRhdGEuQllURVNfUEVSX0VMRU1FTlQ7XG4gICAgICAgIGlmIChCWVRFU19QRVJfRUxFTUVOVCAhPT0gMSAmJiBkYXRhLmJ1ZmZlcikge1xuICAgICAgICAgICAgY29uc3QgcmVzdCA9IG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBieXRlT2Zmc2V0ICsgb2Zmc2V0LCBsZW5ndGggLSBvZmZzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VpbnQ4KHJlc3QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vIG1vcmUgYnl0ZXNcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gbGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIC8vIGRhdGE6IFVpbnQ4QXJyYXkgfCBJbnQ4QXJyYXlcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VpbnQ4KGRhdGEsIG9mZnNldCk7XG4gICAgfVxuICAgIF91aW50OChkYXRhLCBvZmZzZXQpIHtcbiAgICAgICAgY29uc3QgeyBfYnl0ZSwgX3dvcmQgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgfCAwO1xuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuX3NpemUgJSA2NCAvKiBOLmlucHV0Qnl0ZXMgKi87XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBzdGFydDtcbiAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPCBsZW5ndGggJiYgaW5kZXggPCA2NCAvKiBOLmlucHV0Qnl0ZXMgKi8pIHtcbiAgICAgICAgICAgICAgICBfYnl0ZVtpbmRleCsrXSA9IGRhdGFbb2Zmc2V0KytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDY0IC8qIE4uaW5wdXRCeXRlcyAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ludDMyKF93b3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NpemUgKz0gaW5kZXggLSBzdGFydDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3V0ZjgodGV4dCkge1xuICAgICAgICBjb25zdCB7IF9ieXRlLCBfd29yZCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGV4dC5sZW5ndGg7XG4gICAgICAgIGxldCBzdXJyb2dhdGUgPSB0aGlzLl9zcDtcbiAgICAgICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbGVuZ3RoOykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9zaXplICUgNjQgLyogTi5pbnB1dEJ5dGVzICovO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gc3RhcnQ7XG4gICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgbGVuZ3RoICYmIGluZGV4IDwgNjQgLyogTi5pbnB1dEJ5dGVzICovKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQob2Zmc2V0KyspIHwgMDtcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA8IDB4ODApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQVNDSUkgY2hhcmFjdGVyc1xuICAgICAgICAgICAgICAgICAgICBfYnl0ZVtpbmRleCsrXSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvZGUgPCAweDgwMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAyIGJ5dGVzXG4gICAgICAgICAgICAgICAgICAgIF9ieXRlW2luZGV4KytdID0gMHhDMCB8IChjb2RlID4+PiA2KTtcbiAgICAgICAgICAgICAgICAgICAgX2J5dGVbaW5kZXgrK10gPSAweDgwIHwgKGNvZGUgJiAweDNGKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29kZSA8IDB4RDgwMCB8fCBjb2RlID4gMHhERkZGKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIDMgYnl0ZXNcbiAgICAgICAgICAgICAgICAgICAgX2J5dGVbaW5kZXgrK10gPSAweEUwIHwgKGNvZGUgPj4+IDEyKTtcbiAgICAgICAgICAgICAgICAgICAgX2J5dGVbaW5kZXgrK10gPSAweDgwIHwgKChjb2RlID4+PiA2KSAmIDB4M0YpO1xuICAgICAgICAgICAgICAgICAgICBfYnl0ZVtpbmRleCsrXSA9IDB4ODAgfCAoY29kZSAmIDB4M0YpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdXJyb2dhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gNCBieXRlcyAtIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSAoKHN1cnJvZ2F0ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoY29kZSAmIDB4M0ZGKSArIDB4MTAwMDA7XG4gICAgICAgICAgICAgICAgICAgIF9ieXRlW2luZGV4KytdID0gMHhGMCB8IChjb2RlID4+PiAxOCk7XG4gICAgICAgICAgICAgICAgICAgIF9ieXRlW2luZGV4KytdID0gMHg4MCB8ICgoY29kZSA+Pj4gMTIpICYgMHgzRik7XG4gICAgICAgICAgICAgICAgICAgIF9ieXRlW2luZGV4KytdID0gMHg4MCB8ICgoY29kZSA+Pj4gNikgJiAweDNGKTtcbiAgICAgICAgICAgICAgICAgICAgX2J5dGVbaW5kZXgrK10gPSAweDgwIHwgKGNvZGUgJiAweDNGKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vycm9nYXRlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cnJvZ2F0ZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDY0IC8qIE4uaW5wdXRCeXRlcyAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ludDMyKF93b3JkKTtcbiAgICAgICAgICAgICAgICBfd29yZFswXSA9IF93b3JkWzE2IC8qIE4uaW5wdXRXb3JkcyAqL107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zaXplICs9IGluZGV4IC0gc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3AgPSBzdXJyb2dhdGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfaW50MzIoZGF0YSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCB7IEEsIEIsIEMsIEQsIEUsIEYsIEcsIEggfSA9IHRoaXM7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMDtcbiAgICAgICAgd2hpbGUgKGkgPCAxNiAvKiBOLmlucHV0V29yZHMgKi8pIHtcbiAgICAgICAgICAgIFdbaSsrXSA9IHN3YXAzMihkYXRhW29mZnNldCsrXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMTYgLyogTi5pbnB1dFdvcmRzICovOyBpIDwgNjQgLyogTi53b3JrV29yZHMgKi87IGkrKykge1xuICAgICAgICAgICAgV1tpXSA9IChnYW1tYTEoV1tpIC0gMl0pICsgV1tpIC0gN10gKyBnYW1tYTAoV1tpIC0gMTVdKSArIFdbaSAtIDE2XSkgfCAwO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA2NCAvKiBOLndvcmtXb3JkcyAqLzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBUMSA9IChIICsgc2lnbWExKEUpICsgY2goRSwgRiwgRykgKyBLW2ldICsgV1tpXSkgfCAwO1xuICAgICAgICAgICAgY29uc3QgVDIgPSAoc2lnbWEwKEEpICsgbWFqKEEsIEIsIEMpKSB8IDA7XG4gICAgICAgICAgICBIID0gRztcbiAgICAgICAgICAgIEcgPSBGO1xuICAgICAgICAgICAgRiA9IEU7XG4gICAgICAgICAgICBFID0gKEQgKyBUMSkgfCAwO1xuICAgICAgICAgICAgRCA9IEM7XG4gICAgICAgICAgICBDID0gQjtcbiAgICAgICAgICAgIEIgPSBBO1xuICAgICAgICAgICAgQSA9IChUMSArIFQyKSB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5BID0gKEEgKyB0aGlzLkEpIHwgMDtcbiAgICAgICAgdGhpcy5CID0gKEIgKyB0aGlzLkIpIHwgMDtcbiAgICAgICAgdGhpcy5DID0gKEMgKyB0aGlzLkMpIHwgMDtcbiAgICAgICAgdGhpcy5EID0gKEQgKyB0aGlzLkQpIHwgMDtcbiAgICAgICAgdGhpcy5FID0gKEUgKyB0aGlzLkUpIHwgMDtcbiAgICAgICAgdGhpcy5GID0gKEYgKyB0aGlzLkYpIHwgMDtcbiAgICAgICAgdGhpcy5HID0gKEcgKyB0aGlzLkcpIHwgMDtcbiAgICAgICAgdGhpcy5IID0gKEggKyB0aGlzLkgpIHwgMDtcbiAgICB9XG4gICAgZGlnZXN0KGVuY29kaW5nKSB7XG4gICAgICAgIGNvbnN0IHsgX2J5dGUsIF93b3JkIH0gPSB0aGlzO1xuICAgICAgICBsZXQgaSA9ICh0aGlzLl9zaXplICUgNjQgLyogTi5pbnB1dEJ5dGVzICovKSB8IDA7XG4gICAgICAgIF9ieXRlW2krK10gPSAweDgwO1xuICAgICAgICAvLyBwYWQgMCBmb3IgY3VycmVudCB3b3JkXG4gICAgICAgIHdoaWxlIChpICYgMykge1xuICAgICAgICAgICAgX2J5dGVbaSsrXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaSA+Pj0gMjtcbiAgICAgICAgaWYgKGkgPiAxNCAvKiBOLmhpZ2hJbmRleCAqLykge1xuICAgICAgICAgICAgd2hpbGUgKGkgPCAxNiAvKiBOLmlucHV0V29yZHMgKi8pIHtcbiAgICAgICAgICAgICAgICBfd29yZFtpKytdID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgdGhpcy5faW50MzIoX3dvcmQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHBhZCAwIGZvciByZXN0IHdvcmRzXG4gICAgICAgIHdoaWxlIChpIDwgMTYgLyogTi5pbnB1dFdvcmRzICovKSB7XG4gICAgICAgICAgICBfd29yZFtpKytdID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbnB1dCBzaXplXG4gICAgICAgIGNvbnN0IGJpdHM2NCA9IHRoaXMuX3NpemUgKiA4O1xuICAgICAgICBjb25zdCBsb3czMiA9IChiaXRzNjQgJiAweGZmZmZmZmZmKSA+Pj4gMDtcbiAgICAgICAgY29uc3QgaGlnaDMyID0gKGJpdHM2NCAtIGxvdzMyKSAvIDB4MTAwMDAwMDAwO1xuICAgICAgICBpZiAoaGlnaDMyKVxuICAgICAgICAgICAgX3dvcmRbMTQgLyogTi5oaWdoSW5kZXggKi9dID0gc3dhcDMyKGhpZ2gzMik7XG4gICAgICAgIGlmIChsb3czMilcbiAgICAgICAgICAgIF93b3JkWzE1IC8qIE4ubG93SW5kZXggKi9dID0gc3dhcDMyKGxvdzMyKTtcbiAgICAgICAgdGhpcy5faW50MzIoX3dvcmQpO1xuICAgICAgICByZXR1cm4gKGVuY29kaW5nID09PSBcImhleFwiKSA/IHRoaXMuX2hleCgpIDogdGhpcy5fYmluKCk7XG4gICAgfVxuICAgIF9oZXgoKSB7XG4gICAgICAgIGNvbnN0IHsgQSwgQiwgQywgRCwgRSwgRiwgRywgSCB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGhleDMyKEEpICsgaGV4MzIoQikgKyBoZXgzMihDKSArIGhleDMyKEQpICsgaGV4MzIoRSkgKyBoZXgzMihGKSArIGhleDMyKEcpICsgaGV4MzIoSCk7XG4gICAgfVxuICAgIF9iaW4oKSB7XG4gICAgICAgIGNvbnN0IHsgQSwgQiwgQywgRCwgRSwgRiwgRywgSCwgX2J5dGUsIF93b3JkIH0gPSB0aGlzO1xuICAgICAgICBfd29yZFswXSA9IHN3YXAzMihBKTtcbiAgICAgICAgX3dvcmRbMV0gPSBzd2FwMzIoQik7XG4gICAgICAgIF93b3JkWzJdID0gc3dhcDMyKEMpO1xuICAgICAgICBfd29yZFszXSA9IHN3YXAzMihEKTtcbiAgICAgICAgX3dvcmRbNF0gPSBzd2FwMzIoRSk7XG4gICAgICAgIF93b3JkWzVdID0gc3dhcDMyKEYpO1xuICAgICAgICBfd29yZFs2XSA9IHN3YXAzMihHKTtcbiAgICAgICAgX3dvcmRbN10gPSBzd2FwMzIoSCk7XG4gICAgICAgIHJldHVybiBfYnl0ZS5zbGljZSgwLCAzMik7XG4gICAgfVxufVxuY29uc3QgVyA9IG5ldyBJbnQzMkFycmF5KDY0IC8qIE4ud29ya1dvcmRzICovKTtcbmxldCBzaGFyZWRCdWZmZXI7XG5sZXQgc2hhcmVkT2Zmc2V0ID0gMDtcbmNvbnN0IGhleDMyID0gbnVtID0+IChudW0gKyAweDEwMDAwMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigtOCk7XG5jb25zdCBzd2FwTEUgPSAoYyA9PiAoKChjIDw8IDI0KSAmIDB4ZmYwMDAwMDApIHwgKChjIDw8IDgpICYgMHhmZjAwMDApIHwgKChjID4+IDgpICYgMHhmZjAwKSB8ICgoYyA+PiAyNCkgJiAweGZmKSkpO1xuY29uc3Qgc3dhcEJFID0gKGMgPT4gYyk7XG5jb25zdCBzd2FwMzIgPSBpc0JFKCkgPyBzd2FwQkUgOiBzd2FwTEU7XG5jb25zdCBjaCA9ICh4LCB5LCB6KSA9PiAoeiBeICh4ICYgKHkgXiB6KSkpO1xuY29uc3QgbWFqID0gKHgsIHksIHopID0+ICgoeCAmIHkpIHwgKHogJiAoeCB8IHkpKSk7XG5jb25zdCBzaWdtYTAgPSB4ID0+ICgoeCA+Pj4gMiB8IHggPDwgMzApIF4gKHggPj4+IDEzIHwgeCA8PCAxOSkgXiAoeCA+Pj4gMjIgfCB4IDw8IDEwKSk7XG5jb25zdCBzaWdtYTEgPSB4ID0+ICgoeCA+Pj4gNiB8IHggPDwgMjYpIF4gKHggPj4+IDExIHwgeCA8PCAyMSkgXiAoeCA+Pj4gMjUgfCB4IDw8IDcpKTtcbmNvbnN0IGdhbW1hMCA9IHggPT4gKCh4ID4+PiA3IHwgeCA8PCAyNSkgXiAoeCA+Pj4gMTggfCB4IDw8IDE0KSBeICh4ID4+PiAzKSk7XG5jb25zdCBnYW1tYTEgPSB4ID0+ICgoeCA+Pj4gMTcgfCB4IDw8IDE1KSBeICh4ID4+PiAxOSB8IHggPDwgMTMpIF4gKHggPj4+IDEwKSk7XG5mdW5jdGlvbiBpc0JFKCkge1xuICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KG5ldyBVaW50MTZBcnJheShbMHhGRUZGXSkuYnVmZmVyKTsgLy8gQk9NXG4gICAgcmV0dXJuIChidWZbMF0gPT09IDB4RkUpO1xufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/sha256-uint8array/dist/sha256-uint8array.mjs\n");

/***/ })

};
;