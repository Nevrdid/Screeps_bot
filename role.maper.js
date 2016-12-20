var fctInit = require('fct.init');

var roleMaper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        var route=[]
        
        if(creep.memory.maping){
            if(creep.ticksToLive<50 || creep.hits<25){
                Memory.whiteList[creep.room.name]="WtMaper";
                creep.memory.role="";
                creep.memory.maping=false;
                creep.suicide()
                fctInit.run()
            }
            else{
                
                route = Game.map.findRoute(creep.room.name,creep.memory.destRoom,{
                    routeCallback(roomName){
                        if( roomName === creep.memory.destRoom) {	// allow this room			
    			            return 1;
    		            }
    		            else if(Memory.whiteList[roomName] === "Closed"){
    		                return Infinity;
    		            }
    		            else if(roomName === "S76E39"){
    		                return Infinity;
    		            }
    	            	return 1;
                    }
                });
            
            }
        }
        else{
            route = Game.map.findRoute(creep.room.name,Game.spawns["First"].room.name,{
                routeCallback(roomName){
                    if(Memory.whiteList[roomName]=="Closed") {	// avoid this room			
			            return Infinity;
		            }
		            else if(roomName === "S76E39"){
		                return Infinity;
		            }
	            	return 1;
                }
            });
            
        }
        
        creep.memory.route = route;
        
        if(route.length>0){
            
            let exit = creep.pos.findClosestByRange(route[0].exit);
            if(creep.moveTo(exit) !=  OK){
                PathFinder.use(true);
                    let Next = PathFinder.search(creep.pos,{pos: exit, range: 0}).path[0]
                PathFinder.use(false);
                            
                creep.move(creep.pos.getDirectionTo(Next))
                            
            };
        }
        else{
            if(!Game.flags[creep.room.name]){
                
                delete Memory.Rooms[creep.room.name]
                creep.suicide();
                fctInit.run();
            }
            else{
                creep.moveTo(Game.flags[creep.room.name].pos)
                if(creep.pos === Game.flags[creep.room.name].pos && Game.flags[creep.room.name].color === COLOR_RED ){
                    Game.flags[creep.room.name].setColor(COLOR_ORANGE)
                    
                }
            }
            
        }
        
        
    }
};

module.exports = roleMaper;