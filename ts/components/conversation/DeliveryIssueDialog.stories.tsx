// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { setupI18n } from '../../util/setupI18n';
import enMessages from '../../../_locales/en/messages.json';
import { DeliveryIssueDialog } from './DeliveryIssueDialog';
import { getDefaultConversation } from '../../test-both/helpers/getDefaultConversation';

const i18n = setupI18n('en', enMessages);
const sender = getDefaultConversation();

export default {
  title: 'Components/Conversation/DeliveryIssueDialog',
};

export function Default(): JSX.Element {
  return (
    <DeliveryIssueDialog
      i18n={i18n}
      sender={sender}
      inGroup={false}
      onClose={action('onClose')}
    />
  );
}

export function InGroup(): JSX.Element {
  return (
    <DeliveryIssueDialog
      i18n={i18n}
      sender={sender}
      inGroup
      onClose={action('onClose')}
    />
  );
}
