
var getSourceId = require('get.sourceId'); 
var pathFind = require('path.find');

var roleHarvester = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.fatigue){
            let Target = Game.getObjectById(creep.memory.targetId);
            
            if(creep.hits != creep.hitsMax || creep.ticksToLive <10 ){
                let Src = _.filter(Memory.Rooms[creep.room.name].S, (s) => s.id === creep.memory.targetId)
                
                if(Src){
                    
                    if(Memory.Rooms[creep.room.name].S[Src[0]['Index']].Places + _.filter(creep.body, (b) => (b.type === WORK)).length 
                        > Memory.Rooms[creep.room.name].S[Src[0]['Index']].InitialPlaces){
                            
                        Memory.Rooms[creep.room.name].S[Src[0]['Index']].Places =  Memory.Rooms[creep.room.name].S[Src[0]['Index']].InitialPlaces
                    }
                    else{
                         Memory.Rooms[creep.room.name].S[Src[0]['Index']].Places += _.filter(creep.body, (b) => (b.type === WORK)).length
                    }
                }
                
                
               
                return -50 ;
                
            }
            if(creep.memory.targetId === "") {
                getSourceId.run(creep);
                creep.say('Harvesting !');
            }
            else {
                
                let Cargo = Game.getObjectById(creep.memory.cargo);
                
                if(!Cargo || !(Cargo.memory.harvesterId === creep.id) ){
                    creep.memory.cargo = ""
                }
            }
            let result = creep.harvest(Target)
            
            if(result !=OK){
            
                var Path = pathFind.run(creep);
                
                
                if(Path[0]){
                    creep.move(Path[0].direction);
                    
                }
                else{
                    getSourceId.run(creep);
                    
                }
            }
            
            
        }
        
    }
};

module.exports = roleHarvester;