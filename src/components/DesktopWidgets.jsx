import { useEffect, useState } from 'react';
import Draggable from './Draggable';
import { SONG, player } from './song';
import { useLanguage } from '../context/LanguageContext';

// ── The desktop widgets ──
// Like a Mac's: an analog clock (London time), a calendar for the month, a music player
// with the desktop's one song, a week of London weather, and one photo. All can be
// dragged around, like the folders.

const LONDON = 'Europe/London';

/** The time in London, ticking */
function useLondonNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/** Hours, minutes and seconds in London, whatever the visitor's own time zone */
function londonParts(now) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: LONDON, hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' }).formatToParts(now);
  const get = (type) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { h: get('hour'), m: get('minute'), s: get('second') };
}

export function ClockWidget({ locale }) {
  const { t } = useLanguage();
  const now = useLondonNow();
  const { h, m, s } = londonParts(now);
  const sec = s * 6;
  const min = (m + s / 60) * 6;
  const hour = ((h % 12) + m / 60) * 30;
  return (
    <Draggable id="widget-clock" className="lh-widget-card lh-wg-clock" aria-label={`${t('common.london')}, ${now.toLocaleTimeString(locale, { timeZone: LONDON, hour: '2-digit', minute: '2-digit' })}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => (
          <line key={i} className={i % 5 ? 'lh-wg-tick' : 'lh-wg-tick lh-wg-tick--hour'} x1="50" y1="4" x2="50" y2={i % 5 ? '6.5' : '9'} transform={`rotate(${i * 6} 50 50)`} />
        ))}
        <text x="50" y="32" textAnchor="middle" className="lh-wg-city">
          {t('common.london').toUpperCase()}
        </text>
        <line className="lh-wg-hand" x1="50" y1="50" x2="50" y2="27" strokeWidth="3.2" transform={`rotate(${hour} 50 50)`} />
        <line className="lh-wg-hand" x1="50" y1="50" x2="50" y2="14" strokeWidth="2.2" transform={`rotate(${min} 50 50)`} />
        <line className="lh-wg-hand lh-wg-hand--sec" x1="50" y1="58" x2="50" y2="10" strokeWidth="1" transform={`rotate(${sec} 50 50)`} />
        <circle cx="50" cy="50" r="2.4" className="lh-wg-pivot" />
      </svg>
    </Draggable>
  );
}

export function CalendarWidget({ locale }) {
  const now = useLondonNow();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2023, 0, 1 + i).toLocaleDateString(locale, { weekday: 'narrow' }));
  return (
    <Draggable id="widget-calendar" className="lh-widget-card lh-wg-cal">
      <div className="lh-wg-cal-day">{now.toLocaleDateString(locale, { weekday: 'long' })}</div>
      <div className="lh-wg-cal-date">{today}</div>
      <div className="lh-wg-cal-grid" aria-hidden="true">
        {weekdays.map((d, i) => (
          <span key={`w${i}`} className="lh-wg-cal-head">
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span key={i} className={d === today ? 'is-today' : undefined}>
            {d ?? ''}
          </span>
        ))}
      </div>
    </Draggable>
  );
}

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function MusicWidget() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(player.playing);
  const [time, setTime] = useState(0);
  useEffect(() => player.subscribe((s) => setPlaying(s.playing)), []);
  useEffect(() => {
    if (!playing) return undefined;
    const id = window.setInterval(() => setTime(player.time()), 250);
    return () => window.clearInterval(id);
  }, [playing]);
  const duration = player.duration();
  const stop = (e) => e.stopPropagation();
  const restart = () => {
    player.restart();
    setTime(0);
  };
  return (
    <Draggable id="widget-music" className={`lh-widget-card lh-wg-music ${playing ? 'is-playing' : ''}`}>
      <div className="lh-wg-music-top">
        <div className="lh-wg-music-art" aria-hidden="true">
          <span className="lh-wg-music-record" />
        </div>
        <div className="lh-wg-music-info">
          <div className="lh-wg-music-title">{SONG.title}</div>
          <div className="lh-wg-music-artist">
            {SONG.artist} — {t('music.album')}
          </div>
          <div className="lh-wg-music-controls">
            <button type="button" onPointerDown={stop} onClick={restart} aria-label={t('music.restart')}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <rect x="2.5" y="3" width="1.8" height="10" rx="0.6" />
                <path d="M13.5 3.6v8.8a.7.7 0 0 1-1.1.6L6 8.6a.7.7 0 0 1 0-1.2l6.4-4.4a.7.7 0 0 1 1.1.6z" />
              </svg>
            </button>
            <button type="button" className="lh-wg-music-play" onPointerDown={stop} onClick={() => player.toggle()} aria-label={`${t(playing ? 'music.pause' : 'music.play')}: ${SONG.title}`} aria-pressed={playing}>
              {playing ? (
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
                  <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.2-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z" />
                </svg>
              )}
            </button>
            <button type="button" onPointerDown={stop} onClick={restart} aria-label={t('music.playFromStart')}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <rect x="11.7" y="3" width="1.8" height="10" rx="0.6" />
                <path d="M2.5 3.6v8.8a.7.7 0 0 0 1.1.6L10 8.6a.7.7 0 0 0 0-1.2L3.6 3a.7.7 0 0 0-1.1.6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="lh-wg-music-progress" aria-hidden="true">
        <span style={{ width: `${Math.min(100, (time / duration) * 100)}%` }} />
      </div>
      <div className="lh-wg-music-times" aria-hidden="true">
        <span>{fmt(time)}</span>
        <span>-{fmt(Math.max(0, duration - time))}</span>
      </div>
    </Draggable>
  );
}

// Open-Meteo weather codes → a simple sun / cloud / rain / snow / storm icon
const kind = (code) => {
  if (code === 0 || code === 1) return 'sun';
  if ([2, 3, 45, 48].includes(code)) return 'cloud';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'storm';
  return 'rain';
};

function WeatherIcon({ type }) {
  if (type === 'sun') {
    return (
      <svg viewBox="0 0 24 24" className="lh-wg-wx lh-wg-wx--sun" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${i * 45} 12 12)`} />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={`lh-wg-wx lh-wg-wx--${type}`} aria-hidden="true">
      <path d="M7 17.5h10a4 4 0 0 0 .5-8A5.5 5.5 0 0 0 7 9.6a4 4 0 0 0 0 7.9z" />
      {type === 'rain' && <path className="lh-wg-wx-drops" d="M9 19.5l-.8 2M13 19.5l-.8 2M17 19.5l-.8 2" />}
      {type === 'snow' && <path className="lh-wg-wx-drops" d="M9 20.5h.01M13 21h.01M17 20.5h.01" />}
      {type === 'storm' && <path className="lh-wg-wx-bolt" d="M12.5 17.5l-2 3h2.5l-1.5 3" />}
    </svg>
  );
}

