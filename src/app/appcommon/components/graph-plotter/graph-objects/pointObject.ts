import { PointExtraPropertyDef } from "../types/graph.constants";
import { BaseGraphObject, GraphObjDefinition } from "../types/graphObject";

export class PointObject implements BaseGraphObject{
    makeObject(board:any,graphObject: GraphObjDefinition<PointExtraPropertyDef>): void {
        const coord = graphObject.coords[0];
        if (coord.length < 1) { return; }
        const pt = board.create('point', [coord[0], coord[1]], { name:graphObject.extraProperties.name,
            visible: true, size: 1, label:{autoPosition: true, offset:[10, 10]}, fixed:true });
        return pt;
        } 
}