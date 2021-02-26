// Entities should be an enum of: 'employees', 'floors', or 'rooms'.
export default {
  adminHomepage: '/admin',
  adminEntities: (entityName) => `/admin/entities/${entityName}`,
  adminCreateEntities: (entityName) => `/admin/entities/create/${entityName}`,
  adminEditEntities: (entityName, id) => `/admin/entities/edit/${entityName}?id=${id}`,
  adminOrders: `/admin/orders`,
  homepage: '/',
  listOfRooms: '/rooms',
  profile: '/profile',
  roomDetail: (roomSlug) => `/rooms/${roomSlug}`,
  signIn: '/sign-in',
};
