'use strict';
var assert = require( 'chai' ).assert;
var mockup = require( 'tests/mockup/mockup' );
var BoundingBox = require( 'osg/BoundingBox' );
var ReaderParser = require( 'osgDB/readerParser' );
var vec3 = require( 'osg/glMatrix' ).vec3;


module.exports = function () {

    test( 'BoundingBox', function () {

        ( function () {
            var bb = new BoundingBox();
            var bb0 = [ -0.5, 0, -2 ];
            var bb1 = [ 1, 0, -1 ];
            var bb2 = [ 0, 1, -0.5 ];
            var bb3 = [ 1, 2, -0.8 ];
            bb.expandByvec3( bb0 );
            bb.expandByvec3( bb1 );
            bb.expandByvec3( bb2 );
            bb.expandByvec3( bb3 );

            var bbTestOk = ( bb._max[ 0 ] === 1 && bb._max[ 1 ] === 2 && bb._max[ 2 ] === -0.5 && bb._min[ 0 ] === -0.5 && bb._min[ 1 ] === 0 && bb._min[ 2 ] === -2 );
            assert.isOk( bbTestOk, 'Expanding by BoundingBox ->  bounding box test' );


            var o = ReaderParser.parseSceneGraph( mockup.getBoxScene() );
            o.getBound();
            var bbTestSceneGraphTest = ( mockup.checkNear( o._boundingSphere.radius(), 2.41421, 0.00001 ) );
            assert.isOk( bbTestSceneGraphTest, 'Box.js tested  ->  bounding sphere scene graph test' );
        } )();

        ( function () {
            var bb = new BoundingBox();
            bb._min = vec3.fromValues( 1.0, 2.0, 3.0 );
            bb._max = vec3.fromValues( 4.0, 5.0, 6.0 );

            assert.isOk( mockup.checkNear( bb.corner( 0, vec3.create() ), vec3.fromValues( 1.0, 2.0, 3.0 ) ), 'Box corner 0' );
            assert.isOk( mockup.checkNear( bb.corner( 7, vec3.create() ), vec3.fromValues( 4.0, 5.0, 6.0 ) ), 'Box corner 7' );
        } )();
    } );
};
