// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (app, inject) {
  inject('enum', {
    httpStatus: {
      BadGateway: 502,
      BadRequest: 400,
      Created: 201,
      NotFound: 404,
      OK: 200,
      Unauthorized: 401,
    },
    roles: {
      categoryExpert: 'Category Expert',
      assessor: 'Assessor',
      internalOwner: 'Internal Owner',
      groupAdmin: 'Group Admin',
    },
    workFlowStatus: {
      complete: 'Complete',
      inProgress: 'In Progress',
    },
  })
}
