const lzpSl = [
  [
    {item:'f',index:'as',id:1},
    {item:'a',index:'asd',id:2}
  ],
  [
    {item:'a',index:'as',id:1},
    {item:'a',index:'asd',id:2}
  ],
  [
    {item:'d',index:'as',id:1},
    {item:'a',index:'asd',id:2}
  ],
  [
    {item:'f',index:'as',id:1},
    {item:'a',index:'asd',id:2}
  ],
  [
    {item:'g',index:'as',id:1},
    {item:'a',index:'asd',id:2}
  ]
]
const lzpSl2 = [
    [
        {item:'aaa',key:'1'},
        {item:'aaa',key:'2'},
        {item:'aaa',key:'3'},
        {item:'aaa',key:'4'}
    ],
    [
        {item:'哦哦哦',key:'1'},
        {item:'哦哦哦',key:'2'},
        {item:'哦哦哦',key:'3'},
        {item:'哦哦哦',key:'4'}
    ],
    [
        {item:'呃呃呃',key:'1'},
        {item:'呃呃呃',key:'2'},
        {item:'呃呃呃',key:'3'},
        {item:'呃呃呃',key:'4'}
    ]
]

const centerConfig = {
    routea:[
        {item:'字典维护',key:'1'},
        {item:'人事管理',key:'2'},
        {item:'报刊设置',key:'3'},
        {item:'辅助业务',key:'4'},
        {item:'查询',key:'5'}
    ],
    todo:[
        [
          {item:'部门设置',index:'as',id:1},
          {item:'职务类别设置',index:'asd',id:2},
          {item:'报社设置',index:'asd',id:3},
          {item:'运输单位设置',index:'asd',id:4},
          {item:'地区设置',index:'asd',id:5},
          {item:'变更原因设置',index:'asd',id:6},
          {item:'状态维护',index:'asd',id:7},
          {item:'公司信息设置',index:'asd',id:8}
        ],
        [
          {item:'员工信息设置',index:'as',id:1},
          {item:'员工职务设置',index:'asd',id:2}
        ],
        [
          {item:'报刊代码设置',index:'as',id:1},
          {item:'报刊属性设置',in3dex:'asd',id:2}, 
          {item:'刊期设置',index:'asd',id:2},
          {item:'发行费率设置',index:'asd',id:2},
          {item:'报刊基本订价',index:'asd',id:2},
          {item:'报刊优惠设置',index:'asd',id:2}
        ],
        [
          {item:'收取通知',index:'as',id:1},
          {item:'发送通知',index:'asd',id:2}
        ],
        [
          {item:'报刊信息查询',index:'as',id:1},
          {item:'订户订购查询',index:'asd',id:2}
        ]
    ]
}

const publishConfig = {
    routea:[
        {item:'客户管理',key:'1'},
        {item:'商品订购',key:'2'},
        {item:'监督管理',key:'3'},
        {item:'辅助业务',key:'4'},
        {item:'查询',key:'5'}
    ],
    todo:[
        [
          {item:'订阅客户信息管理',index:'subInforManage',id:1}
         
        ],
        [
          {item:'新订',index:'newBook',id:1},
          {item:'退订',index:'backBook',id:2},
          {item:'转址',index:'redirect',id:3},
          {item:'延期',index:'delay',id:4},
          {item:'续订',index:'renewBook',id:5},
          {item:'收款',index:'change',id:6},
          
        ],
        [
          {item:'投诉处理',index:'complaintHandle',id:1},
          {item:'表扬处理',index:'praiseTreat',id:2},
          {item:'建议处理',index:'recomTreat',id:3},
          
        ],
        [
          {item:'收取通知',index:'collectInfor',id:1},
          {item:'发送通知',index:'sendInfor',id:2}
        ],
        [
          {item:'统计查询',index:'statisQuery',id:1},
          {item:'基础信息查询',index:'basicInforQuery',id:2},
          {item:'订户查询',index:'subQuery',id:3},
          {item:'日常业务查询',index:'dailyBusinessQuery',id:4}
        ],
    ]
}

const customConfig = {
    routea:[
        {item:'监督管理',key:'1'},
        {item:'辅助业务',key:'2'},
        {item:'查询',key:'3'}
    ],
    todo:[
       
        [
          {item:'投诉管理',index:'complaintManage',id:1},
          {item:'表扬管理',index:'praiseManage',id:2},
          {item:'建议管理',index:'recomManage',id:3}
          
        ],
        [
          {item:'收取通知',index:'collectInfor',id:1},
          {item:'发送通知',index:'sendInfor',id:2}
        ],
        [
          {item:'订单到期数查询',index:'orderTermQuery',id:1}
        ],
    ]
}

const leaderConfig = {
    routea:[
        {item:'报刊图表统计',key:'1'},
        {item:'订户统计分析',key:'2'},
        {item:'报刊订阅业务情况查询',key:'3'}
    ],
    todo:[
       
        [
          {item:'报刊订量分站统计',index:'newsOrderStation',id:1},
          {item:'报刊订量年统计',index:'newsOrderYear',id:2},
          {item:'历年报刊订量统计',index:'annuNewsOrder',id:3},
          {item:'订阅订购对比分析',index:'subOrderContrast',id:4},
          {item:'订阅金额分站统计',index:'subMoneyStation',id:5}
          
        ],
        [
          {item:'订户订期分析',index:'subPeriod',id:1},
          {item:'订户性质分析',index:'subCharacter',id:2}
        ],
        [
          {item:'投诉情况月报',index:'complaSituatMonth',id:1}
        ],
    ]
}


export {
    centerConfig, customConfig, publishConfig, leaderConfig
}