/**
 # crated: 2018/9/1
 # author: Monster
 # description: 用于 app 端调起 H5 页面，H5 重定向
 */

// 静态路由
let staticRoute = {
  'medicalServices': 'medical-services', // 医疗服务
  'walkIntoJx': 'walk-into-jx', // 走进JX
  'convenientPeopleLife': 'convenient-people-life', // 便民服务
  'swimInJx': 'swim-in-jx', // 游在JX
  'shoppingInJx': 'shopping-in-jx', // 购在JX
  'eatInJx': 'eat-in-jx', // 吃在JX
  'investmentInJx': 'investment-in-jx', // 投在莒县
  'happyInJx': 'happy-in-jx', // 乐在莒县
  'jxNews': 'jx-news', // 莒县新闻
  'specials': 'specials' // 特色专题
};

// 动态路由，retern routeName
// function dynamicRoute (page, payload) {
function dynamicRoute () {
  // switch (page) {
  // 电子报告
  // case 'onlineReport' :
  // 将 payload.data 数据解析到 payload 层
  // if (payload.type === 0) {
  //   payload.report_url = payload.data.payload
  //   return `/online-reports`
  // } else {
  //   payload.chapter_id = payload.data.chapter_id
  //   payload.scale_id = payload.data.scale_id
  //   return `/scale-details/scales`
  // }
  // }
}

export function nativeRoute (to) {
  let query = to.query;
  let queryData = JSON.parse(query.data);
  let page = queryData.page;
  let payload = queryData.payload || {};
  let routeName = staticRoute[page];
  if (!routeName) {
    routeName = dynamicRoute(page, payload);
  }
  // routeName to route Object
  // 组装 vue-route， route object
  // TODO 拼接 token
  if (query.token) {
    payload.token = query.token;
  }
  let route = {};
  route.path = routeName;
  route.query = payload;
  return route;
}
