const _ = require('lodash')
const FileDragReader = require('@brickyard/webpack-file-drag-reader')
const FacePlusPlus = require('@brickyard/facepp')
const indexHtml = require('html-loader!./index.html')
const templateFileInfo = _.template(require('html-loader!./file-info.html'))
const templateResult = _.template(require('html-loader!./result.html'))
require('github-fork-ribbon-css/gh-fork-ribbon.css')
require('./main.css')

const files = []

function onFile(handle) {
	files.unshift(handle)
	if (files.length > 2) {
		files.pop()
		const panel = document.getElementById('result-panel')
		panel.innerHTML = ''
	}
	const e = document.getElementById('file-info')
	e.innerHTML = templateFileInfo({ files })
}

function submit() {
	const fileList = _.filter(files, e => !e.exceedMaxSize && /image\/\w+/.test(e.file.type))
	if (fileList.length < 2) {
		alert('Require two images')
		return
	}
	const images = _.map(fileList, e => e.data.replace(/data:[\w/-]*;base64,/, ''))
	const fpp = new FacePlusPlus('e-ygZqKxAo2e_I9IZgr98EbBq9UE7uP9', 'kYmdYwvtSQjwSDtN_UhiegsDpb0RICY1')
	fpp.faceCompare({
		image_base64_1: images[0],
		image_base64_2: images[1],
	}).then((rs) => {
		const panel = document.getElementById('result-panel')
		panel.innerHTML = templateResult(rs)
	}).catch((e) => {
		console.log(e)
		alert(e.message)
	})
}

window.onload = () => {
	const e = document.getElementById('brickyard-app')
	e.innerHTML = indexHtml

	const reader = new FileDragReader('file-reader', { maxSize: 10000000 })
	// reader.onRead('start', () => console.log('start'))
	reader.onRead('file', onFile)
	// reader.onRead('end', () => console.log('end'))

	const btn = document.getElementById('operation-submit')
	btn.addEventListener('click', submit)
}
