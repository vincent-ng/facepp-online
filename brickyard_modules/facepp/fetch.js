let api

function hasNativeFetch() {
	return typeof fetch !== 'undefined'
}

function isNode() {
	return (typeof process !== 'undefined') && (process.release.name === 'node')
}

if (hasNativeFetch()) {
	api = fetch
} else if (isNode()) {
	api = require('node-fetch')
} else {
	api = require('whatwg-fetch')
	// throw new Error('fetch api not support')
}

module.exports = api
