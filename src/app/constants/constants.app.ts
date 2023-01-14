import { CustomAxisParams, GraphParam } from "../appcommon/components/graph-plotter/types/graphParams";

export class AppConstants{
    static get  defaultGraphParams() : GraphParam{
        const defaultParam: GraphParam = {
            boundingbox: [-5,5,5,-5],// -x,y,+x,-y
            keepAspectRatio: true,
            axis: false,
            offsetX:0,offsetY:0,
            showCopyright: false, renderer: 'auto',
            grid: true,
            showNavigation: true,
            showInfobox: true,
            // defaultAxes: {
            //     x: {
            //       visible: true,
            //       name: '$$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$',
            //       withLabel: true,
            //       ticks: { visible: true, majorHeight: 0, minorTicks: 0, },
            //       label: {
            //         autoPosition: true, fontSize: 20,
            //         offset: [10, 20], usemathjax: true,
            //         position: 'rt',
            //         display: 'html',
            //         color:"pink"
            //       }
            //     },
            //     y: {
            //       visible: true,
            //       withLabel: true,
            //       name: "Y-title",
            //       ticks: { visible: true, },
            //       label: {
            //         autoPosition: true, fontSize: 20,
            //         usemathjax: true, color:"pink"
            //       }
            //     }
            //   }
        };
        return {...defaultParam};
    };


    static get  defaultAxisParams() : CustomAxisParams{
      const defaultParam: CustomAxisParams = {
          origin:[0,0],
          type:'linear',
          x:{
            title:'X-Title',
            ticks:1,
            show:true,
          },
          y:{
            title:'Y-Title',
            ticks:1,
            show:true,
          }
      };
      return {...defaultParam};
  };
}