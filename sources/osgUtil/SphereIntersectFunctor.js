'use strict';

var MACROUTILS = require('osg/Utils');
var vec3 = require('osg/glMatrix').vec3;
var IntersectFunctor = require('osgUtil/IntersectFunctor');

var SphereIntersection = function() {
    IntersectFunctor.Intersection.call(this);

    this._localIntersectionNormal = vec3.clone(vec3.ONE);

    // index of vertex
    this._i1 = -1;
    this._i2 = -1;
    this._i3 = -1;

    // barycentric coordinates
    this._r1 = 0.0;
    this._r2 = 0.0;
    this._r3 = 0.0;
};

var SphereIntersectFunctor = function() {
    IntersectFunctor.apply(this);

    this._center = undefined;
    this._radius = 0.0;
};

MACROUTILS.createPrototypeObject(
    SphereIntersectFunctor,
    MACROUTILS.objectInherit(IntersectFunctor.prototype, {
        set: function(center, radius) {
            this._center = center;
            this._radius = radius;
        },

        enter: function(bbox) {
            // Intersection sphere box, from graphic gems 2
            // https://github.com/erich666/GraphicsGems/blob/master/gems/BoxSphere.c
            var r2 = this._radius * this._radius;
            var dmin = 0;
            var bmin = bbox.getMin();
            var bmax = bbox.getMax();
            var d = 0;
            for (var i = 0; i < 3; i++) {
                if (this._center[i] < bmin[i]) {
                    d = this._center[i] - bmin[i];
                    dmin += d * d;
                } else if (this._center[i] > bmax[i]) {
                    d = this._center[i] - bmax[i];
                    dmin += d * d;
                }
            }
            return dmin <= r2;
        },

        //
        // \2|
        //  \|
        //   \
        // 3 |\  1
        //   |0\
        // __|__\___
        // 4 | 5 \ 6
        //
        // from http://www.geometrictools.com/Source/Distance3D.html#PointPlanar
        // js : https://github.com/stephomi/sculptgl/blob/master/src/math3d/Geometry.js#L89
        intersectTriangle: (function() {
            var edge1 = vec3.create();
            var edge2 = vec3.create();
            var diff = vec3.create();
            return function(v0, v1, v2, i0, i1, i2) {
                if (this._limitOneIntersection && this._hit) return;
                // sphere is a 'volume' here (so if the triangle is inside the ball it will intersects)

                vec3.sub(edge1, v1, v0);
                vec3.sub(edge2, v2, v0);
                var a00 = vec3.sqrLen(edge1);
                var a01 = vec3.dot(edge1, edge2);
                var a11 = vec3.sqrLen(edge2);

                vec3.sub(diff, v0, this._center);
                var b0 = vec3.dot(diff, edge1);
                var b1 = vec3.dot(diff, edge2);
                var c = vec3.sqrLen(diff);
                var det = Math.abs(a00 * a11 - a01 * a01);
                if (det < 1e-10) return;

                var s = a01 * b1 - a11 * b0;
                var t = a01 * b0 - a00 * b1;
                var sqrDistance;
                var zone = 4;

                if (s + t <= det) {
                    if (s < 0.0) {
                        if (t < 0.0) {
                            // region 4
                            zone = 4;
                            if (b0 < 0.0) {
                                t = 0.0;
                                if (-b0 >= a00) {
                                    s = 1.0;
                                    sqrDistance = a00 + 2.0 * b0 + c;
                                } else {
                                    s = -b0 / a00;
                                    sqrDistance = b0 * s + c;
                                }
                            } else {
                                s = 0.0;
                                if (b1 >= 0.0) {
                                    t = 0.0;
                                    sqrDistance = c;
                                } else if (-b1 >= a11) {
                                    t = 1.0;
                                    sqrDistance = a11 + 2.0 * b1 + c;
                                } else {
                                    t = -b1 / a11;
                                    sqrDistance = b1 * t + c;
                                }
                            }
                        } else {
                            // region 3
                            zone = 3;
                            s = 0.0;
                            if (b1 >= 0.0) {
                                t = 0.0;
                                sqrDistance = c;
                            } else if (-b1 >= a11) {
                                t = 1.0;
                                sqrDistance = a11 + 2.0 * b1 + c;
                            } else {
                                t = -b1 / a11;
                                sqrDistance = b1 * t + c;
                            }
                        }
                    } else if (t < 0.0) {
                        // region 5
                        zone = 5;
                        t = 0.0;
                        if (b0 >= 0.0) {
                            s = 0.0;
                            sqrDistance = c;
                        } else if (-b0 >= a00) {
                            s = 1.0;
                            sqrDistance = a00 + 2.0 * b0 + c;
                        } else {
                            s = -b0 / a00;
                            sqrDistance = b0 * s + c;
                        }
                    } else {
                        // region 0
                        zone = 0;
                        // minimum at interior point
                        var invDet = 1.0 / det;
                        s *= invDet;
                        t *= invDet;
                        sqrDistance =
                            s * (a00 * s + a01 * t + 2.0 * b0) +
                            t * (a01 * s + a11 * t + 2.0 * b1) +
                            c;
                    }
                } else {
                    var tmp0, tmp1, numer, denom;

                    if (s < 0.0) {
                        // region 2
                        zone = 2;
                        tmp0 = a01 + b0;
                        tmp1 = a11 + b1;
                        if (tmp1 > tmp0) {
                            numer = tmp1 - tmp0;
                            denom = a00 - 2.0 * a01 + a11;
                            if (numer >= denom) {
                                s = 1.0;
                                t = 0.0;
                                sqrDistance = a00 + 2.0 * b0 + c;
                            } else {
                                s = numer / denom;
                                t = 1.0 - s;
                                sqrDistance =
                                    s * (a00 * s + a01 * t + 2.0 * b0) +
                                    t * (a01 * s + a11 * t + 2.0 * b1) +
                                    c;
                            }
                        } else {
                            s = 0.0;
                            if (tmp1 <= 0.0) {
                                t = 1.0;
                                sqrDistance = a11 + 2.0 * b1 + c;
                            } else if (b1 >= 0.0) {
                                t = 0.0;
                                sqrDistance = c;
                            } else {
                                t = -b1 / a11;
                                sqrDistance = b1 * t + c;
                            }
                        }
                    } else if (t < 0.0) {
                        // region 6
                        zone = 6;
                        tmp0 = a01 + b1;
                        tmp1 = a00 + b0;
                        if (tmp1 > tmp0) {
                            numer = tmp1 - tmp0;
                            denom = a00 - 2.0 * a01 + a11;
                            if (numer >= denom) {
                                t = 1.0;
                                s = 0.0;
                                sqrDistance = a11 + 2.0 * b1 + c;
                            } else {
                                t = numer / denom;
                                s = 1.0 - t;
                                sqrDistance =
                                    s * (a00 * s + a01 * t + 2.0 * b0) +
                                    t * (a01 * s + a11 * t + 2.0 * b1) +
                                    c;
                            }
                        } else {
                            t = 0.0;
                            if (tmp1 <= 0.0) {
                                s = 1.0;
                                sqrDistance = a00 + 2.0 * b0 + c;
                            } else if (b0 >= 0.0) {
                                s = 0.0;
                                sqrDistance = c;
                            } else {
                                s = -b0 / a00;
                                sqrDistance = b0 * s + c;
                            }
                        }
                    } else {
                        // region 1
                        zone = 1;
                        numer = a11 + b1 - a01 - b0;
                        if (numer <= 0.0) {
                            s = 0.0;
                            t = 1.0;
                            sqrDistance = a11 + 2.0 * b1 + c;
                        } else {
                            denom = a00 - 2.0 * a01 + a11;
                            if (numer >= denom) {
                                s = 1.0;
                                t = 0.0;
                                sqrDistance = a00 + 2.0 * b0 + c;
                            } else {
                                s = numer / denom;
                                t = 1.0 - s;
                                sqrDistance =
                                    s * (a00 * s + a01 * t + 2.0 * b0) +
                                    t * (a01 * s + a11 * t + 2.0 * b1) +
                                    c;
                            }
                        }
                    }
                }

                // Account for numerical round-off error.
                if (sqrDistance < 0.0) sqrDistance = 0.0;

                if (sqrDistance > this._radius * this._radius) return;

                var normal = vec3.create();

                var intersection = this.initIntersection(new SphereIntersection());
                intersection._i1 = i0;
                intersection._i2 = i1;
                intersection._i3 = i2;

                intersection._r1 = 1 - s - t;
                intersection._r2 = s;
                intersection._r3 = t;

                // inter = v0 + edge1 * s + edge2 * t
                var inter = intersection._localIntersectionPoint;
                vec3.scaleAndAdd(inter, vec3.scaleAndAdd(inter, v0, edge1, s), edge2, t);

                // normal
                vec3.cross(intersection._localIntersectionNormal, edge1, edge2);
                vec3.normalize(normal, intersection._localIntersectionNormal);

                intersection._ratio = Math.sqrt(sqrDistance);
                intersection._zone = zone;
            };
        })()
    }),
    'osgUtil',
    'SphereIntersectFunctor'
);

module.exports = SphereIntersectFunctor;
