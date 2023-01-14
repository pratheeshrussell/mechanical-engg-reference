import { GraphExtraPropertyBaseDef } from "./graphObject";

export enum GraphObjId {
    POINT = 1,
    LINE = 2,
    CIRCLE = 3,
    POLYGON = 4,
    POLYLINE = 5
}

// POINT PARAMS
export interface PointExtraPropertyDef extends GraphExtraPropertyBaseDef {
    
}



// LINE PARAMS
export enum LineDashTypes {
    SOLID=0, DOTTED_LINE=2, SMALL_DASH=3,
    MEDIUM_DASH=4,BIG_DASH=5,ALTERNATING_LARGE_GAP=6,
    ALTERNATING_SMALL_GAP=7
}
export enum ArrowTypes  {
    NONE=0,TYPE1=1,TYPE2=2,TYPE3=3,TYPE4=4,TYPE5=5,
    TYPE6=6,TYPE7=7
}
export interface LineExtraPropertyDef extends GraphExtraPropertyBaseDef {
    firstArrow:ArrowTypes,
    lastArrow:ArrowTypes,
    straightFirst:boolean,straightLast:boolean,
    dash:LineDashTypes
}
//
export interface CircleExtraPropertyDef extends GraphExtraPropertyBaseDef {
    dash:LineDashTypes,
    fillopacity:number
}