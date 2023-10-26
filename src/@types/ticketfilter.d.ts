
export type TicketFilterType = {
    isAdmin:boolean,
    showOnlyOwned:boolean,
    showCompleted:boolean,
    showDraft:boolean,
    setOnlyOwned(value:boolean):void,
    setCompleted(value:boolean):void,
    setDraft(value:boolean):void,
}