const _ = require('lodash')
const FormData = require('form-data')
const fetch = require('./fetch')

class FacePlusPlus {
	constructor(key, secret, options) {
		this.key = key
		this.secret = secret
		this.options = _.defaults({}, options, {
			apiUrl: 'https://api-cn.faceplusplus.com',
		})
	}

	// private
	async request(urlPath, params) {
		const form = new FormData()
		_.each(params, (v, k) => form.append(k, v))
		form.append('api_key', this.key)
		form.append('api_secret', this.secret)
		const res = await fetch(`${this.options.apiUrl}/${urlPath}`, {
			mode: 'cors',
			method: 'POST',
			body: form,
		})
		const rs = await res.json()
		return rs
	}

	async detectSceneAndObject(image) {
		const rs = await this.request('imagepp/beta/detectsceneandobject', image)
		return rs
	}

	async recognizeText(image) {
		const rs = await this.request('imagepp/v1/recognizetext', image)
		return rs
	}

	async faceCompare(images) {
		const rs = await this.request('facepp/v3/compare', images)
		return rs
	}
}

module.exports = FacePlusPlus
