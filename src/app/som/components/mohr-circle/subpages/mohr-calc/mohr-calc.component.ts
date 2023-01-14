import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ArrowTypes, CircleExtraPropertyDef, GraphObjId, LineDashTypes, LineExtraPropertyDef, PointExtraPropertyDef } from 'src/app/appcommon/components/graph-plotter/types/graph.constants';
import { GraphDefinition, GraphExtraPropertyBaseDef, GraphObjDefinition} from 'src/app/appcommon/components/graph-plotter/types/graphObject';
import { GraphParam, CustomAxisParams, GraphUpdatedEvent } from 'src/app/appcommon/components/graph-plotter/types/graphParams';
import { AppConstants } from 'src/app/constants/constants.app';


declare var MathJax: any;
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mech-ref-mohr-calc',
  templateUrl: './mohr-calc.component.html',
  styleUrls: ['./mohr-calc.component.css']
})
export class MohrCalcComponent implements OnInit {
  // Ref https://mechanicalc.com/calculators/mohrs-circle/

  mohrForm: UntypedFormGroup = new UntypedFormGroup({
    x: new FormControl<number>(10, Validators.required),
    y: new FormControl<number>(-10, Validators.required),
    xy: new FormControl<number>(0, Validators.required)
  });
  boardParams: GraphParam = AppConstants.defaultGraphParams;
  axisParams: CustomAxisParams = AppConstants.defaultAxisParams;
  graphData:GraphDefinition<GraphExtraPropertyBaseDef>[] = [];
  solutionSteps:string[]=[]

  constructor() { }

  ngOnInit(): void {
    this.axisParams.x.title = "$$\\sigma$$";
    this.axisParams.y.title = "$$\\tau$$";
    this.boardParams.grid = false;
  }


  drawMohrCircle(): void {
    // https://www.onemathematicalcat.org/JSXGraphDocs/JSXGraphDocs.htm
    // calc mohr circle
    const inputx = +this.mohrForm.value.x;
    const inputy = +this.mohrForm.value.y;
    const inputxy = +this.mohrForm.value.xy;
    const centerpt = (inputx + inputy) / 2;
    const radius = Math.sqrt(Math.pow(((inputx - inputy) / 2), 2) 
    + Math.pow(inputxy, 2));

    this.graphData = [];

    this.setUpdatedGraphParams(centerpt, radius);  
    // draw it
    this.createGraphObjects(inputx,inputy,inputxy,centerpt,radius);
    this.updateGraph();
  }

  setUpdatedGraphParams(centerpt: number, radius: number) {
    // -x,y,+x,-y
    const mX =  (centerpt - (1.2 * radius));
    const pX = (centerpt + (1.2 * radius));
    if(radius !== 0){
      this.boardParams.boundingbox = [mX, (1.2 * radius), pX, (-1.2 * radius)];
    }else{
      // special case for pressure
      this.boardParams.boundingbox = [centerpt -5, 5, centerpt+5, -5];
    }
    this.axisParams.origin=[centerpt,0];
   
    // modify ticks
    const maxVal = (Math.abs(this.mohrForm.value.x) > Math.abs(this.mohrForm.value.y))
                   ? this.mohrForm.value.x : this.mohrForm.value.y;
    this.axisParams.x.ticks = maxVal / 10;
    this.axisParams.y.ticks = maxVal / 10;
  }

