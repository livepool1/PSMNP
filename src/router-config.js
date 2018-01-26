import activePublic from './page/activePublic/index.vue'
import step1 from './page/activePublic/step1.vue'
import step2 from './page/activePublic/step2.vue'
import step3 from './page/activePublic/step3.vue'
import step4 from './page/activePublic/step4.vue'

import totalpages from './page/activeManage/totalpages.vue'
import activeManage from './page/activeManage/index.vue'
import detail from './page/activeManage/detail.vue'

import page1 from './page/activeManage/page1.vue'
import page2 from './page/activeManage/page2.vue'
import page3 from './page/activeManage/page3.vue'
import page4 from './page/activeManage/page4.vue'
import page5 from './page/activeManage/page5.vue'

import center from './page/centerManage/index.vue'
import custom from './page/customManage/index.vue'
import finanal from './page/finanalManage/index.vue'
import leader from './page/leaderManage/index.vue'
import publish from './page/publishManage/index.vue'

//中心站管理
import dept from './page/centerManage/dictionary/Dept.vue'
import jobCategory from './page/centerManage/dictionary/Position.vue'
import centerDict from './page/centerManage/dictionary/index.vue'
import newspaper from './page/centerManage/dictionary/newspaper.vue'


import centerHur from './page/centerManage/humanresources/index.vue'



// 发行站子系统
// 商品订购
import newBook from './page/publishManage/commo/newBook.vue' 
import alterBook from './page/publishManage/commo/alterBook.vue'
import bookSubOrder from './page/publishManage/commo/bookSubOrder.vue'
//监督管理
import complaintHandle from './page/publishManage/watch/complaintHandle.vue'
//查询
import statisQuery from './page/publishManage/query/statisQuery.vue'


import login from './page/Login.vue'
import mainview from './page/mainview.vue'

// import department from './page/centerManage/dictionary/department.vue'
// import jobCategory from './page/centerManage/dictionary/jobCategory.vue'
// import newspaper from './page/centerManage/dictionary/newspaper.vue'
import transferUnit from './page/centerManage/dictionary/transferUnit.vue'
import region from './page/centerManage/dictionary/region.vue'
import changeReason from './page/centerManage/dictionary/changeReason.vue'
import stateMaintenance from './page/centerManage/dictionary/stateMaintenance.vue'
import officeInfor from './page/centerManage/dictionary/officeInfor.vue'


import empInfor from './page/centerManage/humanResources/empInfor.vue'
import empPosition from './page/centerManage/humanResources/empPosition.vue'


import newsCode from './page/centerManage/news/newsCode.vue'
import newsAttribute from './page/centerManage/news/newsAttribute.vue'
import frequency from './page/centerManage/news/frequency.vue'
import lssuingRate from './page/centerManage/news/lssuingRate.vue'
import newsBasicPricing from './page/centerManage/news/newsBasicPricing.vue'
import newsDiscount from './page/centerManage/news/newsDiscount.vue'


import newsInforQuery from './page/centerManage/query/newsInforQuery.vue'
import subOrderQuery from './page/centerManage/query/subOrderQuery.vue'
import newsOrderQuery from './page/centerManage/query/newsOrderQuery.vue'


import handler from './page/customManage/watch/handle.vue'

import orderTermQuery from './page/customManage/query/orderTermQuery.vue'


import newsOrderStation from './page/leaderManage/news/newsOrderStation.vue'
import newsOrderYear from './page/leaderManage/news/newsOrderYear.vue'
import annuNewsOrder from './page/leaderManage/news/annuNewsOrder.vue'
import subOrderContrast from './page/leaderManage/news/subOrderContrast.vue'
import subMoneyStation from './page/leaderManage/news/subMoneyStation.vue'

import subPeriod from './page/leaderManage/subscriber/subPeriod.vue'
import subCharacter from './page/leaderManage/subscriber/subCharacter.vue'

import complaSituatMonth from './page/leaderManage/order/complaSituatMonth.vue'



import subInforManage from './page/publishManage/customer/subInforManage.vue'

// import newBook from './page/publishManage/commodity/newBook.vue'
import laterBook from './page/publishManage/commodity/laterBook.vue'
import change from './page/publishManage/commodity/change.vue'

import handle from './page/publishManage/watch/handle.vue'


// import statisQuery from './page/publishManage/query/statisQuery.vue'
import basicInforQuery from './page/publishManage/query/basicInforQuery.vue'
import subQuery from './page/publishManage/query/subQuery.vue'
import dailyBusinessQuery from './page/publishManage/query/dailyBusinessQuery.vue'




