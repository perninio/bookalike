function isOwner(tokenUserId, userId) {
  return tokenUserId === userId;
}

function isAdmin(role) {
  return role === "admin";
}

function isServer(role) {
  return role === "server";
}

module.exports = { isOwner, isAdmin, isServer };
