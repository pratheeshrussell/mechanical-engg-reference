import { GraphObjId } from "./graph.constants";

export interface BaseGraphObject{
    makeObject(board:any,graphObject:any):void;
}

export type GraphDefinition<GraphExtaPropertyBaseDef>={
    description:string,
    graphObjs:GraphObjDefinition<GraphExtaPropertyBaseDef>[]
}

export type GraphExtraPropertyBaseDef = {
    name:string
    fillColor:string,
    strokeColor:string,
    strokeWidth:number
}
export type GraphObjDefinition<T>={
    coords: coords[],
    type: GraphObjId,
    extraProperties: T
}

export type coords=[number,number] | any;