export function WeatherWidget({ locale }) {
  const { t } = useLanguage();
  const [days, setDays] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&daily=weathercode,temperature_2m_max&timezone=Europe%2FLondon&forecast_days=7')
      .then((r) => r.json())
      .then((data) => {
        if (!alive || !data?.daily) return;
        setDays(data.daily.time.map((date, i) => ({ date, code: data.daily.weathercode[i], max: Math.round(data.daily.temperature_2m_max[i]) })));
      })
      .catch(() => {}); // the widget simply shows empty days if this fails
    return () => {
      alive = false;
    };
  }, []);
  const week = days ?? Array.from({ length: 7 }, (_, i) => ({ date: new Date(Date.now() + i * 864e5).toISOString().slice(0, 10), code: null, max: null }));
  return (
    <Draggable id="widget-weather" className="lh-widget-card lh-wg-weather">
      <div className="lh-wg-weather-city">{t('common.london')}</div>
      <ul className="lh-wg-weather-days">
        {week.map((d) => (
          <li key={d.date}>
            <span className="lh-wg-weather-name">{new Date(`${d.date}T12:00:00`).toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}</span>
            {d.code === null ? <span className="lh-wg-wx" /> : <WeatherIcon type={kind(d.code)} />}
            <span className="lh-wg-weather-temp">{d.max === null ? '–' : `${d.max}°`}</span>
          </li>
        ))}
      </ul>
    </Draggable>
  );
}

export function PhotoWidget({ src, caption }) {
  return (
    <Draggable id="widget-photo" className="lh-widget-card lh-wg-photo">
      <img src={src} alt={caption} draggable={false} />
    </Draggable>
  );
}
