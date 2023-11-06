//Display time interval properly

export default function Interval(pDate:Date){
    if (pDate===undefined) return ""

    const Now = new Date().valueOf();
    const isoDate = pDate.valueOf();
    
    const MILLISECOND_SECOND = 1000;
    const MILLISECOND_MINUTE = MILLISECOND_SECOND*60;
    const MILLISECOND_HOUR = MILLISECOND_MINUTE*60;
    const MILLISECOND_DAY = MILLISECOND_HOUR*24;
    const MILLISECOND_WEEK = MILLISECOND_DAY*7;
    const MILLISECOND_MONTH = MILLISECOND_DAY*30;
    const MILLISECOND_YEAR = MILLISECOND_DAY*365;
    
    let interval = Math.abs(Now - isoDate);
    if (interval<MILLISECOND_MINUTE) {const i=Math.floor(interval/MILLISECOND_SECOND); return i+" second"+((i>1)?"s":"")};
    if (interval<MILLISECOND_HOUR) {const i=Math.floor(interval/MILLISECOND_MINUTE); return i+" minute"+((i>1)?"s":"")};
    if (interval<MILLISECOND_DAY) {const i=Math.floor(interval/MILLISECOND_HOUR); return i+" hour"+((i>1)?"s":"")};
    if (interval<MILLISECOND_WEEK) {const i=Math.floor(interval/MILLISECOND_DAY); return i+" day"+((i>1)?"s":"")};
    if (interval<MILLISECOND_MONTH) {const i=Math.floor(interval/MILLISECOND_WEEK); return i+" week"+((i>1)?"s":"")};
    if (interval<MILLISECOND_YEAR) {const i=Math.floor(interval/MILLISECOND_MONTH); return i+" month"+((i>1)?"s":"")};
    const i=Math.floor(interval/MILLISECOND_YEAR);
    return i+" year"+((i>1)?"s":"");
}