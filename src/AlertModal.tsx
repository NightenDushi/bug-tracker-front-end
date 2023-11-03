export function AlertModal(props) {
    return <div className="modal d-block">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{props.title}</h5>
                    <button type="button" className="btn-close" onClick={props.close}></button>
                </div>
                <div className="modal-body">
                    <p>{props.body}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.close}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={props.ok}>Continue</button>
                </div>
            </div>
        </div>
    </div>;
}
