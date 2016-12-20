
var getConstrId = require('get.constrId'); 

var roleBuilder = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        
        
        if(creep.memory.building ) {
            
            var Sourc = Game.getObjectById(creep.memory.constrId)
            
            if(Sourc){
                
                var M = creep.memory._move
                if(M){
                    if(!M["path"]){
                        creep.memory.moving = false;
                    }
                    else{
                        creep.memory.moving = true;
                    }
                }
                
                var route = Game.map.findRoute(creep.room,Sourc.room.name,{
                    routeCallback(roomName){
                        if(roomName == 'E79S43') {	// avoid this room			
    			            return Infinity;
    		            }
    	            	return 1;
                    }
                });
                if(route.length>0){
                    var exit = creep.pos.findClosestByRange(route[0].exit);
                    PathFinder.use(true);
                        if(creep.moveTo(exit) == ERR_NO_PATH){
                            creep.moveTo(Math.floor(Math.random()*50),Math.floor(Math.random()*50))
                        }
                        PathFinder.use(false);
                }
                else{
                
                   
                    if(creep.build(Sourc)== ERR_NOT_IN_RANGE) {
                        PathFinder.use(true);
                        if(creep.moveTo(Sourc) == ERR_NO_PATH){
                            creep.moveTo(Math.floor(Math.random()*50),Math.floor(Math.random()*50))
                        }
                        PathFinder.use(false);
                        
                        /**
                        creep.memory.path = creep.pos.findPathTo(Sourc.pos);
                        Path= creep.memory.path
                        creep.move(Path[0].direction);
                        **/
                        
                    }
                }
            }
            else{
                getConstrId.run(creep);
            }
            
        }
        else {
            var route = Game.map.findRoute(creep.room,Game.spawns["First"].room.name,{
                routeCallback(roomName){
                    if( roomName == 'E79S43') {	// avoid this room			
			            return Infinity;
		            }
	            	return 1;
                }
            });
            if(route.length>0){
                var exit = creep.pos.findClosestByRange(route[0].exit);
                
                if(creep.moveTo(exit) == ERR_NO_PATH){
                    creep.moveTo(Math.floor(Math.random()*50),Math.floor(Math.random()*50))
                }
                PathFinder.use(false);
            }
            else{
                var targets = Game.spawns["First"].room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                for(var target in targets){
                    if(creep.withdraw(targets[target],REconstr_ENERGY) == ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(targets[target]) == ERR_NO_PATH){
                            creep.moveTo(Math.floor(Math.random()*50),Math.floor(Math.random()*50))
                        }
                        PathFinder.use(false);
                        break;
                    };
                };
            }
        };
        if(creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = false;
            creep.memory.moving = true;
            creep.memory.constrId = "";
            creep.say('emptyCargo');
        }
        if(!creep.memory.building && creep.carry.energy == 0 ) {
            creep.memory.moving = true;
            creep.memory.building = true;
            creep.say('building');
        }
    }
};

module.exports = roleBuilder;