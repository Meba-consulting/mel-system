export function formatUsersList(users) {
  return users.map((user, index) => {
    return {
      position: index + 1,
      firstName: user?.firstName.toUpperCase(),
      surname: user?.surname.toUpperCase(),
      phoneNumber: user?.phoneNumber ? user?.phoneNumber : '-',
      email: user?.email ? user?.email : '-',
      username: user?.userCredentials?.user?.username,
      action: user,
    };
  });
}
