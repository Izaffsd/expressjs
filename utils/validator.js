const validNoKp = (no_kp) => {
    if(!no_kp) return false // required
    return  /^\d{12}$/.test(no_kp)  // EXACT 12 digits

}

const validEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

module.exports = { 
    validNoKp,
    validEmail
}