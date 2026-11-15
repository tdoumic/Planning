/**
 * Script Google pour « Ma journée » (version 3, plus rapide).
 *
 * À quoi il sert : il lit TES agendas Google (avec ton propre compte) et les
 * transmet à ta page « Ma journée », qui ne peut pas les lire directement.
 *
 * Ce fichier ne contient aucune donnée personnelle. Tu n'as rien à modifier :
 * copie-le tel quel dans ton projet sur https://script.google.com
 * (le mode d'emploi complet est dans le fichier LISEZMOI.md).
 *
 * Pour qu'il soit rapide, active le service avancé « Google Calendar API »
 * (menu de gauche : Services, puis +). Sans ce service, le script fonctionne
 * quand même, mais beaucoup plus lentement.
 *
 * Attention : l'adresse que Google te donnera après le déploiement (elle se
 * termine par /exec) permet de lire ton agenda. Garde-la secrète, comme un mot
 * de passe : colle-la seulement dans les réglages de la page.
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var t0 = Date.now();
  var out;
  try {
    var now = new Date();
    var start = p.start ? new Date(Number(p.start)) : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    var end = p.end ? new Date(Number(p.end)) : new Date(start.getTime() + 15 * 864e5);
    // Limite de sécurité : 31 jours au maximum par demande.
    if (end.getTime() - start.getTime() > 31 * 864e5) end = new Date(start.getTime() + 31 * 864e5);

    // Mémoire de 5 minutes : si la page redemande la même chose, la réponse est immédiate.
    var cache = CacheService.getScriptCache();
    var key = 'v3:' + start.getTime() + ':' + end.getTime();
    var saved = cache.get(key);
    if (saved) {
      out = JSON.parse(saved);
      out.cache = true;
    } else {
      out = lireAgendas(start, end);
      try { cache.put(key, JSON.stringify(out), 300); } catch (err) {}
    }
  } catch (err) {
    out = { ok: false, error: String(err && err.message ? err.message : err) };
  }
  out.duree = Date.now() - t0;
  return repondre(out, p.callback);
}

function lireAgendas(start, end) {
  var tz = Session.getScriptTimeZone();
  var avance = typeof Calendar !== 'undefined';
  var out = { ok: true, methode: avance ? 'api' : 'lente', calendars: [], events: [] };
  CalendarApp.getAllCalendars().forEach(function (cal) {
    var name = cal.getName();
    out.calendars.push(name);
    var evs = null;
    if (avance) {
      try { evs = lireAvecApi(cal.getId(), start, end); } catch (err) { evs = null; }
    }
    if (!evs) {
      try { evs = lireLentement(cal, start, end, tz); } catch (err) { evs = []; }
    }
    evs.forEach(function (x) { x.calendar = name; out.events.push(x); });
  });
  return out;
}

// Rapide : une seule demande à Google par agenda.
function lireAvecApi(id, start, end) {
  var res = [], token = null, pages = 0;
  do {
    var options = {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
      maxResults: 250,
      fields: 'nextPageToken,items(summary,status,start,end,attendees(self,responseStatus))'
    };
    if (token) options.pageToken = token;
    var page = Calendar.Events.list(id, options);
    (page.items || []).forEach(function (ev) {
      if (ev.status === 'cancelled' || !ev.start || !ev.end) return;
      var refuse = (ev.attendees || []).some(function (a) { return a.self && a.responseStatus === 'declined'; });
      if (refuse) return;
      var allDay = !!ev.start.date;
      res.push({
        title: ev.summary || '(sans titre)',
        allDay: allDay,
        start: allDay ? ev.start.date : new Date(ev.start.dateTime).getTime(),
        end: allDay ? ev.end.date : new Date(ev.end.dateTime).getTime()
      });
    });
    token = page.nextPageToken;
    pages++;
  } while (token && pages < 10);
  return res;
}

// Lent : plusieurs demandes à Google pour chaque événement (utilisé seulement en secours).
function lireLentement(cal, start, end, tz) {
  return cal.getEvents(start, end).map(function (ev) {
    var allDay = ev.isAllDayEvent();
    return {
      title: ev.getTitle(),
      allDay: allDay,
      start: allDay ? Utilities.formatDate(ev.getAllDayStartDate(), tz, 'yyyy-MM-dd') : ev.getStartTime().getTime(),
      end: allDay ? Utilities.formatDate(ev.getAllDayEndDate(), tz, 'yyyy-MM-dd') : ev.getEndTime().getTime()
    };
  });
}

function repondre(out, cb) {
  var json = JSON.stringify(out);
  if (cb && /^[A-Za-z0-9_$]+$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + json + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

// À lancer depuis l'éditeur (bouton Exécuter) pour mesurer la vitesse.
function test() {
  var t = Date.now();
  var now = new Date();
  var out = lireAgendas(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
                        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8));
  console.log('Méthode : ' + out.methode + ' — ' + out.events.length + ' événements lus en ' +
              ((Date.now() - t) / 1000).toFixed(1) + ' s');
}