export default [
  {
  //   path: '/activeManage',component:totalpages,
  //   children:[
  //     { path: ''      , component: activeManage  },
  //     {
  //       path: 'detail', component: detail,

  //       children: [
  //         {path:'',component: page1},
  //         {
  //           path: 'page1', component: page1,
  //           children: [
  //             {path: '', component: step1},
  //             {path: 'step1', component: step1},
  //             {path: 'step2', component: step2},
  //             {path: 'step3', component: step3},
  //             {path: 'step4', component: step4}
  //           ]
  //         },
  //         { path: 'page2', component: page2  },
  //         { path: 'page3', component: page3  },
  //         { path: 'page4', component: page4  },
  //         { path: 'page5', component: page5  }
  //       ]
  //     },
  //   ]
  // },{-
    path:'/login',component:login
  },{
    path:'',component:login
  },
  {
    path:'/mainview',component:mainview,
    children:[
      {
        path:'/1',component:center,
          children:[
            { path: '' , component:center},
            { path: 'dict', component:center,
              children:[
                {path: 'deparment', component:dept},
                {path: 'jobCategory', component:jobCategory},
                {path: 'newspaper', component:newspaper},
                // {path: 'transferUnit', component:transferUnit},
                // {path: 'region', component:region},
                // {path: 'changeReason', component:changeReason},
                // {path: 'stateMaintenance', component:stateMaintenance},
                // {path: 'officeInfor', component:officeInfor},
              ]},
            { path: 'hur', component:centerHur,
              children:[
                // {path: 'empInfor', component:empInfor},
                // {path: 'empPosition', component:empPosition},
                
              ]},
            // { path: 'news', component:centerNews,
            //   children:[
            //     // {path: 'newsCode', component:newsCode},
            //     // {path: 'newsAttribute', component:newsAttribute},
            //     // {path: 'frequency', component:frequency},
            //     // {path: 'lssuingRate', component:lssuingRate},
            //     // {path: 'newsBasicPricing', component:newsBasicPricing},
            //     // {path: 'newsDiscount', component:newsDiscount},
                
            //   ]},
            // { path: 'assis', component:centerAssis,
            //   children:[
            //     // {path: 'collectInfor', component:collectInfor},
            //     // {path: 'sendInfor', component:sendInfor},
                
            //   ]},
            // { path: 'query', component:centerQuery,
            //   children:[
            //     // {path: 'newsInforQuery', component:newsInforQuery},
            //     // {path: 'subOrderQuery', component:subOrderQuery},
            //     // {path: 'newsOrderQuery', component:newsOrderQuery},
            //   ]},
          ]
        },{
          path:'/2',component:publish,

          children:[
            // { path: '' , component:publishCusto},
            // { path: 'custo', component:publishCusto,
            //   children:[
            //     // {path: 'subInforManage', component:subInforManage},
            //   ]},
            { path: 'commo', component:publish,
              children:[
                {path: 'newBook', component:newBook},
                {path: 'alterBook', component:alterBook },
                {path: 'bookSubOrder', name : 'bookSubOrder' , component:bookSubOrder},
              ]},
                // {path: 'backBook', component:backBook},
                // {path: 'redirect', component:redirect},
                // {path: 'delay', component:delay},
                // {path: 'renewBook', component:renewBook},
                // {path: 'change', component:change},
            // { path: 'commo', component:publishCommo,
            //   children:[
            //     // {path: 'newBook', component:newBook},
            //     // {path: 'backBook', component:backBook},
            //     // {path: 'redirect', component:redirect},
            //     // {path: 'delay', component:delay},
            //     // {path: 'renewBook', component:renewBook},
            //     // {path: 'change', component:change},
                
            //   ]},
            // { path: 'watch', component:publishWatch,
            //   children:[
            //     // {path: 'complaintHandle', component:complaintHandle},
            //     // {path: 'praiseTreat', component:praiseTreat},
            //     // {path: 'recomTreat', component:recomTreat},
                
            //   ]},
            // { path: 'assis', component:publishAssis,
            //   children:[
            //     // {path: 'collectInfor', component:collectInfor},
            //     // {path: 'sendInfor', component:sendInfor},
                
            //   ]},
            { path: 'query', component:publish,
              children:[
                {path: 'statisQuery', component:statisQuery},
            //     // {path: 'basicInforQuery', component:basicInforQuery},
            //     // {path: 'subQuery', component:subQuery},
            //     // {path: 'dailyBusinessQuery', component:dailyBusinessQuery},
              ]
            },
          ]
        },{
          path:'/3',component:custom,
          children:[
            // { path: '' , component:customWatch},
            // { path: 'watch', component:customWatch,
            //   children:[
            //     // {path: 'complaintHandle', component:complaintHandle},
            //     // {path: 'praiseTreat', component:praiseTreat},
            //     // {path: 'recomTreat', component:recomTreat},
            //   ]},
            // { path: 'assis', component:customAssis,
            //   children:[
            //     // {path: 'collectInfor', component:collectInfor},
            //     // {path: 'sendInfor', component:sendInfor},
                
            //   ]},
            // { path: 'query', component:customQuery,
            //   children:[
            //     // {path: 'orderTermQuery', component:orderTermQuery},
                
            //   ]},
          ]
        },{
          path:'/4',component:leader,
          children:[
            { path: '' , component:leader},
            { path: 'news', component:leader,
              children:[
                {path: 'newsOrderStation', component:newsOrderStation},
                {path: 'newsOrderYear', component:newsOrderYear},
                {path: 'annuNewsOrder', component:annuNewsOrder},
                {path: 'subOrderContrast', component:subOrderContrast},
                {path: 'subMoneyStation', component:subMoneyStation},
              ]},
            // { path: 'sub', component:leaderSub,
            //   children:[
            //     // {path: 'subPeriod', component:subPeriod},
            //     // {path: 'subCharacter', component:subCharacter},
                
            //   ]},
            // { path: 'order', component:leaderOrder,
            //   children:[
            //     // {path: 'complaSituatMonth', component:complaSituatMonth},
                
            //   ]},
          ]
        },{
          path:'5',component:leader
        },{
          path:'activePublic',component:activePublic,
          children:[
            { path: ''      , component: step1  },
            { path: 'step1', component: step1  },
            { path: 'step2', component: step2  },
            { path: 'step3', component: step3  },
            { path: 'step4', component: step4  }
          ]
        }
    ]
  }
]