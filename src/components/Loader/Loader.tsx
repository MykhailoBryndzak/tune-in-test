import "./styles.scss";

type Props = {
  className: string;
};

export const Loader = ({ className }: Props) => {
  return (
    <div className={`lds-spinner ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
