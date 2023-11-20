import { useState, useContext, useEffect, MouseEvent, KeyboardEvent} from 'react';
import { UserContext } from './App.tsx';
import { ITicket } from './@types/tickets'
import { CommentType } from './@types/comment'

import { DevAvailable } from './const/DevAvailable.tsx';
import { TagsAvailable } from './const/TagsAvailable.tsx';
import { TicketsAvailable, RemoveTicket, GetComments, AddCommentTicket, RemoveCommentTicket, LikeCommentTicket } from './const/TicketsAvailable.tsx';

import { TicketDueDate } from './Tickets/TicketDueDate.tsx';
import { DevAvatar } from './DevAvatar.tsx';
import { TicketTags } from './Tickets/TicketTags.tsx';

import { AlertModal } from './AlertModal.tsx';

import Interval from './utils/interval.ts'

import heartIcon from './assets/heart-solid.svg';
import xIcon from './assets/xmark-solid.svg'

//TODO(Nathan) Pass the ticket directly in the props
type NewTicketModalProps = {
  ticket_id?:number,
  isAdmin?:boolean,
  isDraft?:boolean,
  urgency?:number,
  title?:string,
  body?:string,
  tags?:number[],
  person_assigned?:number[],
  dueDate?:string,
  comments_number?:number,
  close:()=>void,
  actionTicketModal:(...args:any)=>void,
  setTickets?:(prevVar: ITicket[] | ((a: ITicket[]) => ITicket[])) => void,
  
}

export function NewTicketModal(props:NewTicketModalProps) {
  const {id:user_id} = useContext(UserContext);
  const isAdmin = (props.isAdmin === undefined) ? true : props.isAdmin;

  const [urgency, setUrgency] = useState<number>(props?.urgency||0);
  const [title, setTitle] = useState<string>(props?.title||"");
  const [body, setBody] = useState<string>(props?.body||"");

  const [isDraft, setDraft] = useState<boolean>((props.isDraft === undefined) ? true : props.isDraft);

  const [activeTags, setActiveTags] = useState<number[]>(props?.tags||[])
  const [activeDev, setActiveDev] = useState<number[]>(props?.person_assigned||[])
  
  const [dueDate, setDueDate] = useState<string>(props?.dueDate||"")

  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const addticket = (e:(KeyboardEvent|MouseEvent))=>{
        if (isAdmin) {props.actionTicketModal(title, body, urgency, activeTags, isDraft, activeDev, dueDate); props.close()}
        else props.actionTicketModal(e)
    }

  const [comments, setComments] = useState<CommentType[]>([])
  useEffect(() => {
    if (props.ticket_id!==undefined) {
      console.log("foo "+props.ticket_id)
      GetComments(props.ticket_id, setComments)
    };
  }, [])
  console.log(comments)


  if (isAdmin) return <div className="modal d-block modal-background" tabIndex={-1} role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
            <div className="d-flex w-75">
                <h5 className="modal-title align-self-end">New tickets</h5>
                <select id="ticket_urgency" name="sort_mode" className={"form-control w-25 ms-2"+((urgency==1)?" bg-warning text-white":((urgency==2)?" bg-danger text-white":""))} 
                        value={urgency} onChange={(e)=>{setUrgency(parseInt(e.target.value))}}>
                    <option value="0">Standard</option>
                    <option value="1">Hurry</option>
                    <option value="2">Urgent</option>
                </select>

            </div>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <label>Developers</label>
          <div>
              {DevAvailable.map((dev)=>{
                  const dev_activated = (activeDev.includes(dev.id));
                  return    <a className="me-2" key={dev.id} href="#" onClick={()=>{setActiveDev((pDev)=>{
                                //Add or remove the tag from the active tag array
                                if (!dev_activated) return [...pDev, dev.id]
                                else return pDev.filter((e) => { return e !== dev.id })     
                                })}}>
                                <DevAvatar dev={dev} activated={dev_activated} deactivatedClass="opacity-25" />
                            </a>
                })}
          </div>
          <label htmlFor="ticket_name">Title</label>
          <input className="form-control" name="ticket_name" id="ticket_name"
            value={title}
            onChange={(e) => { e.preventDefault(); setTitle(e.target.value); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { addticket(e) } }}
            ></input>
          <label htmlFor="ticket_body">Body</label>
          <textarea className="form-control" name="ticket_body" id="ticket_name"
            value={body}
            onChange={(e) => { e.preventDefault(); setBody(e.target.value); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { addticket(e) } }}
          ></textarea>
        </div>

        <div className="container d-flex justify-content-between">
        <ul className="d-flex list-unstyled">
            {TagsAvailable.map((tag)=>
                <a href="#" className="text-decoration-none"
                onClick={()=>{setActiveTags((pTags)=>{
                    //Add or remove the tag from the active tag array
                    if (!activeTags.includes(tag.id)) return [...pTags, tag.id]
                    else return pTags.filter((e) => { return e !== tag.id })
                })}}
                key={tag.id}>
                    <TicketTags on={(activeTags.includes(tag.id))} color={tag.color}>{tag.text}</TicketTags>
                </a>
            )}
        </ul>
        <label htmlFor="due_date" className={"w-50 "+((dueDate=="")?"opacity-50":"")}>Due date
        <input id="due_date" className={"form-control"} type="date"
        value={dueDate}
        onChange={(e)=>{setDueDate(e.target.value)}}></input>

        </label>
        </div>

        <div className="modal-footer">
          {props.ticket_id!==undefined && (<a href="#" className="text-danger me-auto" onClick={()=>{setShowAlertModal(true);}}>Delete</a>)}
          <label>Keep as draft</label>
          <input type="checkbox" checked={isDraft}
                onChange={()=>{setDraft(!isDraft)}}></input>
          <button type="button" className="btn btn-primary"
            onClick={addticket}
          >{(props.ticket_id===undefined)?"Create":"Update"}</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.close}>Close</button>
        </div>
      {(props.ticket_id!==undefined && props.setTickets!==undefined
      && comments.length>0)&&
        (<CommentSection comments={comments} ticketId={props.ticket_id} userId={user_id} userIsAdmin={isAdmin} setTickets={props.setTickets}/>)}
      </div>
    </div>
    {showAlertModal && (<AlertModal title={"Warning"} body={"Are you sure you want to delete this ticket?"}
    close={()=>{setShowAlertModal(false)}} 
    ok={()=>{
      RemoveTicket(props.ticket_id as number, props.setTickets);
      setShowAlertModal(false);
    }}
    />)}
  </div>;

  //Not admin, Read-only view
  return <div className="modal d-block modal-background" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
            <div className="d-flex w-75">
                <h2 className="modal-title align-self-end">{title}</h2>
                <div className={"form-control w-25 ms-2"+((urgency==1)?" bg-warning text-white":((urgency==2)?" bg-danger text-white":""))} >
                    {(urgency==1)?"Hurry":((urgency==2)?"Urgent":"Standard")}
                </div>

            </div>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <label>Developers</label>
          <div>
              {DevAvailable.map((dev)=>{
                  const dev_activated = (activeDev.includes(dev.id));
                  return <DevAvatar key={dev.name} dev={dev} activated={dev_activated} deactivatedClass="d-none"/>
                })}
          </div>
          <p className="mt-2">{body}</p>
        </div>

        <div className="container d-flex justify-content-between">
            <ul className="d-flex list-unstyled">
              {TagsAvailable.map((tag)=>(activeTags.includes(tag.id))&&
                  <a href="#" className="text-decoration-none" key={tag.id}>
                      <TicketTags on={true} color={tag.color}>{tag.text}</TicketTags>
                  </a>
              )}
            </ul>
            <TicketDueDate dueDate={new Date(dueDate)}/>
        </div>
        
        <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addticket}>Completed</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.close}>Close</button>
        </div>
      {(props.ticket_id!==undefined && props.setTickets!==undefined
      && comments.length>0) &&
        (<CommentSection comments={comments} ticketId={props.ticket_id} userId={user_id} userIsAdmin={isAdmin} setTickets={props.setTickets}/>)}
      </div>
    </div>
  </div>;
}


