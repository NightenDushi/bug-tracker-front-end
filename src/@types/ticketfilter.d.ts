
export type TicketFilterType = {
    isAdmin:boolean,
    showOnlyOwned:number, //-1 = show all
    showCompleted:boolean,
    showDraft:boolean,
    sortOrder:("name"|"urgency"|"date"),
    setOnlyOwned(value:number):void,
    setCompleted(value:boolean):void,
    setDraft(value:boolean):void,
    setSortOrder(value:("name"|"urgency"|"date")):void,
}