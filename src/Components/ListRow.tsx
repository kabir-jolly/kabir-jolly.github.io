import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ListRowProps {
  date: string;
  title: ReactNode;
  /** Site path (router link) or absolute URL (opens a new tab, marked ↗). */
  href?: string;
  /** Muted italic label on the right (on phones, under the title). */
  label?: ReactNode;
}

const ListRow = ({ date, title, href, label }: ListRowProps) => {
  let main: ReactNode = <span className="row-title">{title}</span>;
  if (href && /^https?:\/\//.test(href)) {
    main = (
      <a className="row-title" href={href} target="_blank" rel="noopener noreferrer">
        {title}
        <svg
          className="ext-arrow"
          viewBox="0 0 10 10"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M1.5 8.5l7-7M3 1.5h5.5V7" />
        </svg>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  } else if (href) {
    main = (
      <Link className="row-title" to={href}>
        {title}
      </Link>
    );
  }

  return (
    <li className="row">
      <span className="row-date">{date}</span>
      {main}
      {label ? <span className="row-label">{label}</span> : <span />}
    </li>
  );
};

export default ListRow;
