import { createContext } from 'react';
import { UserType } from './@types/user';
import { TicketFilterType } from './@types/ticketfilter';

export const UserContext = createContext<UserType>({ id: 0, setId: (_value: number) => { } });
export const TicketFilterContext = createContext<TicketFilterType>({ isAdmin: false, showOnlyOwned: -1, showCompleted: false, showDraft: false, sortOrder: "name", setOnlyOwned: (_value: number) => { }, setCompleted: (_value: boolean) => { }, setDraft: (_value: boolean) => { }, setSortOrder: (_value: ("name" | "urgency" | "date")) => { } });
