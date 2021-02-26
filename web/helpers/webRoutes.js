export default {
  adminHomepage: '/admin',
  adminEntities: '/admin/entities',
  adminCreateEntities: (entityName) => `/admin/entities/create-${entityName}`,
  adminOrders: `/admin/orders`,
  homepage: '/',
  listOfEntities: (entityName) => `/admin/entities/${entityName}`,
  listOfRooms: '/rooms',
  profile: '/profile',
  roomDetail: (roomSlug) => `/rooms/${roomSlug}`,
  signIn: '/sign-in',
};
