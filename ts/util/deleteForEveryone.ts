// Copyright 2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { DeleteModel } from '../messageModifiers/Deletes';
import type { MessageModel } from '../models/messages';
import * as log from '../logging/log';
import { DAY } from './durations';
import { isMe } from './whatTypeOfConversation';
import { getContactId } from '../messages/helpers';
import { isStory } from '../state/selectors/message';

export async function deleteForEveryone(
  message: MessageModel,
  doe: DeleteModel,
  shouldPersist = true
): Promise<void> {
  if (isDeletionByMe(message, doe)) {
    const conversation = message.getConversation();

    // Our 1:1 stories are deleted through ts/util/onStoryRecipientUpdate.ts
    if (
      isStory(message.attributes) &&
      conversation &&
      isMe(conversation.attributes)
    ) {
      return;
    }

    await message.handleDeleteForEveryone(doe, shouldPersist);
    return;
  }

  if (isDeletionTooOld(message, doe)) {
    log.warn('Received late DOE. Dropping.', {
      fromId: doe.get('fromId'),
      targetSentTimestamp: doe.get('targetSentTimestamp'),
      messageServerTimestamp: message.get('serverTimestamp'),
      messageSentAt: message.get('sent_at'),
      deleteServerTimestamp: doe.get('serverTimestamp'),
    });
    return;
  }

  await message.handleDeleteForEveryone(doe, shouldPersist);
}

function isDeletionByMe(
  message: Readonly<MessageModel>,
  doe: Readonly<DeleteModel>
): boolean {
  const ourConversationId =
    window.ConversationController.getOurConversationIdOrThrow();
  return (
    getContactId(message.attributes) === ourConversationId &&
    doe.get('fromId') === ourConversationId
  );
}

function isDeletionTooOld(
  message: Readonly<MessageModel>,
  doe: Readonly<DeleteModel>
): boolean {
  const messageTimestamp =
    message.get('serverTimestamp') || message.get('sent_at') || 0;
  const delta = Math.abs(doe.get('serverTimestamp') - messageTimestamp);
  return delta > DAY;
}
