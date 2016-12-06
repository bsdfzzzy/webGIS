import * as types from '../constants'

const state = {
	whetherShowList: false,
	blocks: [
		{
 			id: 0,
 			title: "荷福众创空间-1号楼-创新创业展览厅和新品发布会场",
      coordinate: [103.93021, 30.74717],
 			coordinateToNavigate: [103.930132, 30.746963],
      desc: "总建筑面积2670.8平方米：一层面积1489.9平方，二层1180.9平方"
 		},
 		{
 			id: 1,
 			title: "荷福众创空间-2号楼-创意工作室",
      coordinate: [103.93097, 30.74769],
 			coordinateToNavigate: [103.930876, 30.747696],
      desc: "总建筑面积729.8平方米：一层面积336平方，二层393.8平方"
 		},
 		{
 			id: 2,
 			title: "荷福众创空间-3号楼-创新创业学院",
      coordinate: [103.93120, 30.74753],
 			coordinateToNavigate: [103.931160, 30.747577],
      desc: "总建筑面积625.4平方米：一层面积312.7平方，二层312.7平方"
 		},
 		{
 			id: 3,
 			title: "荷福众创空间-4号楼-创新工坊",
      coordinate: [103.93083, 30.74730],
 			coordinateToNavigate: [103.930791, 30.747511],
      desc: "总建筑面积1373.1平方米：一层面积708.5平方，二层664.6平方"
 		},
 		{
 			id: 4,
 			title: "荷福众创空间-5号楼-荷福研究院",
      coordinate: [103.93093, 30.74696],
 			coordinateToNavigate: [103.930779, 30.746896],
      desc: "总建筑面积2639平方米：一层面积1319.5平方，二层1319.5平方"
 		},
 		{
 			id: 5,
 			title: "荷福众创空间-6号楼-教师创新创业工作室",
      coordinate: [103.93054, 30.74689],
 			coordinateToNavigate: [103.930449, 30.746818],
      desc: "总建筑面积1172平方米：一层面积586平方，二层586平方"
 		},
 		{
 			id: 6,
 			title: "荷福众创空间-7号楼-学生创新创业工作室和实验美术馆",
      coordinate: [103.93064, 30.74643],
 			coordinateToNavigate: [103.930693, 30.746584],
      desc: "总建筑面积2364.4平方米：一层面积1182.2平方，二层1182.2平方"
 		},
 		{
 			id: 7,
 			title: "荷福众创空间-8号楼-实验美术馆",
      coordinate: [103.93065, 30.74578],
 			coordinateToNavigate: [103.930679, 30.745983],
      desc: "总建筑面积1574.8平方米：一层面积787.4平方，二层787.4平方"
 		},
    {
      id: 8,
      title: "荷福众创空间-雕像",
      coordinate: [103.930283, 30.746653],
      coordinateToNavigate: [103.930215, 30.746611],
      desc: "总建筑面积1574.8平方米：一层面积787.4平方，二层787.4平方"
    },
    {
      id: 9,
      title: "荷福众创空间-喷泉",
      coordinate: [103.930561, 30.747814],
      coordinateToNavigate: [103.930561, 30.747814],
      desc: "总建筑面积1574.8平方米：一层面积787.4平方，二层787.4平方"
    },
 		{
 			id: 10,
 			title: "南门",
      coordinate: [103.92325,30.74681],
 			coordinateToNavigate: [103.923208,30.746759]
 		},
 		{
 			id: 11,
 			title: "主楼广场东",
      coordinate: [103.92393,30.74760],
 			coordinateToNavigate: [103.923996,30.747691]
 		},
 		{
 			id: 12,
 			title: "主楼广场西",
      coordinate: [103.92375,30.74771],
 			coordinateToNavigate: [103.923836,30.747782]
 		},
 		{
 			id: 13,
 			title: "主楼C区",
      coordinate: [103.92596, 30.74848],
 			coordinateToNavigate: [103.925894, 30.748535]
 		},
 		{
 			id: 14,
 			title: "主楼A区",
      coordinate: [103.92373, 30.74995],
 			coordinateToNavigate: [103.923795, 30.749864]
 		},
 		{
 			id: 15,
 			title: "图书馆",
      coordinate: [103.92817, 30.75134],
 			coordinateToNavigate: [103.928308, 30.751350]
 		},
 		{
 			id: 16,
 			title: "立人楼",
      coordinate: [103.92896, 30.75181],
 			coordinateToNavigate: [103.928870, 30.752015]
 		},
 		{
 			id: 17,
 			title: "基础实验楼",
      coordinate: [103.92895, 30.75373],
 			coordinateToNavigate: [103.929059, 30.753710]
 		},
 		{
 			id: 18,
 			title: "科研楼",
      coordinate: [103.92941, 30.75462],
 			coordinateToNavigate: [103.929444, 30.754552]
 		},
	],
	rooms: [],
	teams: [],
	display: []
}

const mutations = {
	[types.SHOW_LIST] (state) {
		state.whetherShowList = true
	},
	[types.CLOSE_LIST] (state) {
		state.whetherShowList = false
	},
    [types.SHOW_BLOCKS] (state) {
		state.display = state.blocks
	},
	[types.SHOW_ROOMS] (state) {
		state.display = state.rooms
	},
	[types.SHOW_TEAMS] (state) {
		state.display = state.teams
	},
	[types.SET_BLOCKS] (state, blocks) {
		state.blocks = blocks
	},
	[types.SET_ROOMS] (state, rooms) {
		state.rooms = rooms
	},
	[types.SET_TEAMS] (state, teams) {
		state.teams = teams
	}
}

export default {
	state,
	mutations
}