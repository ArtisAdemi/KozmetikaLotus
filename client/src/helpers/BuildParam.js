export default function buildUrl(parameters) {
    var qs = "";
    for (var key in parameters) {
      var value = parameters[key];
      if (value !== null && value !== '') {
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
    }
    if (qs.length > 0) {
      return qs.substring(0, qs.length - 1); //chop off last "&"
    }
    return '';
}