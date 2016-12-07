var urgBack = {

    /** @param {Creep} creep **/
    run: function() {
        for(var creep in Game.creeps){
            var Cr=Game.creeps[creep];
            var rol = Cr.memory.role
            if(rol == "harvester"){
                Cr.memory.sourceId="";
                Cr.memory.harvesting=false;
            }
            if(rol == "upgrader"){
                Cr.memory.upgrading=false;
            }
            if(rol == "builder"){
                Cr.memory.building=false;
            }
            if(rol == "maper"){
                Cr.memory.destRoom="";
                Cr.memory.maping=false;
            };
        };
    }
};


module.exports = urgBack;