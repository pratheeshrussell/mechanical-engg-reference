import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppConstants } from 'src/app/constants/constants.app';
import { debounce } from "lodash";
import { GraphDefinition, GraphExtraPropertyBaseDef, GraphObjDefinition } from './types/graphObject';
import { GraphParam, CustomAxisParams, LocalAxisObjects, GraphUpdatedEvent } from './types/graphParams';
import * as GraphObjects from './graph-objects/objectImports';
import { CircleExtraPropertyDef, GraphObjId, LineExtraPropertyDef, PointExtraPropertyDef } from './types/graph.constants';



declare const JXG: any;
@Component({
  selector: 'mech-ref-graph-plotter',
  templateUrl: './graph-plotter.component.html',
  styleUrls: ['./graph-plotter.component.css']
})
export class GraphPlotterComponent implements AfterViewInit, OnChanges {
  @Input('graphHeight') graphHeight = "100%";
  @Input('graphWidth') graphWidth = "100%";
  @Input('graphName') graphName = "mohr-graph";
  @Input('graphData') graphData: GraphDefinition<GraphExtraPropertyBaseDef>[] = [];
  board: any;
  @Input('boardParams') boardParams: GraphParam = AppConstants.defaultGraphParams;
  @Input('axisParams') axisParams: CustomAxisParams = AppConstants.defaultAxisParams;
  @Input('showStepController') showStepController = true;

  @Output('graphUpdated') graphUpdated:EventEmitter<GraphUpdatedEvent> = new EventEmitter();


  debounceRunner = debounce(this.debouncedUpdate, 200);
  currentIndex = 0;
  axisObjects: { [key: string]: LocalAxisObjects } = {
    x: {
      axis: null,
      line: null,
      title: null,
      ticks: null
    },
    y: {
      axis: null,
      line: null,
      title: null,
      ticks: null
    }
  }

