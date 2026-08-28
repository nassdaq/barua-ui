"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { block } from "./primitive";

export const Kanban = block("div", "b-kanban", "Kanban");
export const KanbanList = block("ul", "b-kanban-col__list", "KanbanList");
export const TaskList = block("ul", "b-task-list", "TaskList");
export const TaskRow = block("div", "b-task-row", "TaskRow");
export const DataGrid = block("div", "b-datagrid", "DataGrid");
export const Tree = block("ul", "b-tree", "Tree");
export const Feed = block("ul", "b-feed", "Feed");
export const Log = block("div", "b-log", "Log");
export const BulkActions = block("div", "b-bulk-actions", "BulkActions");
export const SelectionCount = block("span", "b-selection-count", "SelectionCount");
export const Resizable = block("div", "b-resizable", "Resizable");
export const ResizeHandle = block("div", "b-resize-handle", "ResizeHandle");
export const DragHandle = block("span", "b-drag-handle", "DragHandle");

export interface KanbanColumnProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  count?: ReactNode;
  children?: ReactNode;
}

export const KanbanColumn = forwardRef<HTMLElement, KanbanColumnProps>(function KanbanColumn(
  { title, count, className, children, ...rest },
  ref
) {
  return (
    <section ref={ref} className={cn("b-kanban-col", className)} {...rest}>
      <header className="b-kanban-col__header">
        {title}
        {count !== undefined ? <span className="b-kanban-col__count">{count}</span> : null}
      </header>
      {children}
    </section>
  );
});

export interface TaskProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}

export const Task = forwardRef<HTMLLIElement, TaskProps>(function Task(
  { title, meta, className, children, ...rest },
  ref
) {
  return (
    <li ref={ref} className={cn("b-task", className)} {...rest}>
      <div className="b-task__title">{title}</div>
      {meta ? <div className="b-task__meta">{meta}</div> : null}
      {children}
    </li>
  );
});

export interface TreeItemProps extends Omit<HTMLAttributes<HTMLDetailsElement>, "label"> {
  label: ReactNode;
  /** Leading glyph — a folder, a file kind. */
  icon?: ReactNode;
  defaultOpen?: boolean;
  children?: ReactNode;
}

export const TreeItem = forwardRef<HTMLDetailsElement, TreeItemProps>(function TreeItem(
  { label, icon, defaultOpen, className, children, ...rest },
  ref
) {
  return (
    <li>
      <details ref={ref} className={cn("b-tree-item", className)} open={defaultOpen} {...rest}>
        <summary>
          {icon}
          {label}
        </summary>
        {children}
      </details>
    </li>
  );
});

export interface TimelineEntry {
  time?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  state?: "complete" | "active";
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  entries: TimelineEntry[];
}

/** Events in order, with the current one marked. */
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { entries, className, ...rest },
  ref
) {
  return (
    <ol ref={ref} className={cn("b-timeline", className)} {...rest}>
      {entries.map((entry, i) => (
        <li key={i} className={entry.state ? `is-${entry.state}` : undefined}>
          {entry.time ? <div className="b-timeline__time">{entry.time}</div> : null}
          <div className="b-timeline__title">{entry.title}</div>
          {entry.body ? <div className="b-timeline__body">{entry.body}</div> : null}
        </li>
      ))}
    </ol>
  );
});

export interface FileTileProps extends HTMLAttributes<HTMLButtonElement> {
  name: ReactNode;
  /** File-kind glyph — keep the colour, it is how the kind is read at a glance. */
  icon?: ReactNode;
  selected?: boolean;
}

export const FileTile = forwardRef<HTMLButtonElement, FileTileProps>(function FileTile(
  { name, icon, selected, className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn("b-file-tile", selected && "is-selected", className)}
      aria-pressed={selected}
      {...rest}
    >
      {icon ? <span className="b-file-tile__icon">{icon}</span> : null}
      <span className="b-file-tile__name">{name}</span>
    </button>
  );
});

export const FileGrid = block("div", "b-file-grid", "FileGrid");
export const FileBrowser = block("div", "b-file-browser", "FileBrowser");
