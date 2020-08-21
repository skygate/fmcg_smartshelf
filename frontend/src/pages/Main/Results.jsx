import React from "react";

const CountedList = ({
  title,
  counted,
  format = (name, count) => [`${name}: ${count}`, ""],
}) => (
  <>
    <h3>{title}:</h3>
    <ul>
      {Object.keys(counted).map((name) => {
        const count = counted[name];
        const [description, classes] = format(name, count);
        return (
          <li className={classes} key={description}>
            {description}
          </li>
        );
      })}
    </ul>
  </>
);

const format = (className) => (name, count) => {
  const isCritical = count > 0;
  const description = `${name}: ${count}${
    isCritical ? " (Needs immediate refill)" : ""
  }`;
  const classes = isCritical ? className : "";
  return [description, classes];
};

const formatCritical = format("critical");
const formatSemicritical = format("semi-critical");

const Results = ({ missing: { empty, full, not_full_not_empty } }) => (
  <div className="alerts">
    {empty && (
      <CountedList
        counted={empty}
        title="Empty Shelves"
        format={formatCritical}
      />
    )}
    {not_full_not_empty && (
      <CountedList
        counted={not_full_not_empty}
        title="Not Full Shelves"
        format={formatSemicritical}
      />
    )}
    {full && <CountedList counted={full} title="Full Shelves" />}
  </div>
);

export default Results;
