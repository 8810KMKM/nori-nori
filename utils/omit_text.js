export default locationName => {
  // 句読点, カンマ, 半角スペース, 全角スペース
  const SPLIT_CHAR = /[、, 　]/; 
  const MAX_LENGTH = 15;

  const _locationName = locationName.split(SPLIT_CHAR);

  const topLessName = _locationName.length > 1 
    ? _locationName.splice(1)
    : _locationName
  
  const reversedName = topLessName.reverse().join(' ');

  return reversedName.length > MAX_LENGTH
    ? `${reversedName.slice(0, MAX_LENGTH)}...`
    : reversedName
}