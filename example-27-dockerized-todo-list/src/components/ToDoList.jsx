import React from "react";
import dayjs from "dayjs";
import styles from "./ToDoList.module.css";
import clsx from "clsx";

export default function ToDoList({ items, onItemChanged }) {
  function handleItemClick(item) {
    const updatedItem = { ...item, isComplete: !item.isComplete };
    onItemChanged(updatedItem);
  }

  // Create new items list, sorted by due date, descending order
  const sortedItems = [...items].sort((a, b) => {
    const dateA = dayjs(a.dueDate);
    const dateB = dayjs(b.dueDate);
    return dateB.isBefore(dateA) ? 1 : -1;
  });

  return (
    <ul className={styles.list}>
      {sortedItems.map((item) => (
        <ToDoItem key={item.id} item={item} onItemClick={handleItemClick} />
      ))}
    </ul>
  );
}

function ToDoItem({ item, onItemClick }) {
  const today = dayjs();
  const dueDate = dayjs(item.dueDate);
  const isOverdue = !item.isComplete && dueDate.isBefore(today);
  const isDueSoon = !item.isComplete && dueDate.isAfter(today) && dueDate.diff(today, "day") <= 3;

  return (
    <li
      className={clsx(
        styles.item,
        item.isComplete && styles.complete,
        isOverdue && styles.overdue,
        isDueSoon && styles.dueSoon
      )}
      onClick={() => onItemClick(item)}
    >
      <h3>
        {item.title}
        {isOverdue && <em className={styles.overdueLabel}> (overdue!)</em>}
        {isDueSoon && <em className={styles.dueSoonLabel}> (due {dueDate.fromNow()})</em>}
      </h3>
      <p>{item.description}</p>
      <p>
        Due: {dueDate.format("MMMM D, YYYY")} <em>({dueDate.fromNow()})</em>
      </p>
      <p>Status: {item.isComplete ? "Complete" : "Incomplete"}</p>
    </li>
  );
}
