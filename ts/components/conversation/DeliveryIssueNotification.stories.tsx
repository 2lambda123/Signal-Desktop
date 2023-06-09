// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';

import { setupI18n } from '../../util/setupI18n';
import enMessages from '../../../_locales/en/messages.json';
import { DeliveryIssueNotification } from './DeliveryIssueNotification';
import { getDefaultConversation } from '../../test-both/helpers/getDefaultConversation';

export default {
  title: 'Components/Conversation/DeliveryIssueNotification',
};

const i18n = setupI18n('en', enMessages);
const sender = getDefaultConversation();

export function Default(): JSX.Element {
  return (
    <DeliveryIssueNotification i18n={i18n} inGroup={false} sender={sender} />
  );
}

export function WithALongName(): JSX.Element {
  const longName = '🤷🏽‍♀️❤️🐞'.repeat(50);
  return (
    <DeliveryIssueNotification
      i18n={i18n}
      inGroup={false}
      sender={getDefaultConversation({
        firstName: longName,
        name: longName,
        profileName: longName,
        title: longName,
      })}
    />
  );
}

WithALongName.story = {
  name: 'With a long name',
};

export function InGroup(): JSX.Element {
  return <DeliveryIssueNotification i18n={i18n} inGroup sender={sender} />;
}