  ngAfterViewInit(): void {
    this.doAfterInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.board != null) {
      this.currentIndex = (changes.graphData.currentValue.length - 1);
      this.debounceRunner();
    }
  }

  doAfterInit() {
    this.createBoard();
    this.drawInitialObjects();
    this.emitUpdateEvent();
  }
  debouncedUpdate() {
    this.board = JXG.JSXGraph.freeBoard(this.board);
    this.doAfterInit();
  }
  createBoard() {
    this.board = JXG.JSXGraph.initBoard(this.graphName, this.boardParams);
    this.board.options.text.useMathjax = true;
    this.addAxis();
    this.board.on('boundingbox', () => {
      this.removeAxis();
      this.addAxis();
    });

  }

  // Start drawing objects
  drawInitialObjects() {
    this.graphData.forEach((gphSteps, index) => {
      if (index <= this.currentIndex) {
        gphSteps.graphObjs.forEach((gphobj) => {
          if (gphobj.type === GraphObjId.POINT) {
            (new GraphObjects.PointObject()).makeObject(this.board, gphobj as GraphObjDefinition<PointExtraPropertyDef>);
          } else if (gphobj.type === GraphObjId.LINE) {
            // draw line
            (new GraphObjects.LineObject()).makeObject(this.board, (gphobj as GraphObjDefinition<LineExtraPropertyDef>));
          } else if (gphobj.type === GraphObjId.CIRCLE) {
            // draw circle
            (new GraphObjects.CircleObject()).makeObject(this.board, (gphobj as GraphObjDefinition<CircleExtraPropertyDef>));
          }
        })
      }
    });
  }

  // change steps
  stepBack() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      if (this.board != null) {
        this.debounceRunner();
      }
    }
  }
  stepForward() {
    if (this.currentIndex < (this.graphData.length - 1)) {
      this.currentIndex++;
      if (this.board != null) {
        this.debounceRunner();
      }
    }
  }
  emitUpdateEvent(){
    this.graphUpdated.emit({
      graphData:this.graphData,
      currentIndex:this.currentIndex
    });
  }

  // Read this fully
  // https://www.intmath.com/cg3/jsxgraph-axes-ticks-grids.php
  addAxis() {
    const xorigin = this.axisParams.origin[0];
    const yorigin = this.axisParams.origin[1];
    let xtick = this.axisParams.x.ticks > 0 ? this.axisParams.x.ticks : 1;
    let ytick = this.axisParams.y.ticks > 0 ? this.axisParams.y.ticks : 1;
    const bb = this.board.getBoundingBox();
    if (this.board.zoomX !== 1) {
      xtick = Math.round((bb[2] - bb[0]) / 10);
      ytick = Math.round((bb[1] - bb[3]) / 10);
    }
    const fontMultiplier = (this.board.zoomX > 1) ? this.board.zoomX : 1;

    if (this.axisParams.x.show) {
      this.axisObjects.x.axis = this.board.create('axis', [[0, yorigin], [1, yorigin]], {
        name: "xaxis",
        label: { offset: [7, -10] }, // Doesn't do anything here.
        drawZero: true, firstArrow: true, lastArrow: true,
        strokeColor: '#b4b4b4'
      });
      //TO GET GREY LINE
      this.axisObjects.x.line = this.board.create('line', [[0, yorigin], [1, yorigin]], {
        name: "xaxis_line", strokeColor: '#b4b4b4', highlightStrokeColor: '#b4b4b4', layer: 2,
        firstArrow: true, lastArrow: true,
        point1: { visible: false, fixed: true }, point2: { visible: false, fixed: true }, fixed: true
      });

      this.axisObjects.x.axis.removeAllTicks();
      // The number here is the distance between Major ticks
      this.axisObjects.x.ticks = this.board.create('ticks',
        [this.axisObjects.x.axis, xtick], {
        name: "xaxis_ticks",
        type: this.axisParams.type,
        strokeColor: '#b4b4b4',//majorHeight:0,minorHeight:0,
        majorHeight: this.boardParams.grid ? -1 : 10, // Need this because the JXG.Options one doesn't apply
        drawLabels: true, // Needed, and only works for equidistant ticks
        label: { offset: [-12, -10] },
        minorTicks: 0, // The NUMBER of small ticks between each Major tick
        // minorHeight: 10,
        drawZero: true,
        insertTicks: true,
      });
      this.axisObjects.x.title = this.board.create('text', [bb[0] + Math.abs(bb[0] * 0.1), yorigin + +Math.abs(bb[1] * 0.1), this.axisParams.x.title],
        { fontSize: 20, name: "text_xtitle".toString(), useLatex: true });
    }
    if (this.axisParams.y.show) {
      this.axisObjects.y.axis = this.board.create('axis', [[xorigin, 0], [xorigin, 1]], {
        name: "yaxis",
        firstArrow: true, strokeColor: '#b4b4b4'
      });
      //TO GET GREY LINE
      this.axisObjects.y.line = this.board.create('line', [[xorigin, 0], [xorigin, 1]],
        {
          name: "yaxis_line", strokeColor: '#b4b4b4', highlightStrokeColor: '#b4b4b4', layer: 2,
          firstArrow: true, lastArrow: true, point1: { visible: false, fixed: true },
          point2: { visible: false, fixed: true }, fixed: true
        }
      );
      this.axisObjects.y.axis.removeAllTicks();
      this.axisObjects.y.ticks = this.board.create('ticks', [this.axisObjects.y.axis, ytick], {
        name: "yaxis_ticks",
        type: this.axisParams.type,
        strokeColor: '#b4b4b4',
        majorHeight: this.boardParams.grid ? -1 : 10, // Need this because the JXG.Options one doesn't apply
        drawLabels: true, // Only works for equidistant ticks
        label: { offset: [7, -2] },
        minorTicks: 0, // The NUMBER of small ticks between each Major tick
        // minorHeight: 10,
        drawZero: true,
        insertTicks: true,
      }
      );
      //
      this.axisObjects.y.title = this.board.create('text', [xorigin + Math.abs(bb[1] * 0.1), bb[1] - Math.abs(bb[1] * 0.1), this.axisParams.y.title],
        {
          fontSize: 20, name: "text_ytitle".toString(),
          display: "html", useLatex: true
        });
    }
  }
  removeAxis() {
    const xaxis = this.axisObjects.x;
    const yaxis = this.axisObjects.y;
    if (xaxis.axis !== null) {
      this.board.removeObject([xaxis.axis, xaxis.line, , xaxis.ticks, xaxis.title]);
    }
    if (yaxis.axis !== null) {
      this.board.removeObject([yaxis.axis, yaxis.line, , yaxis.ticks, yaxis.title]);
    }
  }

}
