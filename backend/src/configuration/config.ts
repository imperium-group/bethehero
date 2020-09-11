export default {
  port: process.env.PORT || 3333,
  folderStorage: process.env.URL_STORAGE || '/storage',
  pictureQuality: process.env.PICTURE_QUALITY || 80, 
  secretKey: process.env.SECRETKEY || '5db12095fcfac8b1d6bbf1461d56882b',
  publicRoutes: process.env.PUBLICROUTES || [
    'users/create',
    'users/auth',
    'customer/create',
    'storage'
  ]
}