var targetRoom = {

    /** @param {Creep} creep **/
    run: function(Rooom) {

        var defensers = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenser');
        for(var creep in defensers){
            defensers[creep].memory.destRoom = Rooom;
        }
    }
    
}

module.exports = targetRoom;