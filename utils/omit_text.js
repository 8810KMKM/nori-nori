export default locationName => {
  const _locationName = locationName.split(/[、, 　]/);

  const topLessName = _locationName.length > 1 
    ? _locationName.splice(1)
    : _locationName
  
  const reversedName = topLessName.reverse().join(' ');

  return reversedName.length > 15 
    ? `${reversedName.slice(0, 15)}...`
    : reversedName
}