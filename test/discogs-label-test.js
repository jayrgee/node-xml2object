var assert = require("assert");
var path = require('path');
var xml2object = require('../lib/xml2object');

describe('Discogs', function(){
	it('should parse discogs label object', function(done){
		var parser = new xml2object(
			['label'], path.normalize(__dirname + '/fixture/discogs_labels.xml'));
		var found = [];

		parser.on('object', function(name, obj) {
			found.push(obj);
		});

        parser.on('end', function () {
            assert.equal(found.length, 1, "Should have found one object");
            const obj = found[0];
            assert.equal(obj.id, "01", "Should have expected id");
            assert.equal(obj.name, "alpha", "Should have expected id");
            assert.equal(obj.sublabels.label.length, 3, "Should have 3 sublabels");
            assert.equal(obj.sublabels.label[0].id, "11", "Should have expected id");
            assert.equal(obj.sublabels.label[0].$t, "bravo", "Should have expected $text");

			done();
		});

		parser.start();
	});
});
