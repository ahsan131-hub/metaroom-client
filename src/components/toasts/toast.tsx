// @src/App.jsx

import classNames from 'classnames';
import React from 'react';
import toast from 'react-hot-toast';
import { BiErrorCircle } from 'react-icons/bi';
import { MdOutlineClose, MdOutlineDone } from 'react-icons/md';

import styles from './toast.module.css';

type INotification = {
  type: 'ERROR' | 'SUCCESS' | 'INFO';
  position:
    | 'top-center'
    | 'top-right'
    | 'top-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'bottom-left';
  message: string;
  description: string;
};

const notify = ({ type, position, message, description }: INotification) =>
  toast.custom(
    (t) => {
      if (type === 'ERROR') {
        return (
          <div
            className={classNames([
              styles.notificationWrapperError,
              t.visible ? 'right-0' : '-right-100',
            ])}
          >
            <div className={styles.iconWrapper}>
              <BiErrorCircle />
            </div>
            <div className={styles.contentWrapper}>
              <h1>{message}</h1>
              <p>{description}</p>
            </div>
            <div
              className={styles.closeIcon}
              onClick={() => toast.dismiss(t.id)}
            >
              <MdOutlineClose />
            </div>
          </div>
        );
      }

      return (
        <div
          className={classNames([
            styles.notificationWrapper,
            t.visible ? 'right-0' : '-right-100',
          ])}
        >
          <div className={styles.iconWrapper}>
            <MdOutlineDone />
          </div>
          <div className={styles.contentWrapper}>
            <h1>{message}</h1>
            <p>{description}</p>
          </div>
          <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
            <MdOutlineClose />
          </div>
        </div>
      );
    },
    { id: Math.random().toString(), position }
  );

export default notify;
