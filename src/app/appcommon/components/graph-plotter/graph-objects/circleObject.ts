import { CircleExtraPropertyDef} from "../types/graph.constants";
import { BaseGraphObject, GraphObjDefinition } from "../types/graphObject";

export class CircleObject implements BaseGraphObject{
    makeObject(board:any,graphObject: GraphObjDefinition<CircleExtraPropertyDef>): void {
        const coord = graphObject.coords;
        if (coord.length < 2) { return; }
        
        board.create('circle', [...coord],
        {
            name: graphObject.extraProperties.name,
            strokeColor: graphObject.extraProperties.strokeColor,
            fillColor: graphObject.extraProperties.fillColor,
            dash: graphObject.extraProperties.dash, 
            fillOpacity: graphObject.extraProperties.fillopacity,
            fixed:true
        });
    } 
}