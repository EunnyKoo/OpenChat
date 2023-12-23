export default function Chat({ chat }) {
  return (
    <div className={`list ${chat.type}-chat`}>
      <div className="user-id">{chat.content2}</div>
      <div className="list-content">{chat.content}</div>
    </div>
  );
}