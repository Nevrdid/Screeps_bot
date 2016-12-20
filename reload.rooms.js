var fctInit = require('fct.init');
var checkWl = require('check.wl');
var checkInfos = require('check.infos')
var checkCreepSpawn = require('check.creepSpawn');

module.exports = {
    run:function(reset){
        if(reset){
            Memory.Rooms = {}
        }
    
    
        fctInit.run();
        checkWl.run();
        checkCreepSpawn.run();
    }
};