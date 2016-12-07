
var getSourceId = require('get.sourceId'); 
var pathFind = require('path.find');

var roleHarvester = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.harvesting ) {
            if(creep.harvest(Game.getObjectById(creep.memory.targetId)) != OK){
                
                var Path = pathFind.run(creep);
                
                if(Path[0] != undefined){
                    creep.move(Path[0].direction);
                    
                }
                else{
                    
                    getSourceId.run(creep);
                }
            }
        }
        else {
            if(Memory.waitNewCreep <=0){
                creep.build(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES))
            }
            var targets = Game.spawns["First"].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length){
                creep.memory.targetId = targets[0].id
            
                
                
                if(creep.transfer(Game.getObjectById(creep.memory.targetId), RESOURCE_ENERGY) != OK){
                    var Path = pathFind.run(creep);
                
                    if(Path[0] != undefined){
                        creep.move(Path[0].direction);
                    }
                }
            }
            
                
            
            
            
        };
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.memory.moving = true;
            creep.memory.targetId = "";
            creep.memory.destRoom ="";
            creep.say('emptyCargo');
        }
        if(!creep.memory.harvesting && creep.carry.energy == 0 ) {
            creep.memory.moving = true;
            creep.memory.harvesting = true;
            creep.memory.targetId="";
            creep.memory.destRoom = "";
            creep.say('harvesting');
        }
    }
};

module.exports = roleHarvester;