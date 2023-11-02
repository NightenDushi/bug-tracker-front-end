
export type TicketFilterType = {
    isAdmin:boolean,
    showOnlyOwned:boolean,
    showCompleted:boolean,
    showDraft:boolean,
    sortOrder:("name"|"urgency"|"date"),
    setOnlyOwned(value:boolean):void,
    setCompleted(value:boolean):void,
    setDraft(value:boolean):void,
    setSortOrder(value:("name"|"urgency"|"date")):void,
}