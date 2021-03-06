
var getSourceId = require('get.sourceId'); 

var roleHarvester = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        
        
        if(creep.memory.harvesting ) {
            
            var Sourc = Game.getObjectById(creep.memory.sourceId)
            
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
                    
                    if(creep.moveTo(exit) !=  OK){
                            PathFinder.use(true);
                                let Next = PathFinder.search(creep.pos,{pos: exit, range: 0}).path[0]
                            PathFinder.use(false);
                            
                            creep.move(creep.pos.getDirectionTo(Next))
                            
                        };
                }
                else{
                
                   
                    if(creep.harvest(Sourc)== ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(Sourc) !=  OK){
                            PathFinder.use(true);
                                let Next = PathFinder.search(creep.pos,{pos: Sourc.pos, range: 1}).path[0]
                            PathFinder.use(false);
                            
                            creep.move(creep.pos.getDirectionTo(Next))
                            
                        };
                        
                        
                        /**
                        creep.memory.path = creep.pos.findPathTo(Sourc.pos);
                        Path= creep.memory.path
                        creep.move(Path[0].direction);
                        **/
                        
                    }
                }
            }
            else{
                getSourceId.run(creep);
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
                
                if(creep.moveTo(exit) !=  OK){
                            PathFinder.use(true);
                                let Next = PathFinder.search(creep.pos,{pos: exit, range: 0}).path[0]
                            PathFinder.use(false);
                            
                            creep.move(creep.pos.getDirectionTo(Next))
                            
                        };
            }
            else{
                var targets = Game.spawns["First"].room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                for(var target in targets){
                    if(creep.transfer(targets[target], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(targets[target]) !=  OK){
                            PathFinder.use(true);
                                let Next = PathFinder.search(creep.pos,{pos: targets[target].pos, range: 1}).path[0]
                            PathFinder.use(false);
                            
                            creep.move(creep.pos.getDirectionTo(Next))
                            
                        };
                        break;
                    };
                };
            }
        };
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.memory.moving = true;
            creep.memory.sourceId = "";
            creep.say('emptyCargo');
        }
        if(!creep.memory.harvesting && creep.carry.energy == 0 ) {
            creep.memory.moving = true;
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }
    }
};

module.exports = roleHarvester;