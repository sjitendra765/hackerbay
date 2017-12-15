const jsonpatch = require('jsonpatch')

exports.createPatch = function(req,res,next){
	let patcharr = []
	patcharr.push(req.body.thepatch);
	patcheddoc = jsonpatch.apply_patch(req.body.mydoc, patcharr);
	res.send(patcheddoc)
}