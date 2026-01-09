const validNoKp = (no_kp) => {
    if(!no_kp) return false // required
    return  /^\d{12}$/.test(no_kp)  // EXACT 12 digits

}

const validEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validId = (id) => {
  const num = Number(id)
  return Number.isInteger(num) && num > 0
}

const validCourseCode = (code) => {
  return typeof code === 'string' && /^[A-Z]{2,4}$/.test(code)
}

const validMatricNo = (matricNo) => {
  if (typeof matricNo !== 'string') return false

  // 2–4 chars + 4 digits
  const regex = /^[A-Z]{2,4}[0-9]{4}$/

  return regex.test(matricNo)
}



module.exports = { 
    validNoKp,
    validEmail,
    validId,
    validCourseCode,
    validMatricNo
}