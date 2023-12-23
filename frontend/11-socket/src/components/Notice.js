export default function Notice({ chat }) {
  const today = new Date();
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, 
  };

  const formattedDate = today.toLocaleDateString("ko-KR", dateOptions);
  const formattedTime = today.toLocaleTimeString("ko-KR", timeOptions);

  return (
    <div className="list notice">
      {formattedDate} {formattedTime}
      <div>{chat.content}</div>
    </div>
  );
}
