const geoip = require('geoip-lite');
const restirictAccessibility = (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip === '127.0.0.1' || ip === '::1') {
    return next();
  }
  ip = ip.includes('::ffff:') ? ip.split('::ffff:')[1] : ip;
  const geo = geoip.lookup(ip);
  if (!geo || geo.country !== 'AZ') {
    const lang = req.headers['accept-language'] ? req.headers['accept-language'].split(',')[0] : 'en';
    const messages = {
      az: "Bu ölkədən bu sayta daxil olmaq mümkün deyil.",
      ru: "С этого региона доступ к сайту невозможен.",
      tr: "Bu ülkeden bu siteye erişmek mümkün değildir.",
      en: "Access to this site is not allowed from this country."
    };
    const message = messages[lang] || messages.en;
    return res.status(403).send(message);
  }
  next();
};
module.exports = restirictAccessibility