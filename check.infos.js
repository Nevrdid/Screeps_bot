

var checkInfos = {
    run:function(){
        let E = Game.spawns['First'].room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
                            }
        });
        let Amount =0
        for(var Struct in E){
            Amount+=E[Struct].energy
        }
        console.log("Energy : ", Amount, " | Clvl : ", Game.spawns['First'].room.controller.level, " | Cprogress : ", Game.spawns['First'].room.controller.progress,
            "/", Game.spawns['First'].room.controller.progressTotal)
    } 
};
module.exports = checkInfos;