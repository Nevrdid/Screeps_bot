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

        if(!creep.memory.upgrading && Memory.waitNewCreep <= 1 ) {
            
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy >= 0.8*structure.energyCapacity ;
                    }
            });
            for(var target in targets) {
                if(creep.withdraw(targets[target],RESOURCE_ENERGY)  == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[target]);
                };
                break;
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