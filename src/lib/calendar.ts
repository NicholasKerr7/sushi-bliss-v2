export interface CalendarEventDownload {
  description: string;
  endsAt: Date;
  fileName: string;
  location: string;
  startsAt: Date;
  summary: string;
  uid: string;
}

/** Downloads a simple iCalendar event from client-side reservation data. */
export function downloadCalendarEvent(event: CalendarEventDownload) {
  const calendarContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sushi Bliss//Reservations//EN",
    "BEGIN:VEVENT",
    `UID:${escapeCalendarValue(event.uid)}`,
    `DTSTAMP:${formatCalendarDate(new Date())}`,
    `DTSTART:${formatCalendarDate(event.startsAt)}`,
    `DTEND:${formatCalendarDate(event.endsAt)}`,
    `SUMMARY:${escapeCalendarValue(event.summary)}`,
    `LOCATION:${escapeCalendarValue(event.location)}`,
    `DESCRIPTION:${escapeCalendarValue(event.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const calendarBlob = new Blob([calendarContent], {
    type: "text/calendar;charset=utf-8",
  });
  const calendarUrl = URL.createObjectURL(calendarBlob);
  const calendarLink = document.createElement("a");

  calendarLink.href = calendarUrl;
  calendarLink.download = event.fileName;
  document.body.appendChild(calendarLink);
  calendarLink.click();
  calendarLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(calendarUrl), 0);
}

/** Formats a Date for portable UTC iCalendar timestamps. */
function formatCalendarDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

/** Escapes text fields before writing a browser-generated iCalendar file. */
function escapeCalendarValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
