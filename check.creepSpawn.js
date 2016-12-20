var createBody = require('create.body');
var getSourceId = require('get.sourceId');
var fctInit = require('fct.init');

var checkCreepSpawn = {
    run:function(){


        var Body = Memory.body;
        var CL= Memory.creepsLimitsTotals;
        var WL= Memory.whiteList;

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let H = harvesters.length;

        var cargos = _.filter(Game.creeps, (creep) => creep.memory.role == 'cargo');
        let C = cargos.length

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let U = upgraders.length

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let B = builders.length
        
        var defensers = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenser');
        let D = defensers.length

        var mecanos = _.filter(Game.creeps, (creep) => creep.memory.role == 'meca');
        let M = mecanos.length

        var mapers = _.filter(Game.creeps, (creep) => creep.memory.role == 'maper');
        var maps_to_discover = _.filter(WL, (R) => "WtMaper")

        if(maps_to_discover.length) {

            for (var R in WL){

                if(WL[R]=="WtMaper"){

                    if(_.filter(mapers, (creep) => creep.memory.destRoom == R).length>0){
                        if(_.filter(mapers, (creep) => creep.room.name == R).length>0 ){
                            if(Game.rooms[R].controller && !Game.rooms[R].controller.safeMode){
                                Memory.whiteList[R] = "Ready";

                            }
                        }
                    }
                    else{

                        var newName = Game.spawns['First'].createCreep([MOVE], "maper_"+R, {role: 'maper', maping:true, destRoom: R});
                        if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName != ERR_NAME_EXISTS){
                            return newName;
                        };
                    };

                }

            };

        };
        if(Game.time%5 ==0 ){
            console.log([H,U,B,D,M,C], " -> ", CL)
        }


        if(H < CL[0]  && H <= C & U>0) {
            let srcId = getSourceId.run();

            if(srcId != ""){
                let src = Game.getObjectById(srcId);
                if(src != undefined){
                    let SDatas = _.filter(Memory.Rooms[src.room.name]['S'], (sr) => sr.id === srcId)[0]
                    let I = Math.round(src.energyCapacity/(HARVEST_POWER*ENERGY_REGEN_TIME));
                    while(I >0){
                        let Index = SDatas['Index']
                        let Srcs = Memory.Rooms[src.room.name].S
                        if(Srcs[Index].Places>= I){

                             var newName = Game.spawns['First'].createCreep(createBody.run(Math.round(SDatas['Work']*I),0,1,0), "harvester" + Memory.N[0],
                                {role: 'harvester', targetId: srcId, cargo :"", path: ""});
                            if(newName === -3 ){
                                Memory.N[0] = Memory.N[0] + 1;

                                newName = Game.spawns['First'].createCreep(createBody.run(Math.rounf(SDatas['Work']*I),0,1,0), "harvester" + Memory.N[0],
                                {role: 'harvester', targetId: srcId, cargo :"", path: ""});
                            }
                            if(!(newName<0)){






                                    Memory.Rooms[src.room.name].S[Index].Places= Memory.Rooms[src.room.name].S[Index].Places - I;
                                    Memory.Rooms[src.room.name].Places = Memory.Rooms[src.room.name].Places - I;

                                    //Memory.Rooms[src.room.name].S[Index].Work= I*Memory.Rooms[src.room.name].S[Index].Work

                                    /**
                                    Memory.Rooms[src.room.name].S[Index].Work = Math.round(
                                            src.energyCapacity/(HARVEST_POWER*ENERGY_REGEN_TIME*Memory.Rooms[src.room.name].S[Index].Places));
                                    **/
                                    console.log('Source changed to ',Memory.Rooms[src.room.name].Places,' places : ',src.room.name , ' - (', src.pos.x, ',',src.pos.y,')')

                                Game.creeps[newName].memory.Cost = Srcs[Index].Cost;
                                Memory.N[0] = Memory.N[0] + 1;
                                fctInit.run();
                                return newName;


                            }


                        }
                        I--
                    }




                    /**
                    var newName = Game.spawns['First'].createCreep(createBody.run(SDatas['Work']*2,0,1,0), "harvester" + Memory.N[0],
                            {role: 'harvester', targetId: srcId, cargo :"", path: ""});


                    if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                        let Index = SDatas['Index']
                        let Srcs = Memory.Rooms[src.room.name].S
                        if(Srcs[Index].Places> 1){


                            Memory.Rooms[src.room.name].S[Index].Places= Memory.Rooms[src.room.name].S[Index].Places - 1;
                            Memory.Rooms[src.room.name].Places = Memory.Rooms[src.room.name].Places - 1;

                            Memory.Rooms[src.room.name].S[Index].Work= Math.round(
                                    src.energyCapacity/(HARVEST_POWER*ENERGY_REGEN_TIME*Memory.Rooms[src.room.name].S[Index].Places));
                            console.log('Source changed to ',Memory.Rooms[src.room.name].Places,' places : ',src.room.name , ' - (', src.pos.x, ',',src.pos.y,')')
                        }

                    }
                    else{
                        var newName = Game.spawns['First'].createCreep(createBody.run(SDatas['Work'],0,1,0), "harvester" + Memory.N[0],
                                {role: 'harvester', targetId: srcId, cargo :"", path: ""});

                    }**/



                }
            }
        }
        if(C < CL[5] && ( C < H || H>= CL[0] ) &&  U>0) {
            for(var R in WL){
                if(_.filter(cargos, (creep) => creep.memory.destRoom == R).length < Memory.Rooms[R]['CL'][5]){
                    var newName = Game.spawns['First'].createCreep(createBody.run(0,6,5), "cargo" + Memory.N[5], {role: 'cargo'});

                    if (newName === ERR_NOT_ENOUGH_ENERGY ){
                        newName = Game.spawns['First'].createCreep(createBody.run(0,5,4), "cargo" + Memory.N[5], {role: 'cargo'});
                        if (newName === ERR_NOT_ENOUGH_ENERGY ){
                            newName = Game.spawns['First'].createCreep(createBody.run(0,4,3), "cargo" + Memory.N[5], {role: 'cargo'});
                            if (newName === ERR_NOT_ENOUGH_ENERGY ){
                                newName = Game.spawns['First'].createCreep(createBody.run(0,3,2), "cargo" + Memory.N[5], {role: 'cargo'});
                                if (newName === ERR_NOT_ENOUGH_ENERGY ){
                                    newName = Game.spawns['First'].createCreep(createBody.run(0,2,1), "cargo" + Memory.N[5], {role: 'cargo'});
                                }

                            }
                        }
                    }

                    if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                        Memory.N[5] = Memory.N[5] + 1
                        return newName;
                    };
                }
            }

        }
        if( U === 0 || ( H >= CL[0] && C >= CL[5])){
            if(U < CL[1] ){
                var newName = Game.spawns['First'].createCreep(Body["upgrader"], "upgrader" + Memory.N[1], {role: 'upgrader',upgrading: false});
                if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                    Memory.N[1] = Memory.N[1] + 1
                    return newName;
                };
            }
            if(B < CL[2]) {

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
            }
        }
        if(D < CL[3] ) {
            for(var R in WL){
                if(_.filter(defensers, (creep) => creep.memory.destRoom == R).length < Memory.Rooms[R]['CL'][3]){
                    var newName = Game.spawns['First'].createCreep(createBody.run(0,0,4,4), "defenser" + Memory.N[3], {role: 'defenser',destRoom: R, defensing: true});
                    if (newName === ERR_NOT_ENOUGH_ENERGY ){
                         newName = Game.spawns['First'].createCreep(createBody.run(0,0,2,2), "defenser" + Memory.N[3], {role: 'defenser',destRoom: R, defensing: true});
                    }
                    if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){

                        Memory.N[3] = Memory.N[3] + 1
                        return newName;
                    };
                }
            }

        }
        if(M < CL[4] ) {
            var newName = Game.spawns['First'].createCreep(Body["meca"], "meca" + Memory.N[4], {role: 'meca',repairing: true,destRoom: "E78S43"});
            if(newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY && newName !=ERR_NAME_EXISTS){
                Memory.N[4] = Memory.N[4] + 1
                return newName;
            };
        }


        return -1;
    }

}

module.exports = checkCreepSpawn;