  createGraphObjects(inputx:number,inputy:number,
    inputxy:number,centerpt:number,radius:number){
      // Step 1: Mark the points sigmax and sigmay
      const step1:GraphDefinition<GraphExtraPropertyBaseDef>={
        description:`Mark the points $\\sigma_{x}$=${inputx} and $\\sigma_{y}$=${inputy} in the X-axis`,
        graphObjs:[]
      };
      const sigmax:GraphObjDefinition<PointExtraPropertyDef> = {
        coords: [[inputx,0]],
        type: GraphObjId.POINT,
        extraProperties: {
          name:"$\\sigma_{x}$",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1}
      };
      const sigmay:GraphObjDefinition<PointExtraPropertyDef> = {
        coords: [[inputy,0]],
        type: GraphObjId.POINT,
        extraProperties: {
          name:"$\\sigma_{y}$",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1}
      }
      step1.graphObjs.push(sigmax,sigmay);
      if(inputy === inputx && inputxy === 0){
        step1.description = `Here both $\\sigma_{x}$ and $\\sigma_{y}$ will lie on the same point ${inputy} `+
        `and the Mohr circle will be reduced to a point. This is a valid case as in the case of hydrostatic pressure acting on a body.`+
        `Here every plane is a pricipal plane and principal stress is ${inputy} units`;
        this.graphData.push(step1);
        return;
      }
      // Step 2: Mark the points taux and tauy, if tau is 0 it will be at the same place as sigma
      let step2Description = `Mark the points $[\\sigma_{x}, \\tau_{x}]$=[${inputx},${inputxy}] `+
      `and $[\\sigma_{y}, -\\tau_{y}]$=[${inputy},-${inputxy}]. `
      if(inputxy !== 0){
        step2Description += `You may optionally join them with $\\sigma_{x}$ and $\\sigma_{y}$ as shown`;
      }
      
      const step2:GraphDefinition<GraphExtraPropertyBaseDef>={
        description:step2Description,
        graphObjs:[]
      };
      const taux:GraphObjDefinition<PointExtraPropertyDef> = {
        coords: [[inputx,inputxy]],
        type: GraphObjId.POINT,
        extraProperties: {
          name:"A $[\\sigma_{x}, \\tau_{x}]$",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1}
      };
      const tauy:GraphObjDefinition<PointExtraPropertyDef> = {
        coords: [[inputy,-inputxy]],
        type: GraphObjId.POINT,
        extraProperties: {
          name:"B $[\\sigma_{y}, -\\tau_{y}]$",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1}
      };
      const line1:GraphObjDefinition<LineExtraPropertyDef> = {
        coords: [[inputx,0],[inputx,inputxy]],
        type: GraphObjId.LINE,
        extraProperties: {
          name:"line_1",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1,
          firstArrow: ArrowTypes.NONE, 
          lastArrow: ArrowTypes.NONE, 
          straightFirst:false, straightLast:false, dash:LineDashTypes.SOLID
        }
      };
      const line2:GraphObjDefinition<LineExtraPropertyDef> = {
        coords: [[inputy,0],[inputy,-inputxy]],
        type: GraphObjId.LINE,
        extraProperties: {
          name:"line_2",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1,
          firstArrow: ArrowTypes.NONE, 
          lastArrow: ArrowTypes.NONE, 
          straightFirst:false, straightLast:false, dash:LineDashTypes.SOLID}
      };
      step2.graphObjs.push(taux,tauy,line1,line2);
      // Step 3: Join taux and tauy
      const step3:GraphDefinition<GraphExtraPropertyBaseDef>={
        description:"Join the points A and B, mark the center as C",
        graphObjs:[]
      };
      const center:GraphObjDefinition<PointExtraPropertyDef> = {
        coords: [[centerpt,0]],
        type: GraphObjId.POINT,
        extraProperties: {
          name:"C",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1}
      };
      const line3:GraphObjDefinition<LineExtraPropertyDef> = {
        coords: [[inputx,inputxy],[inputy,-inputxy]],
        type: GraphObjId.LINE,
        extraProperties: {
          name:"line_3",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1,
          firstArrow: ArrowTypes.NONE, 
          lastArrow: ArrowTypes.NONE, 
          straightFirst:false, straightLast:false, dash:LineDashTypes.SOLID}
      };
      step3.graphObjs.push(line3,center);
      // step 4: draw the circle
      const step4:GraphDefinition<GraphExtraPropertyBaseDef>={
        description:"With C as center and CA (or CB) as radius draw the circle",
        graphObjs:[]
      };
      const circle:GraphObjDefinition<CircleExtraPropertyDef> = {
        coords: [[centerpt,0],[inputx,inputxy]],
        type: GraphObjId.CIRCLE,
        extraProperties: {
          name:"line_3",
          fillColor:'transparent', 
          strokeColor:'blue', 
          strokeWidth:1,
          fillopacity: 0.1,
          dash:LineDashTypes.SOLID}
      };
      step4.graphObjs.push(circle);
      // Step 5: identify principal stresses
      const step5:GraphDefinition<GraphExtraPropertyBaseDef>={
        description:`The Principal stresses would be found on a plane with no shear ie., on the x axis. ` + 
        `The points where the circle intersects X axis will give the value for the principal stresses.` + 
        `Here the principal stresses should be $\\sigma_{1}$=${(centerpt+radius).toFixed(3)} units $\\sigma_{2}$=${(centerpt-radius).toFixed(3)} units`,
        graphObjs:[]
      };
      const sigma1:GraphObjDefinition<PointExtraPropertyDef> = {
        coords: [[(centerpt+radius),0]],
        type: GraphObjId.POINT,
        extraProperties: {
          name:"$\\sigma_{1}$",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1}
      };
      const sigma2:GraphObjDefinition<PointExtraPropertyDef> = {
        coords: [[(centerpt-radius),0]],
        type: GraphObjId.POINT,
        extraProperties: {
          name:"$\\sigma_{2}$",
          fillColor:'blue', 
          strokeColor:'blue', 
          strokeWidth:1}
      };
      step5.graphObjs.push(sigma1,sigma2);
      ///
      this.graphData.push(step1,step2,step3,step4,step5);
  }

  updateGraph() {
    this.boardParams = { ...this.boardParams };
    this.graphData = [...this.graphData];
  }

  handleGraphUpdatedEvent(event:GraphUpdatedEvent){
    this.solutionSteps = [];
    if(event.graphData.length > 0){
      for(let x=0; x<=event.currentIndex; x++){
        this.solutionSteps.push(event.graphData[x].description);
        setTimeout(() => {
          MathJax.typeset();
        }, 200);
      }
    }
  }


}
