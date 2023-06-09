// Copyright 2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';
import { boolean, text } from '@storybook/addon-knobs';

import { setupI18n } from '../../util/setupI18n';
import enMessages from '../../../_locales/en/messages.json';
import type { ContactType, Props } from './UnsupportedMessage';
import { UnsupportedMessage } from './UnsupportedMessage';

const i18n = setupI18n('en', enMessages);

export default {
  title: 'Components/Conversation/UnsupportedMessage',
};

const createContact = (props: Partial<ContactType> = {}): ContactType => ({
  id: '',
  title: text('contact title', props.title || ''),
  isMe: boolean('contact isMe', props.isMe || false),
});

const createProps = (overrideProps: Partial<Props> = {}): Props => ({
  i18n,
  canProcessNow: boolean('canProcessNow', overrideProps.canProcessNow || false),
  contact: overrideProps.contact || ({} as ContactType),
});

export function FromSomeone(): JSX.Element {
  const contact = createContact({
    title: 'Alice',
    name: 'Alice',
  });

  const props = createProps({ contact });

  return <UnsupportedMessage {...props} />;
}

export function AfterUpgrade(): JSX.Element {
  const contact = createContact({
    title: 'Alice',
    name: 'Alice',
  });

  const props = createProps({ contact, canProcessNow: true });

  return <UnsupportedMessage {...props} />;
}

export function FromYourself(): JSX.Element {
  const contact = createContact({
    title: 'Alice',
    name: 'Alice',
    isMe: true,
  });

  const props = createProps({ contact });

  return <UnsupportedMessage {...props} />;
}

export function FromYourselfAfterUpgrade(): JSX.Element {
  const contact = createContact({
    title: 'Alice',
    name: 'Alice',
    isMe: true,
  });

  const props = createProps({ contact, canProcessNow: true });

  return <UnsupportedMessage {...props} />;
}
