import julian from 'astronomia/julian'
import solar from 'astronomia/solar'
import moon from 'astronomia/moonposition'
import base from 'astronomia/base'

const sunSigns = [
  { sign: "Aries", start: 0, end: 30 },
  { sign: "Taurus", start: 30, end: 60 },
  { sign: "Gemini", start: 60, end: 90 },
  { sign: "Cancer", start: 90, end: 120 },
  { sign: "Leo", start: 120, end: 150 },
  { sign: "Virgo", start: 150, end: 180 },
  { sign: "Libra", start: 180, end: 210 },
  { sign: "Scorpio", start: 210, end: 240 },
  { sign: "Sagittarius", start: 240, end: 270 },
  { sign: "Capricorn", start: 270, end: 300 },
  { sign: "Aquarius", start: 300, end: 330 },
  { sign: "Pisces", start: 330, end: 360 },
];

const getSignFromDeg = deg => {
  deg = deg % 360
  const sign = sunSigns.find(s => deg >= s.start && deg < s.end)
  return sign ? sign.sign : null
}

const rad2deg = rad => rad * 180 / Math.PI

export const calculateBirthChart = (dob, tob) => {
  const [year, month, day] = dob.split("-").map(Number)
  const [hour, minute] = tob.split(":").map(Number)

  const jd = julian.CalendarGregorianToJD(year, month, day) + (hour + minute / 60) / 24

  // Nap pozíció
  const T = base.J2000Century(jd)
  const sunLonRad = solar.apparentLongitude(T)
  const sunDeg = rad2deg(sunLonRad)
  const starsign = getSignFromDeg(sunDeg)

  // Hold pozíció
  const moonLonRad = moon.position(jd).lon
  const moonDeg = rad2deg(moonLonRad)
  const moonsign = getSignFromDeg(moonDeg)

  // Egyszerűsített Ascendent: helyi sziderikus idő (Greenwich + ~Debrecen)
  const longitude = 21.63 // Debrecen hosszúsága
  const lst = (280.16 + 360.9856235 * (jd - 2451545) + longitude) % 360
  const ascendent = getSignFromDeg(lst)

  return { starsign, moonsign, ascendent }
}

