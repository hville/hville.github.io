/*
modified/simplified from
https://github.com/tommyreddad/tommyreddad.github.io/blob/master/js/2019-08-08-burrows-wheeler/bwt.js
*/

/**
* Duval's algorithm to gets the position following each Lyndon word
* @param {string} s
* @return {number[]} the end indices, last === length of the string
*/
function lyndon(s) {
	const ends = [];
	let k = 0;
	while (k < s.length) {
		let i = k,
				j = k+1;
		while (j < s.length && s[i] <= s[j]) s[i] === s[j++] ? ++i : i=k;
		ends.push(k += j-i);
	}
	return ends
}

/**
* Gets all of the lyndon words cyclic rotations
* @param {string} s
* @return {Object[]} The cyclic rotations of the input segment
*/
function get_rotations(s) {
	const words = lyndon(s),
				rots = [];
	let iw = 0,
			i = 0;
	for (let k=0; k<s.length; ++k) {
		if (k === words[iw]) i = words[iw++];
		rots[k] = { k, i, j:words[iw] };
	}
	return rots
}
/**
* Computes the Gil-Scott bijective Burrows-Wheeler transform of the input string
* @param {string} s
* @return {string} The Gil-Scott BWT string
*/
function bwt(s) {
	return get_rotations(s)
	.sort((a, b) => {
		let ka = a.k,
				kb = b.k;
		do {
			if (s[ka] < s[kb]) return -1
			else if (s[ka] > s[kb]) return 1
			if (++ka === a.j) ka = a.i;
			if (++kb === b.j) kb = b.i;
			// Declare a tie if we ever return to the origin.
		} while (ka !== a.k || kb !== b.k)
		return 0
	})
	.reduce( (acc, rot) => acc + s[ (rot.k === rot.i ? rot.j : rot.k) - 1 ], '')
}

/**
* Performs the subroutine `Match` from the Gil & Scott Burrows-Wheeler transform paper
* @param {string} str
* @return {number[]} The output permutation
*/
function match(str) {
	const cnt = {};
	for (const c of str) cnt[c] ? ++cnt[c] : cnt[c]=1;
	const keys = Object.keys(cnt).sort(),
				before = {[keys[0]]: 0},
				theta = [],
				seen = {};
	for (let i = 1; i < keys.length; ++i)
		before[keys[i]] = before[keys[i-1]] + cnt[keys[i-1]];
	for (const c of str)
		theta.push(before[c] + (seen[c] ? ++seen[c] : seen[c]=1) - 1);
	return theta
}

/**
* Inverts the Gil-Scott bijective Burrows-Wheeler transform
* @param {string} str
* @return {string} The inverted BWT
*/
function inv_bwt(str) {
	const T = match(str),
				alpha = [];
	for (let j = 0; j < str.length; ++j) {
		if (T[j] !== -1) {
			let k = j;
			do {
				alpha.push(str[k]);
				const t = k;
				k = T[k];
				T[t] = -1;
			} while (T[k] !== -1)
		}
	}
	return alpha.reverse().join('')
}

function dMTF(arr,DIC) {
	const dic = DIC?.slice() || [],
				res = [];
	for (let i of arr) {
		//need to expand the dic to include highest value
		if (i>=dic.length) for (let j=dic.length; j<=i; ++j) dic[j] = String.fromCharCode(j);
		const c = dic[i];
		res.push(c);
		//move to front
		while(i) dic[i] = dic[--i];
		dic[0] = c;
	}
	return res.join('')
}

function eMTF(txt,DIC) {
	const dic = DIC?.slice() || [],
				res = [];
	for (const c of txt) {
		//TODO map?
		let i = dic.indexOf(c);
		if (i<0) {
			//need to expand the dic to include highest value
			i=c.charCodeAt();
			for (let j=dic.length; j<i; ++j) dic[j] = String.fromCharCode(j);
		}
		res.push(i);
		//move to front
		while(i) dic[i] = dic[--i];
		dic[0] = c;
	}
	return res
}

const LOWER = 'abcdefghijklmnopqrstuvwxyz',
	UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGIT = '0123456789',
  BASE62 = DIGIT + UPPER + LOWER,
	//https://datatracker.ietf.org/doc/html/rfc3986
	UNRESERVED$1  = BASE62 + '.-_~',
	// Chrome takes exception to the single quote in Query Strings https://bugs.chromium.org/p/chromium/issues/detail?id=292740
	QUERY = UNRESERVED$1 + ',?!():;+/*=$&@',
	FRAGMENT = QUERY + "'";

const DIC = (' ' + LOWER + `,.'":;-?()[]{}\n!` + DIGIT + '+/*=_~<>^`#%\t$&@|\\' + UPPER).split('');
function charRange(i,j,a=[]) {
	while(i<=j) a.push( String.fromCharCode(i++) );
	return a
}
charRange(127, 127, charRange(0, 9, charRange(11, 31, DIC)));

function enc(text, keys=UNRESERVED, dic=DIC) {
	return text ? toString(arr_big(eMTF(bwt(text), dic)), keys) : ''
}

function dec(code, keys=UNRESERVED, dic=DIC) {
	return code ? inv_bwt(dMTF(big_arr(parseBig(code, keys)), dic)) : ''
}

function toString(big, keys=UNRESERVED) {
	const len = BigInt(keys.length);
	let res = [];
	do {
		res.unshift(keys[big%len]);
		big /= len;
	} while (big)
	return res.join('')
}
function parseBig(txt, keys=COMPONENT) {
	const len = BigInt(keys.length);
	let big = 0n;
	for (const c of txt) {
		big = big*len + BigInt(keys.indexOf(c));
	}
	return big
}

/**
 * @param {number[]} arr
 * @returns {BigInt}
 */
function arr_big(arr) {
	let res = 0n,
			j = arr.length;
	while(j--) {
		let v = arr[j]+1, //increment to allow 0
				n = -1;
		while (v) {
			res = v&1 ? (res << 1n) | 1n : (res << 1n);
			v >>>= 1;
			++n;
		}
		res <<= BigInt(n);
	}
	return res
}
/**
 * @param {BigInt} big
 * @returns {number[]}
 */
function big_arr(big) {
	let res = [];
	while(big) {
		let v = 0,
				n = 1;
		while ( !(big&1n) ) {
			++n;
			big >>= 1n;
		}
		while (n--) {
			v = big&1n ? (v<<1)|1 : v<<1;
			big >>= 1n;
		}
		res.push(v-1);
	}
	return res
}

export { BASE62, DIGIT, FRAGMENT, LOWER, QUERY, UNRESERVED$1 as UNRESERVED, UPPER, dec, enc };
