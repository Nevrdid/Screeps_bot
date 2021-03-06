var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMaper = require('role.maper');
var roleDefense = require('role.defense');
var roleMeca = require('role.meca');
var roleHarvestnbuild = require('role.harvestnbuild');
var fctInit = require('fct.init');
var checkWl = require('check.wl');
var checkCreepSpawn = require('check.creepSpawn');

fctInit.run();
checkWl.run();
checkCreepSpawn.run();



module.exports.loop = function () {
    var CL= Memory.creepsLimitsTotals;
    var WL= Memory.whiteList;
    
    var Num = 0;
    for ( let R in WL ){  Num++  }
    
    var L = 0;
    for(let creep in Game.creeps){L++;}
    
    Memory.waitNewCreep = CL[0]+CL[1]+CL[2] + CL[3] + CL[4] + CL[5] +Num - L;
    
    if(!Game.time%10){
        checkWl.run();
    }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            
            delete Memory.creeps[name];
            
            console.log('Clearing non-existing creep memory:', name, ". Waiting for: ", Memory.waitNewCreep, " creeps.");
            
            
        }
    }
    
    if(!Game.spawns.First.spawning && Memory.waitNewCreep > 0){
        let newName = checkCreepSpawn.run();
        if(newName != -1){
            let CreepBody = Game.creeps[newName].body;
            let CreepBodyString = "";
            for(var B in CreepBody){
                CreepBodyString += ' ' + CreepBody[B].type;
            }
            console.log("Spawn new creep : ", newName,'. Body :', CreepBodyString," . Waiting for: ", Memory.waitNewCreep-1 , " creeps.");
            
        }
    }
    for(let Name in Game.creeps) {
        let creep = Game.creeps[Name];
        var roleInMap = _.filter(Game.creeps, (C) => (C.memory.role == creep.memory.role && C.memory.destRoom == creep.memory.destRoom)).length;
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if( creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if( creep.memory.role == 'maper') {
            roleMaper.run(creep);
        }
        else if( creep.memory.role == 'defenser') {
            if(roleInMap > Memory.creepsLimits[creep.memory.destRoom][3]){
                for(let R in WL){
                    if( _.filter(Game.creeps, (C) => (C.memory.role == creep.memory.role && C.memory.destRoom == R)).length < Memory.creepsLimits[R][3] ){
                        creep.memory.destRoom = R;
                    }
                }
            }
            roleDefense.run(creep);
        }
        else if( creep.memory.role == 'meca') {
            roleMeca.run(creep);
        }
        else if(creep.memory.role == 'harvestnbuild') {
            roleHarvestnbuild.run(creep);
        }
    }
}