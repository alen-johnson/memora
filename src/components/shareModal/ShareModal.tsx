import { useState } from "react";
import {
  discord,
  facebook,
  instagram,
  messenger,
  reddit,
  telegram,
  twitter,
  whatsapp,
} from "../../assets/imageIndex";
import "./ShareModal.css";
import { Post } from "../../store/postStore";
import useGetProfileById from "../../hooks/useGetProfileById";
interface PostProps {
  post: Post;
}
//@ts-ignore
function ShareModal({ post }: PostProps) {
  const [copied, setCopied] = useState(false);
  const { userProfile } = useGetProfileById(post.createdBy);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`https://memora-social.vercel.app/${userProfile?.username}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="share">
      <div className="share__row1">
        <div className="share__row-item">
          <img
            src={twitter}
            alt="twitter"
            onClick={() => window.open("https://twitter.com", "_blank")}
            style={{ cursor: "pointer" }}
          />
          <span className="hover-text">Twitter</span>
        </div>
        <div className="share__row-item">
          <img
            src={facebook}
            alt="facebook"
            onClick={() => window.open("https://facebook.com", "_blank")}
            style={{ cursor: "pointer" }}
          />
          <span className="hover-text">Facebook</span>
        </div>
        <div className="share__row-item">
          <img
            src={reddit}
            alt="reddit"
            onClick={() => window.open("https://reddit.com", "_blank")}
            style={{ cursor: "pointer" }}
          />
          <span className="hover-text">Reddit</span>
        </div>
        <div className="share__row-item">
          <img
            src={discord}
            alt="discord"
            onClick={() => window.open("https://discord.com", "_blank")}
            style={{ cursor: "pointer" }}
          />
          <span className="hover-text">Discord</span>
        </div>
      </div>
      <div className="share__row2">
        <div className="share__row-item">
          <img
            src={whatsapp}
            alt="whatsapp"
            onClick={() => window.open("https://whatsapp.com", "_blank")}
            style={{ cursor: "pointer" }}
          />
          <span className="hover-text">WhatsApp</span>
        </div>
        <div className="share__row-item">
          <img
            src={messenger}
            alt="messenger"
            onClick={() => window.open("https://messenger.com", "_blank")}
            style={{ cursor: "pointer" }}
          />
          <span className="hover-text">Messenger</span>
        </div>
        <div className="share__row-item">
          <img
            src={telegram}
            alt="telegram"
            onClick={() => window.open("https://telegram.org", "_blank")}
            style={{ cursor: "pointer" }}
          />
          <span className="hover-text">Telegram</span>
        </div>
        <div className="share__row-item">
          <img
            src={instagram}
            alt="instagram"
            onClick={() => window.open("https://instagram.com", "_blank")}
            style={{ cursor: "pointer" }}
          />
          <span className="hover-text">Instagram</span>
        </div>
      </div>

      <div className="share__row3">
        <h4>Page Link</h4>
        <div className="share__row3-url">
          <p>{`https://memora-social.vercel.app/${userProfile?.username}`}</p>
          <button className="btn-copy" onClick={handleCopyClick}>
            <span
              className="cp-tooltip"
              data-text-initial="Copy to clipboard"
              data-text-end="Copied!"
            ></span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 6.35 6.35"
                height="20"
                width="20"
                className="cp-clipboard"
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                  />
                </g>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="18"
                width="18"
                className={`cp-check-mark ${copied ? "visible" : ""}`}
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
