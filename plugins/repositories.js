import createRepository from '@/repositories/Repository'

export default (app, inject) => {
  inject('repositories', createRepository(app))
}
