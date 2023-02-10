import React, { useRef, useMemo, useEffect } from 'react';
import {useEventCallback} from "../../hooks/useEventCallback";
import {clamp} from "../../utils";
import classNames from 'classnames/bind';
import style from './Interactive.module.scss';
const cx = classNames.bind(style);

export interface Interaction {
  left: number;
  top: number;
}

const isTouch = (event: MouseEvent | TouchEvent): event is TouchEvent => 'touches' in event;

const getTouchPoint = (touches: TouchList, touchId: null | number): Touch => {
  for (let i = 0; i < touches.length; i++) {
    if (touches[i].identifier === touchId) return touches[i];
  }
  return touches[0];
};

const getParentWindow = (node?: HTMLDivElement | null): Window => {
  return (node && node.ownerDocument.defaultView) || window;
};

const getRelativePosition = (
  node: HTMLDivElement,
  event: MouseEvent | TouchEvent,
  touchId: null | number
): Interaction => {
  const rect = node.getBoundingClientRect();
  const pointer = isTouch(event) ? getTouchPoint(event.touches, touchId) : (event as MouseEvent);

  return {
    left: clamp((pointer.pageX - (rect.left + getParentWindow(node).pageXOffset)) / rect.width),
    top: clamp((pointer.pageY - (rect.top + getParentWindow(node).pageYOffset)) / rect.height),
  };
};

const preventDefaultMove = (event: MouseEvent | TouchEvent): void => {
  !isTouch(event) && event.preventDefault();
};

const isInvalid = (event: MouseEvent | TouchEvent, hasTouch: boolean): boolean => {
  return hasTouch && !isTouch(event);
};

interface Props {
  onMove: (interaction: Interaction) => void;
  onKey: (offset: Interaction) => void;
  children: React.ReactNode;
}

const InteractiveBase = ({ onMove, onKey, ...rest }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const onMoveCallback = useEventCallback<Interaction>(onMove);
  const onKeyCallback = useEventCallback<Interaction>(onKey);
  const touchId = useRef<null | number>(null);
  const hasTouch = useRef(false);

  const [handleMoveStart, handleKeyDown, toggleDocumentEvents] = useMemo(() => {
    const handleMoveStart = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
      const el = container.current;
      if (!el) return;

      preventDefaultMove(nativeEvent);

      if (isInvalid(nativeEvent, hasTouch.current) || !el) return;

      if (isTouch(nativeEvent)) {
        hasTouch.current = true;
        const changedTouches = nativeEvent.changedTouches || [];
        if (changedTouches.length) touchId.current = changedTouches[0].identifier;
      }

      el.focus();
      onMoveCallback(getRelativePosition(el, nativeEvent, touchId.current));
      toggleDocumentEvents(true);
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
      preventDefaultMove(event);

      const isDown = isTouch(event) ? event.touches.length > 0 : event.buttons > 0;

      if (isDown && container.current) {
        onMoveCallback(getRelativePosition(container.current, event, touchId.current));
      } else {
        toggleDocumentEvents(false);
      }
    };

    const handleMoveEnd = () => toggleDocumentEvents(false);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const keyCode = event.which || event.keyCode;
      if (keyCode < 37 || keyCode > 40) return;
      event.preventDefault();
      onKeyCallback({
        left: keyCode === 39 ? 0.05 : keyCode === 37 ? -0.05 : 0,
        top: keyCode === 40 ? 0.05 : keyCode === 38 ? -0.05 : 0,
      });
    };

    function toggleDocumentEvents(state?: boolean) {
      const touch = hasTouch.current;
      const el = container.current;
      const parentWindow = getParentWindow(el);
      const toggleEvent = state ? parentWindow.addEventListener : parentWindow.removeEventListener;
      toggleEvent(touch ? 'touchmove' : 'mousemove', handleMove);
      toggleEvent(touch ? 'touchend' : 'mouseup', handleMoveEnd);
    }

    return [handleMoveStart, handleKeyDown, toggleDocumentEvents];
  }, [onKeyCallback, onMoveCallback]);

  useEffect(() => toggleDocumentEvents, [toggleDocumentEvents]);

  return (
    <div
      {...rest}
      onTouchStart={handleMoveStart}
      onMouseDown={handleMoveStart}
      className={cx('interactiveArea')}
      ref={container}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
    />
  );
};

export const Interactive = React.memo(InteractiveBase);
