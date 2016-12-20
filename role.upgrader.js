var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('takingEnergy');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(!creep.memory.upgrading ) {
            
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy >= 0.8*structure.energyCapacity ;
                    }
            });
            for(var target in targets) {
                let WithDraw = creep.withdraw(targets[target],RESOURCE_ENERGY)
                    if( WithDraw == ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(targets[target]) !=  OK){
                            
                            let Next = PathFinder.search(creep.pos,{pos: targets[target].pos, range: 1}).path[0]
                           
                            creep.move(creep.pos.getDirectionTo(Next))
                            
                        };
                    }
                    else if(WithDraw === OK){
                        break;
                    };
            };
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            };
        };
    }

};

module.exports = roleUpgrader;