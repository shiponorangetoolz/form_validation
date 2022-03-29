export const isPhoneValid = (phone) => {
  return phone.match(
    /^(\+)?([ 0-9]){10,16}$/
  );
};
