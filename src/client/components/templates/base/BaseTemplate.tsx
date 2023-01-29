import styles from "./BaseTemplate.module.css";

export interface IBaseTemplate {
  sample: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sample }) => {
  return <div className={styles.base}>{sample}</div>;
};

export default BaseTemplate;
