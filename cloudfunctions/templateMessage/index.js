// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.action) {
        case 'requestSubscribeMessage': {
        return requestSubscribeMessage(event);
        }
        case 'sendBorrowSubscribeMessage': {
        return sendBorrowSubscribeMessage(event);
        }
        case 'sendReturnSubscribeMessage': {
        return sendReturnSubscribeMessage(event);
        }
        default: {
        return;
        }
    }
};

async function sendBorrowSubscribeMessage(event) {
    const { data } = event;
    try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: cloud.getWXContext().OPENID, // 通过 getWXContext 获取 OPENID
        page: 'pages/index/index',
        data: {
          // 借阅日期
        time7: {
            value: data.time7,
            // value: '2015年01月05日 12:30',
        },
          // 应还日期
        time8: {
            value: data.time8,
            // value: '2015年01月06日 12:30',
        },
          // 书名
        thing5: {
            value: data.thing5,
            // value: '339208499',
        },
          // 图书拥有者
        thing6: {
            value: data.thing6,
            // value: '腾讯微信总部',
        },
          // 结果
        thing3: {
            value: data.thing3,
            // value: '广州市海珠区新港中路397号',
        },
        },
        templateId: 'NvcQPI8FErNTWUXm1FptE4YnUb1c1h0D87hugXXwdus',
    });
      // result 结构
      // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
    return result;
    } catch (err) {
      // 错误处理
      // err.errCode !== 0
    throw err;
    }
}
async function sendReturnSubscribeMessage(event) {
    const { data } = event;

    try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: cloud.getWXContext().OPENID, // 通过 getWXContext 获取 OPENID
        page: 'pages/index/index',
        data: {
          // 书名
        name1: {
            value: data.name1,
            // value: '腾讯微信总部',
        },
          // 借阅者
        name2: {
            value: data.name2,
            // value: '腾讯微信总部',
        },
          // 还书时间
        time5: {
            value: data.time5,
            // value: '2015年01月06日 12:30',
        },
          // 备注
        thing4: {
            value: data.thing4,
            // value: '腾讯微信总部',
        },
        },
        templateId: 'rKeBG_kEKmjwp5vF8fq4gfDuD8bA8omhQNWtcJqEpaY',
    });
      // result 结构
      // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
    return result;
    } catch (err) {
      // 错误处理
      // err.errCode !== 0
    throw err;
    }
}


