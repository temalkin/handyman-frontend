export const formatTimestampET = () => {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
    return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second} ET`;
  } catch (err) {
    return new Date().toISOString();
  }
};

export const buildTelegramMessage = (title, sections = {}) => {
  const lines = [`${title}`, `Time: ${formatTimestampET()}`];
  for (const key of Object.keys(sections)) {
    const val = sections[key];
    if (val === undefined || val === null) continue;
    if (Array.isArray(val)) {
      lines.push(`${key}: ${val.length > 0 ? val.join(', ') : '-'}`);
    } else if (typeof val === 'object') {
      try {
        lines.push(`${key}: ${JSON.stringify(val)}`);
      } catch (_) {
        lines.push(`${key}: [object]`);
      }
    } else {
      lines.push(`${key}: ${String(val)}`);
    }
  }
  return lines.join('\n');
};


