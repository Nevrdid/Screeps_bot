var attackPause = {

    /** @param {Creep} creep **/
    run: function(On) {
        if(On){
    
            var defensers = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenser');
            for(var creep in defensers){
                defensers[creep].memory.pause = true ;
            }
        }
        else{
            var defensers = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenser');
            for(var creep in defensers){
                defensers[creep].memory.pause = false ;
            }
        }
    }
    
}

module.exports = attackPause;