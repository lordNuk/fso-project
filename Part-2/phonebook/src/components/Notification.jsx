const Notification = ({ message, cname }) => {
  if(message == null) {
    return
  }
  return (
    <div className={cname}>
    <p>{message}</p>
    </div>
  )
}

export default Notification;
