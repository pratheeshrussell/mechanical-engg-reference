import { ArrowTypes, LineExtraPropertyDef } from "../types/graph.constants";
import { BaseGraphObject, GraphObjDefinition } from "../types/graphObject";

export class LineObject implements BaseGraphObject {
    makeObject(board: any, graphObject: GraphObjDefinition<LineExtraPropertyDef>): void {
        const coord = graphObject.coords;
        if (coord.length < 2) { return; }

        board.create('line', [...coord],
            {
                name: graphObject.extraProperties.name,
                 strokeColor: graphObject.extraProperties.strokeColor,
                 fillColor: graphObject.extraProperties.fillColor,
                 dash: graphObject.extraProperties.dash,
                 firstArrow: (graphObject.extraProperties.firstArrow === ArrowTypes.NONE) ? false : { type: graphObject.extraProperties.firstArrow },
                 lastArrow: (graphObject.extraProperties.lastArrow === ArrowTypes.NONE) ? false : { type: graphObject.extraProperties.lastArrow },
                 strokeWidth: 2, straightFirst: graphObject.extraProperties.straightFirst, straightLast: graphObject.extraProperties.straightLast,
                 fixed:true
            });

    }
}