var createBody = require('create.body');

var checkCreepSpawn = {
    run:function(){
        
        var Body = Memory.body;
        var CL= Memory.creepsLimitsTotals;
        var WL= Memory.whiteList;
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        L = harvesters.length;
        if(L < CL[0] ) {
            var newName = Game.spawns['First'].createCreep(createBody.run(2,3,3,0), "harvester" + Memory.N[0], {role: 'harvester', sourceId: ""});
            if(newName == ERR_NOT_ENOUGH_ENERGY){
                newName = Game.spawns['First'].createCreep(createBody.run(2,2,2,0), "harvester" + Memory.N[0], {role: 'harvester', sourceId: ""});
                if(newName == ERR_NOT_ENOUGH_ENERGY){
                    newName = Game.spawns['First'].createCreep(createBody.run(1,2,2,0), "harvester" + Memory.N[0], {role: 'harvester', sourceId: ""});
                }
            }
            if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                Memory.N[0] = Memory.N[0] + 1
                return newName;
            };
        }
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        L = upgraders.length
        if(L < CL[1] ) {
            var newName = Game.spawns['First'].createCreep(Body["upgrader"], "upgrader" + Memory.N[1], {role: 'upgrader',upgrading: false});
            if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                Memory.N[1] = Memory.N[1] + 1
                return newName;
            };
        }
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        L = builders.length
        if(L < CL[2] ) {
            
            var newName = Game.spawns['First'].createCreep(createBody.run(3,2,2), "builder" + Memory.N[2], {role: 'builder', building:false});
            if(newName == ERR_NOT_ENOUGH_ENERGY){
                newName = Game.spawns['First'].createCreep(createBody.run(2,2,2), "builder" + Memory.N[2], {role: 'builder', building:false});
                if(newName == ERR_NOT_ENOUGH_ENERGY){
                    newName = Game.spawns['First'].createCreep(createBody.run(2,1,1), "builder" + Memory.N[2], {role: 'builder', building:false});
                }
            }
            if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                Memory.N[2] = Memory.N[2] + 1
                return newName;
            };
        };
        var defensers = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenser');
        L = defensers.length
        if(L < CL[3] ) {
            for(var R in WL){
                if(_.filter(defensers, (creep) => creep.memory.destRoom == R).length < Memory.creepsLimits[R][3]){
                    var newName = Game.spawns['First'].createCreep(Body["defenser"], "defenser" + Memory.N[3], {role: 'defenser',destRoom: R, defensing: true});
                    if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                        Memory.N[3] = Memory.N[3] + 1
                        return newName;
                    };
                }
            }
            
        };
        var mecanos = _.filter(Game.creeps, (creep) => creep.memory.role == 'meca');
        L = mecanos.length
        if(L < CL[4] ) {
            var newName = Game.spawns['First'].createCreep(Body["meca"], "meca" + Memory.N[4], {role: 'meca',repairing: true,destRoom: "E78S43"});
            if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                Memory.N[4] = Memory.N[4] + 1
                return newName;
            };
        };
        
        var harvestnbuilds = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvestnbuild');
        L = harvestnbuilds.length
        if(L < CL[5]) {
            for(var R in WL){
                if(_.filter(harvestnbuilds, (creep) => creep.memory.destRoom == R).length < Memory.creepsLimits[R][5]){
                    var newName = Game.spawns['First'].createCreep(Body["harvestnbuild"], "harvestnbuild" + Memory.N[5], {role: 'harvestnbuild', destRoom: R});
                    if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                        Memory.N[5] = Memory.N[5] + 1
                        return newName;
                    };
                }
            }
            
        }
        
        var mapers = _.filter(Game.creeps, (creep) => creep.memory.role == 'maper');
        var maps_to_discover = _.filter(WL, (R) => "WtMaper")
        
        if(maps_to_discover.length) {
            
            for (var R in WL){
                
                if(WL[R]=="WtMaper"){
                    
                    if(_.filter(mapers, (creep) => creep.memory.destRoom == R).length>0){
                        if(_.filter(mapers, (creep) => creep.room.name == R).length>0){
                            Memory.whiteList[R] = "Ready";
                        }
                    }
                    else{
                
                        var newName = Game.spawns['First'].createCreep([MOVE,MOVE,MOVE], "maper_"+R, {role: 'maper', maping:true, destRoom: R});
                        if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName != ERR_NAME_EXISTS){
                            return newName;
                        };
                    };
                
                }
                
            };
            
        };
        
        return -1;
        
        
        
        
        
    }
    
}

module.exports = checkCreepSpawn;