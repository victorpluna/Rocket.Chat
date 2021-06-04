import React from 'react';
import { Box, Field, ToggleSwitch } from '@rocket.chat/fuselage';

import { useTranslation } from '../../contexts/TranslationContext';

const styles = {
	recordedChannelBox: {
		borderWidth: 2,
		borderColor: '#E2E5E8',
		backgroundColor: '#F6F6F6',
		marginTop: 2,
		paddingLeft: 20,
		paddingRight: 20,
	},
};

export const RecordedField = ({ recorded, handleRecorded }) => {
	const t = useTranslation();

	return (
		<Box style={{ ...styles.recordedChannelBox, ...{ borderColor: recorded ? '#0000FF' : '#E2E5E8' } }} display='flex' justifyContent='space-between' alignItems='center'>
			<Box display='flex' flexDirection='column'>
				<Box display='flex' flexDirection='row'>
					<ToggleSwitch checked={recorded} onChange={handleRecorded} style={{ marginRight: 20 }} />
					<Field.Label>{t('Recorded_Channel')}</Field.Label>
				</Box>
				<Field.Description style={{ fontSize: '0.675rem' }}>{t('This_channel_will_be_recorded')}</Field.Description>
			</Box>
			<img style={{ height: 90 }} src={`/images/tabularium-logo-${ recorded ? 'blue' : 'grey' }.png`} alt='Tabularium logo' />
		</Box>
	);
};
