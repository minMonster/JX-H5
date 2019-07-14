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
  'swimInJx': 'list-template/2', // 游在JX
  'shoppingInJx': 'list-template/4', // 购在JX
  'eatInJx': 'list-template/3', // 吃在JX
  'investmentInJx': 'investment-in-jx', // 投在莒县
  'happyInJx': 'list-template/6', // 乐在莒县
  'jxNews': 'jx-news', // 莒县新闻
  'specials': 'list-template/8', // 特色专题
  'store': 'store', // 商城
  'signIn': 'sign-in', // 签到
  'agreement': 'agreement', // 协议
  'governmentServices': 'government-services', // 政务服务 payload: {id: 1}
  'pay-payment': 'pay-payment', // 缴费付款
  'complaintsSuggestions': 'complaints-suggestions', // 投诉建议
  'warrantyMaintenance': 'warranty-maintenance', // 保修建议
  'propertyNotice': 'property-notice', // 物业通知
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
