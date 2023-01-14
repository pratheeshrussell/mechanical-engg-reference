import { GraphDefinition, GraphExtraPropertyBaseDef } from "./graphObject";

export type GraphParam = {
    boundingbox?: [number, number, number, number],
    axis?: boolean,
    showCopyright?: boolean,
    renderer?: ('svg' | 'canvas' | 'vml' | 'no' | 'auto'),
    keepAspectRatio?:boolean,
    grid?: boolean,
    showNavigation?: boolean,
    showInfobox?: boolean,
    offsetX?:number,offsetY?:number,
    defaultAxes?: {
        x?:AxisDefinition,
        y?:AxisDefinition
    },
    // [key:string]:any,
};

type AxisDefinition = {
    visible?: boolean,
    name?: string,
    withLabel?: boolean,
    ticks?: { visible?: boolean, majorHeight?: number, minorTicks?: number, },
    label?: {
        autoPosition?: boolean, fontSize?: number,
        offset?: [number, number],
        usemathjax?:boolean,
        color?:string,
        [key:string]:any,
    }
}


export type CustomAxisParams={
    origin:[number,number],
    type:('linear'|'polar'),
    x:CustomAxisDefinition,
    y:CustomAxisDefinition
}
type CustomAxisDefinition={
    title:string,
    ticks:number,
    show:boolean,  
}

export type LocalAxisObjects={
    axis:any,
    line:any,
    title:any,
    ticks:any
}

export type GraphUpdatedEvent = {
    graphData:GraphDefinition<GraphExtraPropertyBaseDef>[],
    currentIndex:number
}