import { useState, useEffect } from "react";

export const useEmailGate = () => {
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("worksmart_user_email");
    if (storedEmail) {
      setHasSubmittedEmail(true);
      setUserEmail(storedEmail);
    }
  }, []);

  const handleEmailSubmitted = (email: string) => {
    setHasSubmittedEmail(true);
    setUserEmail(email);
  };

  return {
    hasSubmittedEmail,
    userEmail,
    handleEmailSubmitted
  };
};
