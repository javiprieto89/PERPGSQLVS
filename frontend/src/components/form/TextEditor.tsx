import { atom, useAtom } from 'jotai';
import { Bold, Heading, Italic, List, Text } from "lucide-react";
import { forwardRef, useEffect, useRef } from 'react';

import TextArea, { type TextAreaProps } from '~/components/form/TextArea';
import { Button } from "~/components/ui/button";
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

import useDebounce from '~/hooks/useDebounce';

const historyAtom = atom<string[]>([])
const historyIndexAtom = atom(-1)

type TextOption = "bold" | "italic" | "title" | "paragraph" | "list"

export const TextEditor = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ id, name, label, labelProps, children, className, onKeyDown, error, ...rest }, ref) => {
  const internalRef = useRef<HTMLTextAreaElement | null>(null);

  // Get the textarea element, whether from external ref or internal ref
  const getTextareaElement = (): HTMLTextAreaElement | null => {
    if (typeof ref === 'function') {
      return internalRef.current;
    } else if (ref && 'current' in ref) {
      return ref.current;
    }
    return internalRef.current;
  };

  const textareaRef = internalRef;
  const [history, saveHistory] = useAtom<string[]>(historyAtom)
  const [historyIndex, setHistoryIndex] = useAtom(historyIndexAtom)
  const { setDebounce } = useDebounce()

  function saveState() {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    // If we're not at the latest state, remove all states ahead of the current one
    if (historyIndex < history.length - 1) {
      saveHistory(history.slice(0, historyIndex + 1));
    }

    // overwrite history
    let currentHistory = history
    if (history.length > historyIndex + 1) {
      currentHistory = currentHistory.splice(historyIndex + 1, currentHistory.length - (historyIndex + 1));
    }

    const saveHistoryState = [
      ...currentHistory,
      textarea.value
    ];

    saveHistory(saveHistoryState);
    setHistoryIndex(historyIndex + 1);
  }

  function undo() {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      textarea.value = history[historyIndex - 1];
    }
  }

  function redo() {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      textarea.value = history[historyIndex + 1];
    }
  }

  function lineText(value: string, start: number, end: number, char: string) {
    // Find the start of the line
    const beforeStart = value.substring(0, start);
    const lineStart = beforeStart.lastIndexOf('\n') + 1;
    const afterEnd = value.substring(end);
    const nextNewline = afterEnd.indexOf('\n');
    const lineEnd = end + (nextNewline === -1 ? afterEnd.length : nextNewline);

    // Prepend the '-' to the line
    const lineText = value.substring(lineStart, lineEnd);
    const markdownText = `${char} ${lineText}`;

    return {
      start: lineStart,
      end: lineEnd,
      text: markdownText,
    };
  }

  // function searchCoincidence(value: string, start: number, end: number, char: string) {}

  type MarkdownTextTypes = "bold" | "italic" | "title" | "paragraph" | "list";

  function addMarkdownCode(selectedText: string, style: MarkdownTextTypes) {
    let markdownText = '';

    switch (style) {
      case 'bold':
        markdownText = `**${selectedText}**`;
        break;
      case 'italic':
        markdownText = `*${selectedText}*`;
        break;
      case 'title':
        markdownText = `# ${selectedText}`;
        break;
      case 'paragraph':
        markdownText = `${selectedText}\n\n`;
        break;
      default:
        markdownText = selectedText;
    }

    return markdownText;
  }

  function completeEntireWord(value: string, start: number, end: number, style: MarkdownTextTypes) {
    const beforeStart = value.substring(0, start);
    const afterEnd = value.substring(end);
    const textStartIndex = beforeStart.lastIndexOf(' ') + 1;
    const textEndIndex = afterEnd.indexOf(' ') + end;

    const selectedText = value.substring(textStartIndex, textEndIndex)

    const markdownText = addMarkdownCode(selectedText, style);

    return {
      start: textStartIndex,
      end: textEndIndex,
      text: markdownText
    }
  }

  function addMarkdownStyle(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: TextOption) {
    event.preventDefault();
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (start === end && style !== 'list') {
      const result = completeEntireWord(textarea.value, start, end, style)
      textarea.value = textarea.value.substring(0, result.start) + result.text + textarea.value.substring(result.end);
      saveState();
      return;
    }

    if (style === 'list') {
      const result = lineText(textarea.value, start, end, '-');
      textarea.value = textarea.value.substring(0, result.start) + result.text + textarea.value.substring(result.end);
      saveState();
      return;
    }

    const markdownText = addMarkdownCode(selectedText, style);

    textarea.value = textarea.value.substring(0, start) + markdownText + textarea.value.substring(end);
    saveState();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const isUndo = (event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey;
    const isRedo = (event.ctrlKey || event.metaKey) && event.key === 'z' && event.shiftKey;

    if ((isUndo || isRedo)) {
      event.preventDefault();
      if (isUndo) {
        undo();
      } else {
        redo();
      }
    } else {
      if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
        setDebounce(saveState, 300)
      }
    }

    onKeyDown?.(event);
  }

  useEffect(() => {
    saveState();
  }, [])

  return (
    <>
      {label && <Label data-error={!!error} htmlFor={id || name} {...labelProps}>{label}</Label>}
      <div className={cn(
        "relative rounded-md border border-input overflow-hidden",
        "focus-within:outline-2 focus-within:outline-ring"
      )}>
        <div className={cn(
          "flex gap-2 border-b border-border p-0.5",
          "[&_button:hover]:bg-accent"
        )}>
          <Button variant="ghost" size="sm" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => addMarkdownStyle(event, "bold")}><Bold size={16} /><span className="sr-only">Bold</span></Button>
          <Button variant="ghost" size="sm" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => addMarkdownStyle(event, 'italic')}><Italic size={16} /></Button>
          <Button variant="ghost" size="sm" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => addMarkdownStyle(event, 'title')}><Heading size={16} /><span className="sr-only">Title</span></Button>
          <Button variant="ghost" size="sm" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => addMarkdownStyle(event, 'paragraph')}><Text size={16} /><span className="sr-only">Paragraph</span></Button>
          <Button variant="ghost" size="sm" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => addMarkdownStyle(event, 'list')}><List size={16} /><span className="sr-only">List</span></Button>
        </div>
        <TextArea
          ref={(element) => {
            // Assign to internal ref
            internalRef.current = element;
            // Also assign to external ref if provided
            if (typeof ref === 'function') {
              ref(element);
            } else if (ref) {
              ref.current = element;
            }
          }}
          id={id}
          name={name}
          className={cn(
            "border-0 w-full min-h-16 rounded-tl-none rounded-tr-none",
            "focus:outline-none focus:border-0 focus:shadow-none focus-within:outline-none focus-within:border-0 focus-within:shadow-none",
            className
          )}
          error={error}
          {...rest}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  )
});

TextEditor.displayName = "TextEditor";

export default TextEditor;
