// Entities should be an enum of: 'employees', 'floors', or 'rooms'.
export default {
  adminHomepage: '/admin',
  adminEntities: (entityName) => `/admin/entities/${entityName}`,
  adminCreateEntities: (entityName) => `/admin/entities/create/${entityName}`,
  adminEarnings: '/admin/earnings',
  adminEditEntities: (entityName, id) => `/admin/entities/edit/${entityName}?id=${id}`,
  adminVisitors: '/admin/visitors',
  adminVisitorCreate: (roomSlug) => `/admin/visitors/${roomSlug}`,
  adminOrders: `/admin/orders`,
  homepage: '/',
  listOfRooms: '/rooms',
  profile: '/profile',
  roomDetail: (roomSlug) => `/rooms/${roomSlug}`,
  signIn: '/sign-in',
  signUp: '/sign-up',
  unauthorized: '/unauthorized',
};
