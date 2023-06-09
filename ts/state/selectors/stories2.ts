// Copyright 2023 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { createSelector } from 'reselect';
import { ReadStatus } from '../../messages/MessageReadStatus';
import { HasStories } from '../../types/Stories';
import { getStoriesEnabled } from './items';

import type { StateType } from '../reducer';
import type { StoriesStateType } from '../ducks/stories';

const getStoriesState = (state: StateType): StoriesStateType => state.stories;

// This exists solely to avoid circular import dependencies since it is required
// by the conversations selector.
export const getHasStoriesSelector = createSelector(
  getStoriesEnabled,
  getStoriesState,
  (isEnabled, { stories }) =>
    (conversationId?: string): HasStories | undefined => {
      if (!isEnabled || !conversationId) {
        return;
      }

      const conversationStories = stories.filter(
        story => story.conversationId === conversationId
      );

      if (!conversationStories.length) {
        return;
      }

      return conversationStories.some(
        story =>
          story.readStatus === ReadStatus.Unread && !story.deletedForEveryone
      )
        ? HasStories.Unread
        : HasStories.Read;
    }
);
