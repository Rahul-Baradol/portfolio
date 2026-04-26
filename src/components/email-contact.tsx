import { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

const EmailContact = () => {
  const [isCopied, setIsCopied] = useState(false);
  const email = "rahul.baradol.14@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
      >
        <Mail className="h-3.5 w-3.5" />
        {email}
      </a>
      
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 hover:text-foreground transition-colors outline-none"
        aria-label={isCopied ? "Email copied" : "Copy email"}
      >
        {isCopied ? (
          <>
            <Check className="h-3 w-3 text-green-500" />
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
          </>
        )}
      </button>
    </div>
  );
};

export default EmailContact;