// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (app, inject) => {
  inject('apis', {
    signedUrlUpload: '/signedUrl/upload',
  })
}
