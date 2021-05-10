import { useMemo, lazy } from 'react';

import { usePermission } from '../../../../contexts/AuthorizationContext';
import StateFilesToolbox from '../../contextualBar/StateFiles/StateFilesToolbox';

import { addAction } from '.';


addAction('rocket-search', {
	groups: ['channel', 'group', 'direct', 'direct_multiple', 'live'],
	id: 'rocket-search',
	title: 'Search_Messages',
	icon: 'magnifier',
	template: 'RocketSearch',
	order: 4,
});

addAction('user-info', {
	groups: ['direct'],
	id: 'user-info',
	title: 'User_Info',
	icon: 'user',
	template: lazy(() => import('../../MemberListRouter')),
	order: 5,
});

addAction('user-info-group', {
	groups: ['direct_multiple'],
	id: 'user-info-group',
	title: 'Members',
	icon: 'team',
	template: lazy(() => import('../../MemberListRouter')),
	order: 5,
});

addAction('members-list', ({ room }) => {
	const hasPermission = usePermission('view-broadcast-member-list', room._id);
	return useMemo(() => (!room.broadcast || hasPermission ? {
		groups: ['channel', 'group'],
		id: 'members-list',
		title: 'Members',
		icon: 'team',
		template: lazy(() => import('../../MemberListRouter')),
		order: 5,
	} : null), [hasPermission, room.broadcast]);
});

addAction('uploaded-files-list', {
	groups: ['channel', 'group', 'direct', 'direct_multiple', 'live'],
	id: 'uploaded-files-list',
	title: 'Files',
	icon: 'clip',
	template: lazy(() => import('../../contextualBar/RoomFiles')),
	order: 6,
});

addAction('uploaded-state-files-list', {
	groups: ['channel', 'group', 'direct', 'direct_multiple', 'live'],
	id: 'uploaded-state-files-list',
	title: 'State_Files',
	icon: 'upload',
	renderAction: StateFilesToolbox,
	template: lazy(() => import('../../contextualBar/StateFiles')),
	order: 6,
});

addAction('keyboard-shortcut-list', {
	groups: ['channel', 'group', 'direct', 'direct_multiple'],
	id: 'keyboard-shortcut-list',
	title: 'Keyboard_Shortcuts_Title',
	icon: 'keyboard',
	template: lazy(() => import('../../contextualBar/KeyboardShortcuts')),
	order: 99,
});
