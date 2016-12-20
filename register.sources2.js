var registerSources = {
	run: function(nameRoom){
		var Srcs = Game.rooms[nameRoom].find(FIND_SOURCES)
		
       if(Memory.Rooms[nameRoom]=== undefined){
           Memory.Rooms[nameRoom]={}
       }
        Memory.Rooms[nameRoom]['S'] = Srcs
        let TotalPlaces =0;
        for(var N in Srcs){
            
           let Places = Game.rooms[nameRoom].lookForAtArea( LOOK_TERRAIN ,Srcs[N].pos.y-1,Srcs[N].pos.x-1,Srcs[N].pos.y+1,Srcs[N].pos.x+1, true);
           Place = _.filter(Places, (object) => (object['terrain'] === 'plain' && !object['structure']));
           if(Place){
               Game.rooms[nameRoom].createConstructionSite(Place.pos)
               Memory.Sources[Srcs[N].id].Pos = Place
               Memory.SourcesId.push(Srcs[N].id)
           }
           
           Memory.Rooms[nameRoom].S[N]['Cost'] = PathFinder.search(Game.spawns.First.pos, Srcs[N]).cost ;
           Memory.Rooms[nameRoom].S[N]['Work'] = 
               Srcs[N].energyCapacity/(HARVEST_POWER*ENERGY_REGEN_TIME*Places);
           Memory.Rooms[nameRoom].S[N]['Places'] = Places ;
           Memory.Rooms[nameRoom].S[N]['InitialPlaces'] = Places ;
           console.log(Places);
           TotalPlaces += Places;
           Memory.Rooms[nameRoom].S[N]['Index'] = N;
           
        }
        Memory.Rooms[nameRoom]['Places'] = TotalPlaces;
        Memory.Rooms[nameRoom]['InitialPlaces'] = TotalPlaces;
		
		
	}
	
	
};
module.exports = registerSources;