function getMode(){
  const params = new URLSearchParams(location.search);
  return params.get('type') || 'student';
}
function normalizeMode(mode){
  return ['student','teacher','personal'].includes(mode) ? mode : 'student';
}
function buildUrl(page, options={}){
  const params = new URLSearchParams(location.search);
  Object.entries(options).forEach(([key,value]) => {
    if (value === undefined || value === null || value === '') params.delete(key);
    else params.set(key, value);
  });
  const qs = params.toString();
  return qs ? `${page}?${qs}` : page;
}
