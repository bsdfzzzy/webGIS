import * as types from '../constants'

let span = document.getElementById('initData')
let defaultCoor = JSON.parse(span.innerHTML)

const state = {
 	userCoordinate: [Number(defaultCoor.longitude), Number(defaultCoor.lantitude)/*103.92723, 30.74751*/],
 	buildingCoordinate: [
 		{
 			id: 0,
 			name: "荷福众创空间-1号楼-创新创业展览厅&新品发布会场",
 			coordinate: [103.93021, 30.74717],
      disc: "总建筑面积2670.8平方米：一层面积1489.9平方，二层1180.9平方"
 		},
 		{
 			id: 1,
 			name: "荷福众创空间-2号楼-创意工作室",
 			coordinate: [103.93097, 30.74769],
      disc: "总建筑面积729.8平方米：一层面积336平方，二层393.8平方"
 		},
 		{
 			id: 2,
 			name: "荷福众创空间-3号楼-创新创业学院",
 			coordinate: [103.93120, 30.74753],
      disc: "总建筑面积625.4平方米：一层面积312.7平方，二层312.7平方"
 		},
 		{
 			id: 3,
 			name: "荷福众创空间-4号楼-创新工坊",
 			coordinate: [103.93120, 30.74730],
      disc: "总建筑面积1373.1平方米：一层面积708.5平方，二层664.6平方"
 		},
 		{
 			id: 4,
 			name: "荷福众创空间-5号楼-荷福研究院",
 			coordinate: [103.93093, 30.74696],
      disc: "总建筑面积2639平方米：一层面积1319.5平方，二层1319.5平方"
 		},
 		{
 			id: 5,
 			name: "荷福众创空间-6号楼-教师创新创业工作室",
 			coordinate: [103.93054, 30.74689],
      disc: "总建筑面积1172平方米：一层面积586平方，二层586平方"
 		},
 		{
 			id: 6,
 			name: "荷福众创空间-7号楼-学生创新创业工作室&实验美术馆",
 			coordinate: [103.93064, 30.74643],
      disc: "总建筑面积2364.4平方米：一层面积1182.2平方，二层1182.2平方"
 		},
 		{
 			id: 7,
 			name: "荷福众创空间-8号楼-实验美术馆",
 			coordinate: [103.93065, 30.74578],
      disc: "总建筑面积1574.8平方米：一层面积787.4平方，二层787.4平方"
 		},
 		{
 			id: 8,
 			name: "南门大",
 			coordinate: [103.92325,30.74681]
 		},
 		{
 			id: 9,
 			name: "主楼广场东",
 			coordinate: [103.92393,30.74760]
 		},
 		{
 			id: 10,
 			name: "主楼广场西",
 			coordinate: [103.92375,30.74771]
 		},
 		{
 			id: 11,
 			name: "主楼C区",
 			coordinate: [103.92596, 30.74848]
 		},
 		{
 			id: 12,
 			name: "主楼A区",
 			coordinate: [103.92373, 30.74995]
 		},
 		{
 			id: 13,
 			name: "图书馆",
 			coordinate: [103.92817, 30.75134]
 		},
 		{
 			id: 14,
 			name: "立人楼",
 			coordinate: [103.92896, 30.75181]
 		},
 		{
 			id: 15,
 			name: "基础实验楼",
 			coordinate: [103.92895, 30.75373]
 		},
 		{
 			id: 16,
 			name: "科研楼",
 			coordinate: [103.92941, 30.75462]
 		},
 		{
 			id: 17,
 			name: "品学楼A区",
 			coordinate: [103.92973, 30.75477]
 		},
    {
      id: 18,
      name: "品学楼C区",
      coordinate: [103.93162, 30.75448]
    },
    {
      id: 19,
      name: "品A路口大",
      coordinate: [103.92999, 30.75510]
    },
    {
      id: 20,
      name: "学子路口大",
      coordinate: [103.93076, 30.75583]
    },
    {
      id: 21,
      name: "银桦路口大",
      coordinate: [103.92898, 30.75651]
    },
    {
      id: 22,
      name: "综合训练馆",
      coordinate: [103.93290, 30.75360]
    },
    {
      id: 23,
      name: "创新中心",
      coordinate: [103.92306, 30.75099]
    },
    {
      id: 24,
      name: "经管楼",
      coordinate: [103.92315, 30.75248]
    },
    {
      id: 25,
      name: "西湖",
      coordinate: [103.92345, 30.75373]
    },
    {
      id: 26,
      name: "西二门大",
      coordinate: [103.92189, 30.75469]
    },
    {
      id: 27,
      name: "研究院大楼",
      coordinate: [103.92399, 30.75386]
    },
    {
      id: 28,
      name: "西门大",
      coordinate: [103.92434, 30.75755]
    },
    {
      id: 29,
      name: "五号科研楼",
      coordinate: [103.92566, 30.75697]
    },
    {
      id: 30,
      name: "活动中心大",
      coordinate: [103.92767, 30.75784]
    },
    {
      id: 31,
      name: "活动中心",
      coordinate: [103.92757, 30.75802]
    },
    {
      id: 32,
      name: "综合楼",
      coordinate: [103.92650, 30.75881]
    },
    {
      id: 33,
      name: "体育场",
      coordinate: [103.92987, 30.74740]
    },
 	],
 	start: [Number(defaultCoor.longitude), Number(defaultCoor.lantitude)/*103.92723, 30.74751*/],
 	direction: [103.93056, 30.74784]
}

const mutations = {
  [types.SET_STARTCOORDINATE] (state, id) {
  	for(let building of state.buildingCoordinate) {
  		if (building.id == id) {
  			state.start = building.coordinate
  			break
  		}
  	}
  },
  [types.SET_DIRECTIONCOORDINATE] (state, id) {
  	for(let building of state.buildingCoordinate) {
  		if (building.id == id) {
  			state.direction = building.coordinate
  			break
  		}
  	}
  }
}

export default {
    state,
    mutations
}