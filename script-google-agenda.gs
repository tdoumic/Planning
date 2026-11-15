/**
 * Script Google pour « Ma journée ».
 *
 * À quoi il sert : il lit TES agendas Google (avec ton propre compte) et les
 * transmet à ta page « Ma journée », qui ne peut pas les lire directement.
 *
 * Ce fichier ne contient aucune donnée personnelle. Tu n'as rien à modifier :
 * copie-le tel quel dans un nouveau projet sur https://script.google.com
 * (le mode d'emploi complet est dans le fichier LISEZMOI.md).
 *
 * Attention : l'adresse que Google te donnera après le déploiement (elle se
 * termine par /exec) permet de lire ton agenda. Garde-la secrète, comme un mot
 * de passe : colle-la seulement dans les réglages de la page.
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var out;
  try {
    var tz = Session.getScriptTimeZone();
    var now = new Date();
    var start = p.start ? new Date(Number(p.start)) : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    var end = p.end ? new Date(Number(p.end)) : new Date(start.getTime() + 15 * 864e5);
    // Limite de sécurité : 31 jours au maximum par demande.
    if (end.getTime() - start.getTime() > 31 * 864e5) end = new Date(start.getTime() + 31 * 864e5);

    out = { ok: true, calendars: [], events: [] };
    CalendarApp.getAllCalendars().forEach(function (cal) {
      var name = cal.getName();
      out.calendars.push(name);
      cal.getEvents(start, end).forEach(function (ev) {
        try {
          if (ev.getMyStatus && ev.getMyStatus() === CalendarApp.GuestStatus.NO) return; // invitations refusées
        } catch (err) {}
        var allDay = ev.isAllDayEvent();
        out.events.push({
          calendar: name,
          title: ev.getTitle(),
          allDay: allDay,
          start: allDay ? Utilities.formatDate(ev.getAllDayStartDate(), tz, 'yyyy-MM-dd') : ev.getStartTime().getTime(),
          end: allDay ? Utilities.formatDate(ev.getAllDayEndDate(), tz, 'yyyy-MM-dd') : ev.getEndTime().getTime()
        });
      });
    });
  } catch (err) {
    out = { ok: false, error: String(err && err.message ? err.message : err) };
  }
  var json = JSON.stringify(out);
  var cb = p.callback;
  if (cb && /^[A-Za-z0-9_$]+$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + json + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
