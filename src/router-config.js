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

import centerDict from './page/centerManage/dictionary/index.vue'
import centerHur from './page/centerManage/humanresources/index.vue'

import login from './page/Login.vue'
import mainview from './page/mainview.vue'


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
            { path: '' , component:centerDict},
            { path: 'dict', component:centerDict,
              children:[
                // {path: 'deparment', component:deparment},
                // {path: 'jobCategory', component:jobCategory},
                // {path: 'newspaper', component:newspaper},
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
            // { path: 'query', component:publishQuery,
            //   children:[
            //     // {path: 'statisQuery', component:statisQuery},
            //     // {path: 'basicInforQuery', component:basicInforQuery},
            //     // {path: 'subQuery', component:subQuery},
            //     // {path: 'dailyBusinessQuery', component:dailyBusinessQuery},
            //   ]},
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
            // { path: '' , component:leaderNews},
            // { path: 'news', component:leaderNews,
            //   children:[
            //     // {path: 'newsOrderStation', component:newsOrderStation},
            //     // {path: 'newsOrderYear', component:newsOrderYear},
            //     // {path: 'annuNewsOrder', component:annuNewsOrder},
            //     // {path: 'subOrderContrast', component:subOrderContrast},
            //     // {path: 'subMoneyStation', component:subMoneyStation},
            //   ]},
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