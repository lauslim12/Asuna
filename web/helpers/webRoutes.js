export default {
  adminHomepage: '/admin',
  adminEntities: (entityName) => `/admin/entities/${entityName}`,
  adminCreateEntities: (entityName) => `/admin/entities/create-${entityName}`,
  adminOrders: `/admin/orders`,
  homepage: '/',
  listOfRooms: '/rooms',
  profile: '/profile',
  roomDetail: (roomSlug) => `/rooms/${roomSlug}`,
  signIn: '/sign-in',
};
