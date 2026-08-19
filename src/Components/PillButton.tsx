import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type PillButtonBaseProps = {
  children: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
};

type PillButtonProps = PillButtonBaseProps &
  (
  | {
      to: string;
      onClick?: never;
      mode?: never;
    }
  | {
      to?: never;
      onClick: () => void;
      mode?: never;
    }
  | {
      to?: never;
      onClick?: never;
      mode: "presentational";
    }
  );

const PillButton = (props: PillButtonProps) => {
  const {
    children,
    leadingIcon,
    trailingIcon,
    className = "",
  } = props;
  const classes = [
    "pill-button",
    "inline-flex",
    "items-center",
    "gap-1.5",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const isPresentational =
    "mode" in props && props.mode === "presentational";

  const content = (
    <>
      {leadingIcon && (
        <span
          className="pill-button-icon pill-button-icon-leading inline-flex shrink-0"
          aria-hidden="true"
        >
          {leadingIcon}
        </span>
      )}
      <span>{children}</span>
      {trailingIcon && (
        <span
          className={`pill-button-icon pill-button-icon-trailing inline-flex shrink-0 ${
            isPresentational ? "pill-button-icon-mount" : ""
          }`}
          aria-hidden="true"
        >
          {trailingIcon}
        </span>
      )}
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    );
  }

  if ("onClick" in props) {
    return (
      <button type="button" onClick={props.onClick} className={classes}>
        {content}
      </button>
    );
  }

  return <span className={classes}>{content}</span>;
};

export default PillButton;
