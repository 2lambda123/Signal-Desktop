// Copyright 2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { setupI18n } from '../../util/setupI18n';
import { DurationInSeconds } from '../../util/durations';
import enMessages from '../../../_locales/en/messages.json';
import type { Props } from './TimerNotification';
import { TimerNotification } from './TimerNotification';

const i18n = setupI18n('en', enMessages);

export default {
  title: 'Components/Conversation/TimerNotification',
};

const createProps = (overrideProps: Partial<Props> = {}): Props => ({
  i18n,
  type: select(
    'type',
    {
      fromOther: 'fromOther',
      fromMe: 'fromMe',
      fromSync: 'fromSync',
    },
    overrideProps.type || 'fromOther'
  ),
  title: text('title', overrideProps.title || ''),
  ...(boolean('disabled', overrideProps.disabled || false)
    ? {
        disabled: true,
      }
    : {
        disabled: false,
        expireTimer: DurationInSeconds.fromMillis(
          number(
            'expireTimer',
            ('expireTimer' in overrideProps ? overrideProps.expireTimer : 0) ||
              0
          )
        ),
      }),
});

export function SetByOther(): JSX.Element {
  const props = createProps({
    expireTimer: DurationInSeconds.fromHours(1),
    type: 'fromOther',
    title: 'Mr. Fire',
  });

  return (
    <>
      <TimerNotification {...props} />
      <div style={{ padding: '1em' }} />
      <TimerNotification {...props} disabled />
    </>
  );
}

export function SetByOtherWithALongName(): JSX.Element {
  const longName = '🦴🧩📴'.repeat(50);

  const props = createProps({
    expireTimer: DurationInSeconds.fromHours(1),
    type: 'fromOther',
    title: longName,
  });

  return (
    <>
      <TimerNotification {...props} />
      <div style={{ padding: '1em' }} />
      <TimerNotification {...props} disabled />
    </>
  );
}

SetByOtherWithALongName.story = {
  name: 'Set By Other (with a long name)',
};

export function SetByYou(): JSX.Element {
  const props = createProps({
    expireTimer: DurationInSeconds.fromHours(1),
    type: 'fromMe',
    title: 'Mr. Fire',
  });

  return (
    <>
      <TimerNotification {...props} />
      <div style={{ padding: '1em' }} />
      <TimerNotification {...props} disabled />
    </>
  );
}

export function SetBySync(): JSX.Element {
  const props = createProps({
    expireTimer: DurationInSeconds.fromHours(1),
    type: 'fromSync',
    title: 'Mr. Fire',
  });

  return (
    <>
      <TimerNotification {...props} />
      <div style={{ padding: '1em' }} />
      <TimerNotification {...props} disabled />
    </>
  );
}
