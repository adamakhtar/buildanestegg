module.exports = {
  pluginOptions: {
    s3Deploy: {
      awsProfile: 'buildanestegg',
      region: 'ap-northeast-1',
      bucket: 'buildanestegg',
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
}
