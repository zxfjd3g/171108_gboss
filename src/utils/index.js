/*
包含n个工具函数的模块
 */
/*
注册boss--> /bossinfo
注册牛人--> /geniusinfo
登陆boss --> /bossinfo 或者 /boss
登陆牛人 --> /geniusinfo 或者 /genius
 */
export function getRedirectPath(type, avatar) {
  let path = ''

  // 根据type得到path
  path += type==='boss' ? '/boss' : '/genius'

  // 如果没有头像添加info
  if(!avatar) {
    path += 'info'
  }

  return path
}