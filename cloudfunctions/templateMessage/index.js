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


async function sendReturnSubscribeMessage(event) {
    const { data } = event;

    try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: cloud.getWXContext().OPENID, // 通过 getWXContext 获取 OPENID
        templateId: 'XL4TdPW3FyZeaLGikS_L2ujiTnIpXipEcSDie9OU2WY',
        page: 'pages/index/index',
        data: {
          // 书名
        name1: {
            "value":'公路工程',
            // value: '腾讯微信总部',
        },
          // 借阅者
        name2: {
            "value": data.name2,
        },
          // 还书时间
        time5: {
            "value": data.time5,
        },
          // 备注
        thing4: {
            "value": data.thing4,
        },
        },
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


