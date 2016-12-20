var fctInit = require('fct.init');
var registerSources = require('register.sources');
var checkWl = {
    
    run: function(){
        
        for(var R in Memory.whiteList){
            if(Game.rooms[R] != undefined){
                
                let Hostile = Game.rooms[R].find(FIND_HOSTILE_CREEPS);
                if( Hostile.length && Hostile[0].owner.username === 'Spedwards'){
                    if(R ==='W78S32' || R === 'W77S33'){
                        if(Game.flags[R]){
                           if(Game.flags[R].color === COLOR_RED){
                                Game.flags[R].setColor(COLOR_WHITE)
                                fctInit.run();
                            } 
                        }
                    }
                    
                }
                
                else if( !Hostile.length ){
                    
                    if(Game.flags[R]){
                       if(Game.flags[R].color === COLOR_RED){
                            Game.flags[R].setColor(COLOR_WHITE)
                            fctInit.run();
                        } 
                    }
                    
                    
                    if(Memory.Rooms[R].S === undefined ){
                        registerSources.run(R);
                    }
                    
                    
                    var mapers = _.filter(Game.creeps, (creep) => creep.memory.role == 'maper');
                    
                    if(Memory.whiteList[R] == "Closed"){
                        if(_.filter(mapers, (creep) => creep.memory.destRoom == R).length>0){
                            if(_.filter(mapers, (creep) => creep.room.name == R).length>0 ){
                                if(Game.rooms[R].controller && !Game.rooms[R].controller.safeMode){
                                    Memory.whiteList[R] = "Ready";
        
                                }
                                
                            }
                        }
                    }
                    
                   let Controller = Game.rooms[R].controller;
                   
                   if(Controller != undefined){
                       
                       if(!Controller.my){
                           
                           if(Controller.safeMode > 0){
                               Memory.whiteList[R] = "Closed";
                               
                               fctInit.run()
                                
                            }
                            else{
                                if(Memory.waitColon == ""){
                                    Memory.waitColon = R;
                                }
                                if(Memory.whiteList[R] == "Closed"){
                                    Memory.whiteList[R] = "WtMaper";
                                    Memory.Rooms[R]['CL'][3] =5;
                                    fctInit.run()
                                }
                            }
                       }
                   }
                }
                else{
                    if(Game.flags[R].setColor(COLOR_RED) === OK){
                        fctInit.run();
                    }
                    
                }
                
            }
            
            
        }
        
    }
};

module.exports = checkWl;