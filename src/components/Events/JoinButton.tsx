import { useState } from "react";
import Button from "../defaults/Buttons/Button";

const JoinButton = ({ eventId }: { eventId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/events/${eventId}/join`, {
        method: "POST",
      });
      if (response.ok) {
        const message = await response.json();
        console.log(message);
      } else {
        const message = await response.json();
        console.error(response.status, response.statusText, message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      additionalClasses="z-20 absolute bottom-5"
      isLoading={isLoading}
      onClick={handleClick}
      text="Join Event"
    />
  );
};

export default JoinButton;