function CommentSection(props:{comments:CommentType[], ticketId:number, userId:number, userIsAdmin:boolean, setTickets:(prevVar: ITicket[] | ((a: ITicket[]) => ITicket[])) => void}){
  const [commentFieldText, setCommentFieldText] = useState<string>("");
  const [seeMore, setSeeMore] = useState<boolean>(false);
  
  const { comments, ticketId, userId, userIsAdmin, setTickets } = props;

  const DEFAULT_DISPLAYED_COMMENTS = 3;
  const SendComment = ()=>{setCommentFieldText("")}
  return (<div className="container p-2">
            <p>Comments on this post : {comments.length}</p>
            <div className="d-flex">
              <DevAvatar dev={DevAvailable.find((d)=>d.id==userId)} />
              <input className="ms-2 form-control" placeholder="Type your comment here"
                    value={commentFieldText} onChange={(e)=>{setCommentFieldText(e.target.value)}}
                    onKeyDown={(e) => { if (e.key === 'Enter' && commentFieldText.length>0) {SendComment()} }}></input>
              <button className="btn btn-primary" onClick={()=>{if(commentFieldText.length>0)SendComment()}}>Send</button>
            </div>
            <div className={"mt-2 comment-container "+((comments.length>DEFAULT_DISPLAYED_COMMENTS && !seeMore)?"partial-display":"")}>
              {
                comments.map((c, c_index)=>{
                  if (Math.abs(comments.length-1-c_index)<DEFAULT_DISPLAYED_COMMENTS || seeMore){
                    return (
                      <Comment key={c.id} dev={DevAvailable.find((d)=>d.id==c.senderId)} text={c.body}
                            liked={c.likes.includes(userId)} likes_number={c.likes.length}
                            date={c.date} currentUserId={userId} currentUserIsAdmin={userIsAdmin}
                            likeAction={()=>{LikeCommentTicket(userId, ticketId, c.id, setTickets)}}
                            removeAction={()=>{RemoveCommentTicket(ticketId, c.id, setTickets)}}/>
                    )
                  }
                }).reverse()
              }
              {/* <Comment dev={DevAvailable.find((d)=>d.id==2)} text={"Dzień dobry!"}/> */}
              {(comments.length>DEFAULT_DISPLAYED_COMMENTS && !seeMore)&&(<a href="#" className="btn" onClick={()=>{setSeeMore(true)}}>See more...</a>)}
            </div>
          </div>
  )
}

function Comment(props){
  return (
  <div className="position-relative container bg-light p-3 m-2 d-flex align-items-center comment">
    <code className="position-absolute top-0 end-0 mt-1 me-2" style={{fontSize: "60%"}}>Posted {Interval(props.date)} ago</code>
    <DevAvatar dev={props.dev} />
    <p className="m-0 ms-2">{props.text}</p>
    <a href="#" onClick={props.likeAction} className={"ms-auto me-2 text-decoration-none position-relative comment-button "+((props.liked)?"activated":"")}>
      {(props.likes_number>0)&&(<span className="bottom-0 end-0 me-1">{props.likes_number}</span>)}
      <img src={heartIcon} width="20"/>
    </a>
    {(props.currentUserId==props.dev.id || props.currentUserIsAdmin)&&(<a href="#" onClick={props.removeAction} className="me-2 comment-button position-relative"><img src={xIcon} width="20"/></a>)}
  </div>)
}