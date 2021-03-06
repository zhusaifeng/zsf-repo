// 云函数入口文件
const cloud = require('wx-server-sdk')

//是用于标志当前所在环境
//cloud.init: 设置 API 默认环境等于当前所在环境
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) =>
{
    try 
    {
        const result = await cloud.openapi.template.send({
          touser: cloud.getWXContext().OPENID, 
          templateId: "jvFdutiH3lbhEasg1BfUQ_WIqamSVZbSCAwO8BJDoQY",
          page: '/pages/books/books',
          data: {
            thing1: {
              value: event.bookname,
            },
            thing2: {
              value: event.borrowpeople,
            },
            data3: {
              value: event.returntime,
            },
          },
        })
        return result
      }
      catch(err){
          throw err
      }
}