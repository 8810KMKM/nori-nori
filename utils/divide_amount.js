export default amount => {
  if (20 <= amount) {
    const divValue = Math.floor(amount / 10);
    return {
      single: amount - (divValue * 10),
      multi: divValue
    };
  };
  return {
    single: amount,
    multi: 0
  };
};