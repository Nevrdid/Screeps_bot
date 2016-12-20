
var getSourceId = require('get.sourceId'); 
var pathFind = require('path.find');

var roleHarvester = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        
        if(!creep.fatigue){
            if(creep.room.name !== creep.memory.OldRoom || creep.pos === creep.memory.OldPos){
                let PF = pathFind.run(creep,true);
                
                if(PF[0] != undefined){
                    creep.memory.path = Room.serializePath(PF);
                }
                
            }
            creep.memory.OldRoom = creep.room.name;
            creep.memory.OldPos = creep.pos;
            if(creep.memory.harvesting) {
                
                if(creep.harvest(Game.getObjectById(creep.memory.targetId)) != OK){
                    
                    if(creep.memory.path === "" || creep.memory.path < 0 || creep.memory.path == undefined){
                        let PF = pathFind.run(creep,false);
                        
                        if(!(PF < 0)){
                            creep.memory.path = Room.serializePath(PF);
                            
                        }
                    }
                    let Path = Room.deserializePath(creep.memory.path);
                    
                    if(Path){
                        if(creep.moveByPath(Path) !== OK){
                            creep.memory.path = "";
                            
                        }
                        
                    }
                }
            }else {
                
                if(Memory.waitNewCreep <= 0){
                    creep.build(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES))
                    
                }
                let Transfer = creep.transfer(Game.getObjectById(creep.memory.targetId), RESOURCE_ENERGY);
                
                if(Transfer === ERR_FULL || Transfer === ERR_INVALID_TARGET){
                     let targets = Game.spawns["First"].room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                    });
                    
                    if(targets.length){
                        creep.memory.targetId = targets[0].id
                        creep.memory.path = Room.serializePath(pathFind.run(creep,false));
                        let Path = Room.deserializePath(creep.memory.path);
                        
                        if(Path){
                            if(creep.fatigue == 0){
                                if(creep.moveByPath(Path) !== OK){
                                    creep.memory.path = "";
                                }
                            }
                        }
                    }
                }else if( Transfer === ERR_NOT_IN_RANGE){
                    
                    if(creep.memory.path === "" || creep.memory.path < 0 || creep.memory.path == undefined){
                        creep.memory.path = Room.serializePath(pathFind.run(creep,false));
                        
                    }
                    
                    let Path = Room.deserializePath(creep.memory.path);
                    if(Path){
                        if(creep.fatigue == 0){
                            if(creep.moveByPath(Path) !== OK){
                                creep.memory.path = "";
                                
                            }
                        }
                    }
                }
            }
        
        }
        if(creep.memory.harvesting && (creep.carry.energy == creep.carryCapacity || Memory.whiteList[creep.room.name] === "Closed")) {
            creep.memory.harvesting = false;
            creep.memory.moving = true;
            creep.memory.targetId = "";
            creep.memory.path="";
            creep.say('emptyCargo');
        }
        
        else if(!creep.memory.harvesting && creep.carry.energy == 0 ) {
            creep.memory.moving = true;
            creep.memory.harvesting = true;
            creep.memory.destRoom = "";
            creep.memory.targetId = "";
            creep.memory.path = "";
            getSourceId.run(creep);
            creep.say('harvesting');
        }
    }
};

module.exports = roleHarvester;