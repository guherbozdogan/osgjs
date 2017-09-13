(function() {
    'use strict';

    var OSG = window.OSG;
    var osgGA = OSG.osgGA;
    var osg = OSG.osg;
    var osgViewer = OSG.osgViewer;
    var osgUtil = OSG.osgUtil;

    var CADManipulatorStandardMouseKeyboardController =
        osgGA.CADManipulatorStandardMouseKeyboardController;

    var $ = window.$;

    var ShapeHelper = function() {
        this.__name = 'ShapeHelper';
    };
    ShapeHelper.prototype = {
        createTexturedBoxGeometryLines: function(cx, cy, cz, sx, sy, sz) {
            var centerx = cx !== undefined ? cx : 0.0;
            var centery = cy !== undefined ? cy : 0.0;
            var centerz = cz !== undefined ? cz : 0.0;

            var sizex = sx !== undefined ? sx : 1.0;
            var sizey = sy !== undefined ? sy : 1.0;
            var sizez = sz !== undefined ? sz : 1.0;

            var g = new osg.Geometry();
            var dx, dy, dz;
            dx = sizex / 2.0;
            dy = sizey / 2.0;
            dz = sizez / 2.0;

            var vertexes = new osg.Float32Array(24);

            // var uv = new MACROUTILS.Float32Array(48);
            // var normal = new MACROUTILS.Float32Array(72);

            // -ve y plane
            vertexes[0] = centerx - dx;
            vertexes[1] = centery - dy;
            vertexes[2] = centerz - dz;

            vertexes[3] = centerx + dx;
            vertexes[4] = centery - dy;
            vertexes[5] = centerz - dz;

            vertexes[6] = centerx + dx;
            vertexes[7] = centery + dy;
            vertexes[8] = centerz - dz;

            vertexes[9] = centerx - dx;
            vertexes[10] = centery + dy;
            vertexes[11] = centerz - dz;

            // +ve y plane
            vertexes[12] = centerx - dx;
            vertexes[13] = centery - dy;
            vertexes[14] = centerz + dz;

            vertexes[15] = centerx + dx;
            vertexes[16] = centery - dy;
            vertexes[17] = centerz + dz;

            vertexes[18] = centerx + dx;
            vertexes[19] = centery + dy;
            vertexes[20] = centerz + dz;

            vertexes[21] = centerx - dx;
            vertexes[22] = centery + dy;
            vertexes[23] = centerz + dz;

            var indexes = new osg.Uint16Array(24);
            indexes[0] = 0;
            indexes[1] = 1;
            indexes[2] = 1;
            indexes[3] = 2;
            indexes[4] = 2;
            indexes[5] = 3;

            indexes[6] = 3;
            indexes[7] = 0;
            indexes[8] = 4;
            indexes[9] = 5;
            indexes[10] = 5;
            indexes[11] = 6;

            indexes[12] = 6;
            indexes[13] = 7;
            indexes[14] = 7;
            indexes[15] = 4;

            indexes[16] = 0;
            indexes[17] = 4;

            indexes[18] = 1;
            indexes[19] = 5;
            indexes[20] = 2;
            indexes[21] = 6;
            indexes[22] = 3;
            indexes[23] = 7;

            g.getAttributes().Vertex = new osg.BufferArray(
                osg.BufferArray.ARRAY_BUFFER,
                vertexes,
                3
            );

            var primitive = new osg.DrawElements(
                osg.primitiveSet.LINES,
                new osg.BufferArray(osg.BufferArray.ELEMENT_ARRAY_BUFFER, indexes, 1)
            );

            g.getPrimitives().push(primitive);
            return g;
        },

        createTexturedBoxGeometry: function(cx, cy, cz, sx, sy, sz) {
            var centerx = cx !== undefined ? cx : 0.0;
            var centery = cy !== undefined ? cy : 0.0;
            var centerz = cz !== undefined ? cz : 0.0;

            var sizex = sx !== undefined ? sx : 1.0;
            var sizey = sy !== undefined ? sy : 1.0;
            var sizez = sz !== undefined ? sz : 1.0;

            var g = new osg.Geometry();
            var dx, dy, dz;
            dx = sizex / 2.0;
            dy = sizey / 2.0;
            dz = sizez / 2.0;

            var vertexes = new osg.Float32Array(72);
            var uv = new osg.Float32Array(48);
            var normal = new osg.Float32Array(72);

            // -ve y plane
            vertexes[0] = centerx - dx;
            vertexes[1] = centery - dy;
            vertexes[2] = centerz + dz;
            normal[0] = 0.0;
            normal[1] = -1.0;
            normal[2] = 0.0;
            uv[0] = 0.0;
            uv[1] = 0.0;

            vertexes[3] = centerx - dx;
            vertexes[4] = centery - dy;
            vertexes[5] = centerz - dz;
            normal[3] = 0.0;
            normal[4] = -1.0;
            normal[5] = 0.0;
            uv[2] = 0.0;
            uv[3] = 0.0;

            vertexes[6] = centerx + dx;
            vertexes[7] = centery - dy;
            vertexes[8] = centerz - dz;
            normal[6] = 0.0;
            normal[7] = -1.0;
            normal[8] = 0.0;
            uv[4] = 0.0;
            uv[5] = 0.0;

            vertexes[9] = centerx + dx;
            vertexes[10] = centery - dy;
            vertexes[11] = centerz + dz;
            normal[9] = 0.0;
            normal[10] = -1.0;
            normal[11] = 0.0;
            uv[6] = 0.0;
            uv[7] = 0.0;

            // +ve y plane
            vertexes[12] = centerx + dx;
            vertexes[13] = centery + dy;
            vertexes[14] = centerz + dz;
            normal[12] = 0.0;
            normal[13] = 1.0;
            normal[14] = 0.0;
            uv[8] = 0.0;
            uv[9] = 0.0;

            vertexes[15] = centerx + dx;
            vertexes[16] = centery + dy;
            vertexes[17] = centerz - dz;
            normal[15] = 0.0;
            normal[16] = 1.0;
            normal[17] = 0.0;
            uv[10] = 0.0;
            uv[11] = 0.0;

            vertexes[18] = centerx - dx;
            vertexes[19] = centery + dy;
            vertexes[20] = centerz - dz;
            normal[18] = 0.0;
            normal[19] = 1.0;
            normal[20] = 0.0;
            uv[12] = 0.0;
            uv[13] = 0.0;

            vertexes[21] = centerx - dx;
            vertexes[22] = centery + dy;
            vertexes[23] = centerz + dz;
            normal[21] = 0.0;
            normal[22] = 1.0;
            normal[23] = 0.0;
            uv[14] = 0.0;
            uv[15] = 0.0;

            // +ve x plane
            vertexes[24] = centerx + dx;
            vertexes[25] = centery - dy;
            vertexes[26] = centerz + dz;
            normal[24] = 1.0;
            normal[25] = 0.0;
            normal[26] = 0.0;
            uv[16] = 0.0;
            uv[17] = 0.0;

            vertexes[27] = centerx + dx;
            vertexes[28] = centery - dy;
            vertexes[29] = centerz - dz;
            normal[27] = 1.0;
            normal[28] = 0.0;
            normal[29] = 0.0;
            uv[18] = 0.0;
            uv[19] = 0.0;

            vertexes[30] = centerx + dx;
            vertexes[31] = centery + dy;
            vertexes[32] = centerz - dz;
            normal[30] = 1.0;
            normal[31] = 0.0;
            normal[32] = 0.0;
            uv[20] = 0.0;
            uv[21] = 0.0;

            vertexes[33] = centerx + dx;
            vertexes[34] = centery + dy;
            vertexes[35] = centerz + dz;
            normal[33] = 1.0;
            normal[34] = 0.0;
            normal[35] = 0.0;
            uv[22] = 0.0;
            uv[23] = 0.0;

            // -ve x plane
            vertexes[36] = centerx - dx;
            vertexes[37] = centery + dy;
            vertexes[38] = centerz + dz;
            normal[36] = -1.0;
            normal[37] = 0.0;
            normal[38] = 0.0;
            uv[24] = 0.0;
            uv[25] = 0.0;

            vertexes[39] = centerx - dx;
            vertexes[40] = centery + dy;
            vertexes[41] = centerz - dz;
            normal[39] = -1.0;
            normal[40] = 0.0;
            normal[41] = 0.0;
            uv[26] = 0.0;
            uv[27] = 0.0;

            vertexes[42] = centerx - dx;
            vertexes[43] = centery - dy;
            vertexes[44] = centerz - dz;
            normal[42] = -1.0;
            normal[43] = 0.0;
            normal[44] = 0.0;
            uv[28] = 0.0;
            uv[29] = 0.0;

            vertexes[45] = centerx - dx;
            vertexes[46] = centery - dy;
            vertexes[47] = centerz + dz;
            normal[45] = -1.0;
            normal[46] = 0.0;
            normal[47] = 0.0;
            uv[30] = 0.0;
            uv[31] = 0.0;

            // top
            // +ve z plane
            vertexes[48] = centerx - dx;
            vertexes[49] = centery + dy;
            vertexes[50] = centerz + dz;
            normal[48] = 0.0;
            normal[49] = 0.0;
            normal[50] = 1.0;
            uv[32] = 0.0;
            uv[33] = 1.0;

            vertexes[51] = centerx - dx;
            vertexes[52] = centery - dy;
            vertexes[53] = centerz + dz;
            normal[51] = 0.0;
            normal[52] = 0.0;
            normal[53] = 1.0;
            uv[34] = 0.0;
            uv[35] = 0.0;

            vertexes[54] = centerx + dx;
            vertexes[55] = centery - dy;
            vertexes[56] = centerz + dz;
            normal[54] = 0.0;
            normal[55] = 0.0;
            normal[56] = 1.0;
            uv[36] = 1.0;
            uv[37] = 0.0;

            vertexes[57] = centerx + dx;
            vertexes[58] = centery + dy;
            vertexes[59] = centerz + dz;
            normal[57] = 0.0;
            normal[58] = 0.0;
            normal[59] = 1.0;
            uv[38] = 1.0;
            uv[39] = 1.0;

            // bottom
            // -ve z plane
            vertexes[60] = centerx + dx;
            vertexes[61] = centery + dy;
            vertexes[62] = centerz - dz;
            normal[60] = 0.0;
            normal[61] = 0.0;
            normal[62] = -1.0;
            uv[40] = 0.0;
            uv[41] = 1.0;

            vertexes[63] = centerx + dx;
            vertexes[64] = centery - dy;
            vertexes[65] = centerz - dz;
            normal[63] = 0.0;
            normal[64] = 0.0;
            normal[65] = -1.0;
            uv[42] = 0.0;
            uv[43] = 0.0;

            vertexes[66] = centerx - dx;
            vertexes[67] = centery - dy;
            vertexes[68] = centerz - dz;
            normal[66] = 0.0;
            normal[67] = 0.0;
            normal[68] = -1.0;
            uv[44] = 1.0;
            uv[45] = 0.0;

            vertexes[69] = centerx - dx;
            vertexes[70] = centery + dy;
            vertexes[71] = centerz - dz;
            normal[69] = 0.0;
            normal[70] = 0.0;
            normal[71] = -1.0;
            uv[46] = 1.0;
            uv[47] = 1.0;

            var indexes = new osg.Uint16Array(36);
            indexes[0] = 0;
            indexes[1] = 1;
            indexes[2] = 2;
            indexes[3] = 0;
            indexes[4] = 2;
            indexes[5] = 3;

            indexes[6] = 4;
            indexes[7] = 5;
            indexes[8] = 6;
            indexes[9] = 4;
            indexes[10] = 6;
            indexes[11] = 7;

            indexes[12] = 8;
            indexes[13] = 9;
            indexes[14] = 10;
            indexes[15] = 8;
            indexes[16] = 10;
            indexes[17] = 11;

            indexes[18] = 12;
            indexes[19] = 13;
            indexes[20] = 14;
            indexes[21] = 12;
            indexes[22] = 14;
            indexes[23] = 15;

            indexes[24] = 16;
            indexes[25] = 17;
            indexes[26] = 18;
            indexes[27] = 16;
            indexes[28] = 18;
            indexes[29] = 19;

            indexes[30] = 20;
            indexes[31] = 21;
            indexes[32] = 22;
            indexes[33] = 20;
            indexes[34] = 22;
            indexes[35] = 23;

            g.getAttributes().Vertex = new osg.BufferArray(
                osg.BufferArray.ARRAY_BUFFER,
                vertexes,
                3
            );
            g.getAttributes().Normal = new osg.BufferArray(osg.BufferArray.ARRAY_BUFFER, normal, 3);
            g.getAttributes().TexCoord0 = new osg.BufferArray(osg.BufferArray.ARRAY_BUFFER, uv, 2);

            var primitive = new osg.DrawElements(
                osg.primitiveSet.TRIANGLES,
                new osg.BufferArray(osg.BufferArray.ELEMENT_ARRAY_BUFFER, indexes, 1)
            );
            g.getPrimitives().push(primitive);
            return g;
        }
    };
    window.CShapeHelper = ShapeHelper;
})();
