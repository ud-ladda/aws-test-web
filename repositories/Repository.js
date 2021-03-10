import RasUserRepository from '~/repositories/RasUserRepository'
import AuthRepository from '~/repositories/AuthRepository'

export default ({ $axios }) => ({
  rasUser: RasUserRepository($axios),
  auth: AuthRepository($axios),
})
