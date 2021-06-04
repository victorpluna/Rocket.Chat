import React from 'react';

import StateFilesIcon from './StateFilesIcon';

export default (props) => (
	<button onClick={props.action} key={props.key} data-toolbox={props.index} className='rcx-box rcx-button rcx-button--tiny-square rcx-button--ghost'>
		<StateFilesIcon style={{ height: 20 }} />
	</button>
);
