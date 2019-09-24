const jwt = require('jsonwebtoken');

const getUserId = function(ctx) {
  const { userId } = jwt.decode(ctx.cookies.get('token'));
  if (!userId || userId === '') {
    throw new Error('用户无权限执行此操作')
  } else {
    return userId;
  }
};

module.exports = {
  getUserId,
};
