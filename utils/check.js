
/**检测手机格式 */
function checkPhone(phone){
  var RegPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (phone.length != 11) {
    return false;
  }else{
    return true;
  }
}
/**检测邮箱格式 */
function checkEmail(value) {
  var RegPhone = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!RegPhone.test(value)) {
    return false;
  } else {
    return true;
  }
}
/**检测身份证格式 */
function checkIdcard(value) {
  var RegPhone = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (!RegPhone.test(value)) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  checkPhone: checkPhone,
  checkEmail: checkEmail,
  checkIdcard: checkIdcard
}