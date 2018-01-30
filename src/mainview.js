const lzpSl = [
  [
    { item: 'f', index: 'as', id: 1 },
    { item: 'a', index: 'asd', id: 2 }
  ],
  [
    { item: 'a', index: 'as', id: 1 },
    { item: 'a', index: 'asd', id: 2 }
  ],
  [
    { item: 'd', index: 'as', id: 1 },
    { item: 'a', index: 'asd', id: 2 }
  ],
  [
    { item: 'f', index: 'as', id: 1 },
    { item: 'a', index: 'asd', id: 2 }
  ],
  [
    { item: 'g', index: 'as', id: 1 },
    { item: 'a', index: 'asd', id: 2 }
  ]
]
const lzpSl2 = [
  [
    { item: 'aaa', key: '1' },
    { item: 'aaa', key: '2' },
    { item: 'aaa', key: '3' },
    { item: 'aaa', key: '4' }
  ],
  [
    { item: '哦哦哦', key: '1' },
    { item: '哦哦哦', key: '2' },
    { item: '哦哦哦', key: '3' },
    { item: '哦哦哦', key: '4' }
  ],
  [
    { item: '呃呃呃', key: '1' },
    { item: '呃呃呃', key: '2' },
    { item: '呃呃呃', key: '3' },
    { item: '呃呃呃', key: '4' }
  ]
]


const centerConfig = {
  title: "中心系统",
  routea: [
    { item: '字典维护', key: '1' },
    { item: '人事管理', key: '2' },
    { item: '报刊设置', key: '3' },
    // {item:'辅助业务',key:'4'},
    { item: '查询', key: '4' }
  ],
  todo: [
    [
      { item: '部门设置', index: '/1/dict/deparment', id: 1 },
      { item: '职务类别设置', index: '/1/dict/jobCategory', id: 2 },
      { item: '报社设置', index: '/1/dict/newspaper', id: 3 },
      { item: '运输单位设置', index: '/1/dict/transferUnit', id: 4 },
      { item: '地区设置', index: '/1/dict/region', id: 5 },
      { item: '变更原因设置', index: '/1/dict/changeReason', id: 6 },
      { item: '状态维护', index: '/1/dict/stateMaintenance', id: 7 },
      { item: '公司信息设置', index: '/1/dict/officeInfor', id: 8 }
    ],
    [
      { item: '员工信息设置', index: '/1/hur/empInfor', id: 1 },
      { item: '员工职务设置', index: '/1/hur/empPosition', id: 2 }
    ],
    [
      { item: '报刊代码设置', index: '/1/news/newsCode', id: 1 },
      { item: '报刊属性设置', index: '/1/news/newsAttribute', id: 2 },
      { item: '刊期设置', index: '/1/news/frequency', id: 3 },
      { item: '发行费率设置', index: '/1/news/lssuingRate', id: 4 },
      { item: '报刊基本价', index: '/1/news/newsBasicPricing', id: 5 },
      { item: '报刊优惠设置', index: '/1/news/newsDiscount', id: 6 }
    ],
    // [
    //   {item:'收取通知',index:'/1/assis/collectInfor',id:1},
    //   {item:'发送通知',index:'/1/assis/sendInfor',id:2}
    // ],
    [
      { item: '报刊信息查询', index: '/1/query/newsInforQuery', id: 1 },
      { item: '订户订购查询', index: '/1/query/subOrderQuery', id: 2 },
      { item: '报刊订单查询', index: '/1/query/newsOrderQuery', id: 3 }
    ],
  ]
}

const publishConfig = {
  title: "发行站系统",
  routea: [
    { item: '客户管理', key: '1' },
    { item: '商品订购', key: '2' },
    { item: '监督管理', key: '3' },
    // {item:'辅助业务',key:'4'},
    { item: '查询', key: '4' }
  ],
  todo: [
    [
      { item: '订阅客户信息管理', index: '/2/custo/subInforManage', id: 1 }

    ],
    [
      { item: '新订', index: '/2/commo/newBook', id: 1 },
      { item: '更改订单', index: '/2/commo/alterBook', id: 2 },
    ],
    [
      { item: '反馈管理', index: '/2/watch/complaintHandle', id: 1 }
    ],
    [
      { item: '统计查询', index: '/2/query/statisQuery', id: 1 },
      { item: '基础信息查询', index: '/2/query/basicInforQuery', id: 2 },
      { item: '日常业务查询', index: '/2/query/dailyBusinessQuery', id: 3 }
    ],
  ]
}


const customConfig = {
  title: "客服系统",
  routea: [
    { item: '监督管理', key: '1' },
    // {item:'辅助业务',key:'2'},
    { item: '查询', key: '2' }
  ],
  todo: [

    [
      { item: '反馈管理', index: '/3/watch/handler', id: 1 },
      { item: '查看已下发反馈', index: '/3/watch/result', id: 2 }
    ],
    // [
    //   {item:'收取通知',index:'/3/assis/collectInfor',id:1},
    //   {item:'发送通知',index:'/3/assis/sendInfor',id:2}
    // ],
    [
      { item: '订单到期数查询', index: '/3/query/orderTermQuery', id: 1 }
    ],
  ]
}

const leaderConfig = {
  title: "查询系统",
  routea: [
    { item: '报刊图表统计', key: '1' },
    { item: '订户统计分析', key: '2' },
    { item: '报刊订阅业务情况查询', key: '3' }
  ],
  todo: [

    [
      { item: '报刊订量分站统计', index: '/4/news/newsOrderStation', id: 1 },
      { item: '报刊订量年统计', index: '/4/news/newsOrderYear', id: 2 },
      { item: '历年报刊订量统计', index: '/4/news/annuNewsOrder', id: 3 },
      { item: '订阅订购对比分析', index: '/4/news/subOrderContrast', id: 4 },
      { item: '订阅金额分站统计', index: '/4/news/subMoneyStation', id: 5 }

    ],
    [
      { item: '订户订期分析', index: '/4/sub/subPeriod', id: 1 },
      { item: '订户性质分析', index: '/4/sub/subCharacter', id: 2 }
    ],
    [
      { item: '投诉情况月报', index: '/4/order/complaSituatMonth', id: 1 }
    ],
  ]
}








export {
  centerConfig, customConfig, publishConfig, leaderConfig
}