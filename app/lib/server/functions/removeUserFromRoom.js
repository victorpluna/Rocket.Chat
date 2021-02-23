import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions';
import { Meteor } from 'meteor/meteor';

import { Rooms, Messages, Subscriptions } from '../../../models';
import { AppEvents, Apps } from '../../../apps/server';
import { callbacks } from '../../../callbacks';

export const removeUserFromRoom = function(rid, user, options = {}) {
	const room = Rooms.findOneById(rid);

	if (room) {
		try {
			Promise.await(Apps.triggerEvent(AppEvents.IPreRoomUserLeave, room, user));
		} catch (error) {
			if (error instanceof AppsEngineException) {
				throw new Meteor.Error('error-app-prevented', error.message);
			}

			throw error;
		}

		callbacks.run('beforeLeaveRoom', user, room);

		const subscription = Subscriptions.findOneByRoomIdAndUserId(rid, user._id, { fields: { _id: 1 } });

		if (subscription) {
			const removedUser = user;
			if (options.byUser) {
				Messages.createUserRemovedWithRoomIdAndUser(rid, user, {
					u: options.byUser,
				});
			} else {
				Messages.createUserLeaveWithRoomIdAndUser(rid, removedUser);
			}
		}

		if (room.t === 'l') {
			Messages.createCommandWithRoomIdAndUser('survey', rid, user);
		}

		Subscriptions.removeByRoomIdAndUserId(rid, user._id);

		Meteor.defer(function() {
			// TODO: CACHE: maybe a queue?
			callbacks.run('afterLeaveRoom', user, room);

			try {
				Promise.await(Apps.triggerEvent(AppEvents.IPostRoomUserLeave, room, user));
			} catch (error) {
				if (error instanceof AppsEngineException) {
					throw new Meteor.Error('error-app-prevented', error.message);
				}

				throw error;
			}
		});
	}
};
