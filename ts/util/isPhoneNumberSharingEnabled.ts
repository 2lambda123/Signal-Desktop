// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as RemoteConfig from '../RemoteConfig';

export function isPhoneNumberSharingEnabled(): boolean {
  return Boolean(
    RemoteConfig.isEnabled('desktop.internalUser') ||
      RemoteConfig.isEnabled('desktop.pnp')
  );
}
